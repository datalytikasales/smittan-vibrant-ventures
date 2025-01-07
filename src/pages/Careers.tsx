import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import { JobApplicationForm } from "@/components/careers/JobApplicationForm";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface JobPosting {
  id: string;
  title: string;
  description: string;
  qualifications: string;
  posted_at: string;
}

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["job-postings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_postings")
        .select("*")
        .eq("is_active", true)
        .order("posted_at", { ascending: false });

      if (error) throw error;
      return data as JobPosting[];
    },
  });

  if (isLoading) {
    return (
      <div>
        <PageHero 
          title="Careers" 
          description="Join our team and be part of something great" 
        />
        <div className="container py-12">
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
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
        title="Careers" 
        description="Join our team and be part of something great" 
      />
      <div className="container py-12">
        <div className="space-y-8">
          {jobs?.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
              <p className="text-sm text-gray-500 mt-2">
                Posted on {format(new Date(job.posted_at), "MMMM d, yyyy")}
              </p>
              <div className="mt-4 prose max-w-none">
                <h3 className="text-lg font-semibold">Job Description</h3>
                <p className="whitespace-pre-wrap">{job.description}</p>
                
                <h3 className="text-lg font-semibold mt-4">Qualifications</h3>
                <p className="whitespace-pre-wrap">{job.qualifications}</p>
              </div>
              <div className="mt-6">
                <Button 
                  onClick={() => setSelectedJob(job)}
                  className="w-full sm:w-auto"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          ))}

          {jobs?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No open positions at the moment. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>

      <JobApplicationForm
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
};

export default Careers;