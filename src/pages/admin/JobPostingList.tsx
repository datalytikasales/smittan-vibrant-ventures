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
import { supabase } from "@/integrations/supabase/client";

interface JobPosting {
  id: string;
  title: string;
  posted_at: string;
  is_active: boolean;
}

const JobPostingList = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
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
    fetchJobs();
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("job_postings")
        .select("*")
        .order("posted_at", { ascending: false });

      if (error) throw error;

      setJobs(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch job postings",
      });
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (jobId: string) => {
    navigate(`/admin/edit-job-posting/${jobId}`);
  };

  const handleDelete = async (jobId: string) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You don't have permission to delete job postings",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("job_postings")
        .delete()
        .eq("id", jobId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job posting deleted successfully",
      });

      fetchJobs();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete job posting",
      });
      console.error('Error deleting job:', error);
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
        <h1 className="text-2xl font-bold">Job Postings</h1>
        <Button onClick={() => navigate("/admin/edit-job-posting")}>
          Create New Job Posting
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>
                  {format(new Date(job.posted_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    job.is_active 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {job.is_active ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(job.id)}
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
                        <AlertDialogTitle>Delete Job Posting</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this job posting? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(job.id)}
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
            {jobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No job postings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobPostingList;