import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload } from "lucide-react";
import { uploadImageToGitHub } from "@/utils/githubUploader";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

interface CompanyProfileUploaderProps {
  currentProfile?: {
    file_url: string;
    original_filename: string;
  };
}

export function CompanyProfileUploader({ currentProfile }: CompanyProfileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'pptx'].includes(fileType || '')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload only PDF or PPTX files.",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Upload to GitHub
      const fileUrl = await uploadImageToGitHub(file);

      // Update database
      const { error } = await supabase
        .from('company_documents')
        .upsert({
          document_type: 'company_profile',
          file_url: fileUrl,
          original_filename: file.name,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'document_type'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Company profile has been updated successfully.",
      });

      // Invalidate the query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['companyProfile'] });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "Failed to upload company profile.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {currentProfile && (
        <div className="space-y-2">
          <Label>Current Profile Document</Label>
          <p className="text-sm text-gray-500">
            {currentProfile.original_filename}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="profile-upload">Upload New Profile</Label>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => document.getElementById('profile-upload')?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {isUploading ? "Uploading..." : "Select File"}
          </Button>
          <input
            id="profile-upload"
            type="file"
            accept=".pdf,.pptx"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </div>
        <p className="text-sm text-gray-500">
          Accepted formats: PDF, PPTX
        </p>
      </div>
    </div>
  );
}