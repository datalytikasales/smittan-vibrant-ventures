import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Loader2, Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  title: z.string().min(1).max(150, "Title must not exceed 150 characters"),
  description: z.string().max(2500, "Description must not exceed 2500 characters"),
  date: z.string().optional(),
});

interface ImageUpload {
  file: File;
  caption: string;
  preview: string;
}

const EditGallery = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<ImageUpload[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
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

    checkAdminStatus();
  }, [navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const newImages: ImageUpload[] = Array.from(files).map((file) => ({
      file,
      caption: "",
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const updateCaption = (index: number, caption: string) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index].caption = caption;
      return newImages;
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isAdmin) {
      toast({
        title: "Error",
        description: "You don't have permission to create gallery projects",
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

      // Create project entry
      const { data: project, error: projectError } = await supabase
        .from("project_gallery")
        .insert({
          title: values.title,
          description: values.description,
          date: values.date,
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Upload images and create gallery entries
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const fileExt = image.file.name.split(".").pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(filePath, image.file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: publicUrl } = supabase.storage
          .from("gallery")
          .getPublicUrl(filePath);

        // Create gallery image entry
        const { error: galleryError } = await supabase
          .from("gallery_images")
          .insert({
            project_gallery_id: project.id,
            image_url: publicUrl.publicUrl,
            caption: image.caption || null,
            order_index: i,
          });

        if (galleryError) throw galleryError;
      }

      toast({
        title: "Success",
        description: "Gallery project created successfully",
      });

      navigate("/gallery");
    } catch (error) {
      console.error("Error creating gallery project:", error);
      toast({
        title: "Error",
        description: "Failed to create gallery project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAdmin === null) {
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
        <h1 className="text-2xl font-bold mb-6">Create New Gallery Project</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project/Event Name</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={150} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} maxLength={2500} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div>
                <FormLabel>Images</FormLabel>
                <div className="mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Images
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative border rounded-lg p-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <AspectRatio ratio={4 / 3} className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <Input
                      placeholder="Image caption (optional)"
                      value={image.caption}
                      onChange={(e) => updateCaption(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Gallery Project
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditGallery;