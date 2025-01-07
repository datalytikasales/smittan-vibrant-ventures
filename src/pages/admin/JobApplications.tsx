import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Download } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone_number: string | null;
  resume_url: string;
  applied_at: string;
  job_posting: {
    title: string;
  };
}

const JobApplications = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
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
    fetchApplications();
  }, [navigate]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("job_applicants")
        .select(`
          *,
          job_posting:job_postings (
            title
          )
        `)
        .order("applied_at", { ascending: false });

      if (error) throw error;

      setApplications(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch job applications",
      });
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
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
      <h1 className="text-2xl font-bold mb-6">Job Applications</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead className="text-right">Resume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">
                  {application.name}
                </TableCell>
                <TableCell>{application.email}</TableCell>
                <TableCell>{application.phone_number || "-"}</TableCell>
                <TableCell>{application.job_posting.title}</TableCell>
                <TableCell>
                  {format(new Date(application.applied_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a 
                      href={application.resume_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {applications.length === 0 && (
              <TableRow>
                <TableCell 
                  colSpan={6} 
                  className="text-center py-8 text-gray-500"
                >
                  No job applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobApplications;