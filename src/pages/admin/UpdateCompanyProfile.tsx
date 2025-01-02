import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyProfileUploader } from "@/components/admin/company-profile/CompanyProfileUploader";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function UpdateCompanyProfile() {
  const { data: currentProfile, isLoading } = useQuery({
    queryKey: ['companyProfile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_documents')
        .select('*')
        .eq('document_type', 'company_profile')
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Update Company Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyProfileUploader currentProfile={currentProfile} />
        </CardContent>
      </Card>
    </div>
  );
}