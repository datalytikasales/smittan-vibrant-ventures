import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";
const OWNER = "datalytikasales";
const REPO = "smittan-vibrant-ventures";
const BRANCH = "gh-pages";
const DIRECTORY = "public/lovable-uploads";
// Using a new token with correct permissions
const TOKEN = "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";

export const uploadImageToGitHub = async (file: File): Promise<string> => {
  try {
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
    const fileName = `${timestamp}-${sanitizedName}`;
    const filePath = `${DIRECTORY}/${fileName}`;

    const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });

    const base64Content = btoa(
      new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

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

    return `https://${OWNER}.github.io/${REPO}/${DIRECTORY}/${fileName}`;
  } catch (error) {
    console.error("GitHub upload failed:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
    }
    throw new Error("Failed to upload image to GitHub.");
  }
};
