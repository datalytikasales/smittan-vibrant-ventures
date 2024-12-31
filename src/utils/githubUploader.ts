import axios from "axios";

const OWNER = "lweyajoe";
const REPO = "myImages";
const BRANCH = "gh-pages";
const DIRECTORY = "";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = crypto.randomUUID().split('-')[0]; // Using UUID for better uniqueness
  const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '');
  return `${timestamp}-${randomString}-${sanitizedName}`;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const uploadImageToGitHub = async (file: File, retryCount = 3): Promise<string> => {
  try {
    console.log("Starting GitHub upload for file:", file.name);
    
    const fileName = generateUniqueFilename(file.name);
    const filePath = DIRECTORY ? `${DIRECTORY}/${fileName}` : fileName;

    console.log("Generated unique file path:", filePath);

    const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });

    const base64Content = btoa(
      Array.from(new Uint8Array(buffer))
        .map(byte => String.fromCharCode(byte))
        .join('')
    );

    console.log("File converted to base64, attempting upload...");

    try {
      const response = await axios.put(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`,
        {
          message: `Upload ${fileName}`,
          content: base64Content,
          branch: BRANCH,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.content?.sha) {
        throw new Error("GitHub API response missing file SHA");
      }

      console.log("File uploaded successfully");
      
      const ghPagesUrl = `https://${OWNER}.github.io/${REPO}/${filePath}`;
      console.log("Generated GitHub Pages URL:", ghPagesUrl);
      
      return ghPagesUrl;
    } catch (error: any) {
      if (error.response?.status === 409 && retryCount > 0) {
        console.log(`Upload conflict detected, retrying... (${retryCount} attempts remaining)`);
        await delay(1000); // Wait 1 second before retrying
        return uploadImageToGitHub(file, retryCount - 1);
      }
      throw error;
    }
  } catch (error: any) {
    console.error("GitHub upload failed:", error);
    console.error("Error details:", error.response?.data || error.message);
    throw new Error(`Failed to upload image to GitHub: ${error.message}`);
  }
};