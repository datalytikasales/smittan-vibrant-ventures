import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/lib/supabase";

interface GalleryProject {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  created_at: string;
}

const GalleryList = () => {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("project_gallery")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch gallery projects",
      });
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (projectId: string) => {
    navigate(`/admin/edit-gallery/${projectId}`);
  };

  const handleDelete = async (projectId: string) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You don't have permission to delete gallery projects",
      });
      return;
    }

    try {
      // First, delete associated images from storage and database
      const { data: images } = await supabase
        .from("gallery_images")
        .select("image_url")
        .eq("project_gallery_id", projectId);

      if (images) {
        for (const image of images) {
          const path = image.image_url.split("/").pop();
          if (path) {
            await supabase.storage.from("gallery").remove([path]);
          }
        }
      }

      // Delete gallery images records
      await supabase
        .from("gallery_images")
        .delete()
        .eq("project_gallery_id", projectId);

      // Delete the project
      const { error } = await supabase
        .from("project_gallery")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Gallery project deleted successfully",
      });

      // Refresh the projects list
      fetchProjects();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete gallery project",
      });
      console.error('Error deleting project:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-6">
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-lg">
          You don't have permission to access this page.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gallery Projects</h1>
        <Button onClick={() => navigate("/admin/edit-gallery")}>
          Create New Project
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                  {project.date ? format(new Date(project.date), 'MMM d, yyyy') : '-'}
                </TableCell>
                <TableCell>
                  {format(new Date(project.created_at), 'MMM d, yyyy HH:mm')}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(project.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Gallery Project</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this gallery project? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(project.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No gallery projects found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GalleryList;