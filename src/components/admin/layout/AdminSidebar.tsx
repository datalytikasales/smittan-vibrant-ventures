import { Home, LogOut, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { menuItems } from "./adminMenuItems";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/admin");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again.",
      });
    }
  };

  return (
    <Sidebar className="bg-[#1A1F2C] text-white">
      <SidebarHeader className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.filter(item => item.label !== "Guide Through Your Website").map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                className="hover:bg-[#7E69AB]/10 transition-colors"
              >
                <a href={item.href} className="flex items-center gap-3 px-4 py-2">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <div className="mt-auto border-t border-white/10">
        <div className="p-4 border-b border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-[#7E69AB]/10"
            onClick={() => navigate("/admin/website-guide")}
          >
            <BookOpen className="w-5 h-5 mr-3" />
            Guide Through Your Website
          </Button>
        </div>
        <div className="p-4 border-b border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-[#7E69AB]/10"
            onClick={() => navigate("/")}
          >
            <Home className="w-5 h-5 mr-3" />
            Back to Homepage
          </Button>
        </div>
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-[#7E69AB]/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </Sidebar>
  );
};