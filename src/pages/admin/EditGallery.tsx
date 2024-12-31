import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GalleryForm, type GalleryFormValues } from "@/components/admin/gallery/GalleryForm";

interface ImageUpload {
  file?: File;
  caption: string;
  preview: string;
}

const EditGallery = () => {
  const { id } = useParams(); // Changed from projectId to id to match route param
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [defaultValues, setDefaultValues] = useState<GalleryFormValues | undefined>();
  const [existingImages, setExistingImages] = useState<ImageUpload[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      setIsAdmin(profile?.is_admin || false);
    };

    const fetchProject = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: project, error: projectError } = await supabase
          .from("project_gallery")
          .select(`
            *,
            gallery_images (
              id,
              image_url,
              caption,
              order_index
            )
          `)
          .eq("id", id)
          .single();

        if (projectError) throw projectError;

        if (project) {
          setDefaultValues({
            title: project.title,
            description: project.description || "",
            date: project.date || new Date().toISOString().split("T")[0],
          });

          // Sort images by order_index
          const sortedImages = [...project.gallery_images].sort(
            (a, b) => (a.order_index || 0) - (b.order_index || 0)
          );

          setExistingImages(
            sortedImages.map((image) => ({
              preview: image.image_url,
              caption: image.caption || "",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast({
          title: "Error",
          description: "Failed to fetch project details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
    fetchProject();
  }, [id, navigate, toast]);

  const handleSubmit = async (values: GalleryFormValues, images: ImageUpload[]) => {
    if (!isAdmin) {
      toast({
        title: "Error",
        description: "You don't have permission to manage gallery projects",
        variant: "destructive",
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Handle project update or creation
      const { data: project, error: projectError } = id
        ? await supabase
            .from("project_gallery")
            .update({
              title: values.title,
              description: values.description,
              date: values.date,
              updated_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select()
            .single()
        : await supabase
            .from("project_gallery")
            .insert({
              title: values.title,
              description: values.description,
              date: values.date,
            })
            .select()
            .single();

      if (projectError) throw projectError;

      // If editing, remove existing images
      if (id) {
        const { error: deleteError } = await supabase
          .from("gallery_images")
          .delete()
          .eq("project_gallery_id", id);

        if (deleteError) throw deleteError;
      }

      // Create gallery image entries
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        const { error: galleryError } = await supabase
          .from("gallery_images")
          .insert({
            project_gallery_id: project.id,
            image_url: image.preview,
            caption: image.caption || null,
            order_index: i,
          });

        if (galleryError) throw galleryError;
      }

      toast({
        title: "Success",
        description: `Gallery project ${id ? "updated" : "created"} successfully`,
      });

      navigate("/admin/gallery");
    } catch (error) {
      console.error("Error managing gallery project:", error);
      toast({
        title: "Error",
        description: `Failed to ${id ? "update" : "create"} gallery project. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="container py-8">
        <Alert variant="destructive">
          <AlertDescription>
            You don't have permission to access this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Edit Gallery Project" : "Create New Gallery Project"}
        </h1>

        <GalleryForm
          defaultValues={defaultValues}
          existingImages={existingImages}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditGallery;