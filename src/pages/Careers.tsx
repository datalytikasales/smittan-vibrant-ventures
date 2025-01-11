import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import { JobApplicationForm } from "@/components/careers/JobApplicationForm";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar } from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  qualifications: string;
  posted_at: string;
  location: string;
  apply_by_date: string;
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
              <div className="bg-[#D3E4FD] p-6 -mx-6 -mt-6 mb-6 rounded-t-lg">
                <h2 className="text-2xl font-bold text-white">{job.title}</h2>
                <div className="flex flex-wrap gap-4 mt-2 text-white/90">
                  <p className="text-sm">
                    Posted on {format(new Date(job.posted_at), "MMMM d, yyyy")}
                  </p>
                  {job.location && (
                    <p className="text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </p>
                  )}
                  {job.apply_by_date && (
                    <p className="text-sm flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Apply by {format(new Date(job.apply_by_date), "MMMM d, yyyy")}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-4 prose max-w-none">
                <h3 className="text-lg font-semibold text-[#F97316]">Job Description</h3>
                <p className="whitespace-pre-wrap">{job.description}</p>
                
                <h3 className="text-lg font-semibold mt-4 text-[#F97316]">Key Responsibilities</h3>
                <p className="whitespace-pre-wrap">{job.responsibilities}</p>
                
                <h3 className="text-lg font-semibold mt-4 text-[#F97316]">Qualifications</h3>
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