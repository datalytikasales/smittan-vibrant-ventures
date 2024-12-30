import { supabase } from "@/lib/supabase";

export const uploadGalleryImage = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const filePath = `${crypto.randomUUID()}.${fileExt}`;

  const { data, error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from("gallery")
    .getPublicUrl(filePath);

  return publicUrl;
};