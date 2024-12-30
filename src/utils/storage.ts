import { supabase } from "@/lib/supabase";

export const uploadGalleryImage = async (file: File): Promise<string> => {
  try {
    // First verify admin status
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('Session error:', sessionError);
      throw new Error('Authentication error: ' + sessionError.message);
    }
    
    if (!session?.user?.id) {
      throw new Error('User not authenticated');
    }

    // Verify admin status
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      throw new Error('Failed to verify admin status: ' + profileError.message);
    }

    if (!profile?.is_admin) {
      throw new Error('Unauthorized: Admin access required');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    // Create a new File object with the correct content type
    const fileWithType = new File([file], fileName, {
      type: file.type
    });

    // Upload file with explicit content type
    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, fileWithType, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(fileName);

    if (!publicUrl) {
      throw new Error('Failed to get public URL for uploaded file');
    }

    return publicUrl;
  } catch (error: any) {
    console.error('Error in uploadGalleryImage:', error);
    throw new Error(
      `File upload failed: ${error.message || 'Unknown error'}`
    );
  }
};