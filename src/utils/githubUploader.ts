import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";
const OWNER = "datalytikasales";
const REPO = "smittan-vibrant-ventures";
const BRANCH = "gh-pages";  // Updated to use gh-pages branch
const DIRECTORY = "public/lovable-uploads";
const TOKEN = "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";

/**
 * Uploads an image file to GitHub.
 * @param file File to upload
 * @returns URL of the uploaded file
 */
export const uploadImageToGitHub = async (file: File): Promise<string> => {
  try {
    // Create a unique filename with timestamp to avoid conflicts
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
    const fileName = `${timestamp}-${sanitizedName}`;
    const filePath = `${DIRECTORY}/${fileName}`;

    // Read file as ArrayBuffer
    const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });

    // Convert ArrayBuffer to Base64
    const base64Content = btoa(
      new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    // Create file in GitHub
    const response = await axios.put(
      `${GITHUB_API_BASE_URL}/repos/${OWNER}/${REPO}/contents/${filePath}`,
      {
        message: `Upload ${fileName}`,
        content: base64Content,
        branch: BRANCH,
      },
      {
        headers: {
          Authorization: `token ${TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.data.content?.sha) {
      throw new Error("GitHub API response missing file SHA");
    }

    // Return the GitHub Pages URL for the uploaded file
    return `https://${OWNER}.github.io/${REPO}/${DIRECTORY}/${fileName}`;

  } catch (error) {
    console.error("GitHub upload failed:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
    }
    throw new Error("Failed to upload image to GitHub.");
  }
};