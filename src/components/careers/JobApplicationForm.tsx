import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { uploadImageToGitHub } from "@/utils/githubUploader";
import { supabase } from "@/integrations/supabase/client";

interface JobPosting {
  id: string;
  title: string;
}

interface JobApplicationFormProps {
  job: JobPosting | null;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

export function JobApplicationForm({ job, onClose }: JobApplicationFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF file",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Starting form submission with values:", values);
    console.log("Selected file:", selectedFile);
    console.log("Job ID:", job?.id);

    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Resume required",
        description: "Please upload your resume",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Upload resume to GitHub
      console.log("Uploading resume to GitHub...");
      const resumeUrl = await uploadImageToGitHub(selectedFile);
      console.log("Resume uploaded successfully:", resumeUrl);

      // Save application to database
      console.log("Saving application to database...");
      const { data, error } = await supabase.from("job_applicants").insert({
        job_posting_id: job?.id,
        name: values.name,
        email: values.email,
        phone_number: values.phone || null,
        resume_url: resumeUrl,
      }).select();

      console.log("Database response:", { data, error });

      if (error) throw error;

      toast({
        title: "Application submitted",
        description: "Thank you for your application!",
      });

      onClose();
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit application. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={!!job} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for {job?.title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Resume (PDF)</FormLabel>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("resume-upload")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {selectedFile ? "Change File" : "Upload Resume"}
                </Button>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-500">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isUploading} className="w-full">
              {isUploading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Submit Application
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}