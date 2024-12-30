import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageUpload {
  file?: File;
  caption: string;
  preview: string;
}

interface ImageUploadPreviewProps {
  images: ImageUpload[];
  onRemove: (index: number) => void;
  onCaptionChange: (index: number, caption: string) => void;
}

export const ImageUploadPreview = ({
  images,
  onRemove,
  onCaptionChange,
}: ImageUploadPreviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative border rounded-lg p-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={() => onRemove(index)}
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
            onChange={(e) => onCaptionChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};