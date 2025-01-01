import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { PageHero } from "@/components/layout/PageHero";
import { supabase } from "@/lib/supabase";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

interface GalleryProject {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  gallery_images: {
    id: string;
    image_url: string;
    caption: string | null;
    order_index: number;
  }[];
}

const Gallery = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["gallery-projects"],
    queryFn: async () => {
      const { data: projectsData, error: projectsError } = await supabase
        .from("project_gallery")
        .select(`
          id,
          title,
          description,
          date,
          gallery_images (
            id,
            image_url,
            caption,
            order_index
          )
        `)
        .order("date", { ascending: false });

      if (projectsError) throw projectsError;

      // Transform the data to use GitHub Pages URLs if needed
      return projectsData?.map(project => ({
        ...project,
        gallery_images: project.gallery_images?.map(image => ({
          ...image,
          image_url: image.image_url.replace(
            /^https:\/\/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/[^/]+\//,
            'https://datalytikasales.github.io/smittan-vibrant-ventures/'
          )
        }))
      })) as GalleryProject[];
    },
  });

  if (isLoading) {
    return (
      <div>
        <PageHero 
          title="Gallery" 
          description="Explore our projects and events through our photo gallery" 
        />
        <div className="container py-12">
          <div className="space-y-12">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-20 w-full" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="aspect-[4/3] w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero 
        title="Gallery" 
        description="Explore our projects and events through our photo gallery" 
      />
      <div className="container py-12">
        <div className="space-y-16">
          {projects?.map((project) => {
            const sortedImages = [...(project.gallery_images || [])].sort(
              (a, b) => (a.order_index || 0) - (b.order_index || 0)
            );

            return (
              <div key={project.id}>
                <div className="bg-white shadow-sm mb-8 w-full">
                  <div className="py-6 px-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {project.title}
                    </h2>
                    {project.date && (
                      <p className="text-sm text-gray-500 mt-2">
                        {format(new Date(project.date), "MMMM d, yyyy")}
                      </p>
                    )}
                    {project.description && (
                      <p className="text-gray-600 mt-3">
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sortedImages.map((image) => (
                    <div key={image.id} className="space-y-2">
                      <AspectRatio ratio={4 / 3} className="bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={image.image_url}
                          alt={image.caption || project.title}
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                      {image.caption && (
                        <p className="text-sm text-gray-600">{image.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;