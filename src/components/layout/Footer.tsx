import { Download, Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const Footer = () => {
  const { data: companyProfile } = useQuery({
    queryKey: ['companyProfile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_documents')
        .select('file_url')
        .eq('document_type', 'company_profile')
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <footer className="bg-smittan-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About Smittan</h3>
            <p className="text-sm text-gray-300">
              Smittan Solutions Limited is a leading business development agency specializing in sales, marketing, and brand development. We help companies venture into new markets and achieve their growth objectives.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Info</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>
                  Ruaka Town, Kiambu County, Kenya
                  <br />
                  P.O Box 55534-00200 Nairobi Kenya
                </span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+254704444724 / +254704698288</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail size={16} />
                <span>admin@smittan.co.ke</span>
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Our Team</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                <strong>John Gikunda</strong>
                <br />
                MD and Founder
                <br />
                <a href="mailto:jgikunda@smittan.co.ke" className="hover:text-smittan-300">jgikunda@smittan.co.ke</a>
              </p>
              <p>
                <strong>Brian Kariuki</strong>
                <br />
                Project Manager - Vilcom
                <br />
                <a href="mailto:bkariuki@smittan.co.ke" className="hover:text-smittan-300">bkariuki@smittan.co.ke</a>
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Resources & Connect</h3>
            <div className="space-y-4">
              <Button 
                variant="default" 
                className="w-full justify-start"
                onClick={() => window.open(companyProfile?.file_url, '_blank')}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Company Profile
              </Button>
              <div className="flex space-x-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-smittan-300 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-smittan-300 transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-smittan-300 transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-smittan-800 text-center text-sm">
          <p className="text-[#F97316]">&copy; {new Date().getFullYear()} Smittan Solutions Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};