import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Loader2 } from "lucide-react";
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
import { ImageUploadPreview } from "./ImageUploadPreview";
import { uploadImageToGitHub } from "@/utils/githubUploader";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(1).max(150, "Title must not exceed 150 characters"),
  description: z.string().max(2500, "Description must not exceed 2500 characters"),
  date: z.string().optional(),
});

export type GalleryFormValues = z.infer<typeof formSchema>;

interface ImageUpload {
  file?: File;
  caption: string;
  preview: string;
}

interface GalleryFormProps {
  defaultValues?: GalleryFormValues;
  existingImages?: ImageUpload[];
  isSubmitting: boolean;
  onSubmit: (values: GalleryFormValues, images: ImageUpload[]) => Promise<void>;
}

export const GalleryForm = ({
  defaultValues,
  existingImages = [],
  isSubmitting,
  onSubmit,
}: GalleryFormProps) => {
  const [images, setImages] = React.useState<ImageUpload[]>(existingImages);
  const { toast } = useToast();

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
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
      if (newImages[index].file) {
        URL.revokeObjectURL(newImages[index].preview);
      }
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

  const handleSubmit = async (values: GalleryFormValues) => {
    try {
      if (images.length === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please add at least one image.",
        });
        return;
      }

      // Upload images to GitHub and get their URLs
      const uploadedImages = await Promise.all(
        images.map(async (image, index) => {
          if (image.file) {
            try {
              console.log(`Uploading image ${index + 1}/${images.length}`);
              const url = await uploadImageToGitHub(image.file);
              console.log(`Successfully uploaded image ${index + 1}:`, url);
              return { ...image, preview: url };
            } catch (error: any) {
              console.error(`Failed to upload image ${index + 1}:`, error);
              throw new Error(`Failed to upload image ${index + 1}: ${error.message}`);
            }
          }
          return image;
        })
      );

      await onSubmit(values, uploadedImages);
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to upload images. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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

          <ImageUploadPreview
            images={images}
            onRemove={removeImage}
            onCaptionChange={updateCaption}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {defaultValues ? "Update Gallery Project" : "Create Gallery Project"}
        </Button>
      </form>
    </Form>
  );
};