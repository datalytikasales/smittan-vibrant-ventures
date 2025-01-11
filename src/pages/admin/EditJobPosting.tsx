import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  responsibilities: z.string().min(1, "Responsibilities are required"),
  qualifications: z.string().min(1, "Qualifications are required"),
  location: z.string().min(1, "Location is required"),
  apply_by_date: z.string().min(1, "Application deadline is required"),
  is_active: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const EditJobPosting = () => {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      responsibilities: "",
      qualifications: "",
      location: "",
      apply_by_date: "",
      is_active: true,
    },
  });

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

    const fetchJobPosting = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("job_postings")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          form.reset({
            title: data.title,
            description: data.description,
            responsibilities: data.responsibilities,
            qualifications: data.qualifications,
            location: data.location || "",
            apply_by_date: data.apply_by_date ? new Date(data.apply_by_date).toISOString().split('T')[0] : "",
            is_active: data.is_active,
          });
        }
      } catch (error) {
        console.error("Error fetching job posting:", error);
        toast({
          title: "Error",
          description: "Failed to fetch job posting details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
    fetchJobPosting();
  }, [id, navigate, form, toast]);

  const onSubmit = async (values: FormValues) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You don't have permission to manage job postings",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const { error } = id
        ? await supabase
            .from("job_postings")
            .update({
              title: values.title,
              description: values.description,
              responsibilities: values.responsibilities,
              qualifications: values.qualifications,
              location: values.location,
              apply_by_date: values.apply_by_date,
              is_active: values.is_active,
              updated_at: new Date().toISOString(),
            })
            .eq("id", id)
        : await supabase
            .from("job_postings")
            .insert({
              title: values.title,
              description: values.description,
              responsibilities: values.responsibilities,
              qualifications: values.qualifications,
              location: values.location,
              apply_by_date: values.apply_by_date,
              is_active: values.is_active,
            });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Job posting ${id ? "updated" : "created"} successfully`,
      });

      navigate("/admin/job-postings");
    } catch (error) {
      console.error("Error saving job posting:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${id ? "update" : "create"} job posting`,
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
          {id ? "Edit Job Posting" : "Create New Job Posting"}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={6}
                      placeholder="Enter the detailed job description..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibilities</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={6}
                      placeholder="Enter the job responsibilities..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qualifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualifications</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={6}
                      placeholder="Enter the required qualifications..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter the job location (Town/City in Kenya)..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apply_by_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Deadline</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Active
                    </FormLabel>
                    <FormDescription>
                      Make this job posting visible on the careers page
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {id ? "Update Job Posting" : "Create Job Posting"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditJobPosting;