import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, MessageSquare, Image, Plus, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (!session) {
          if (mounted) {
            setIsAdmin(false);
            navigate("/admin");
          }
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", session.user.id)
          .single();

        if (profileError) throw profileError;

        if (!profile?.is_admin) {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have admin privileges.",
          });
          await supabase.auth.signOut();
          if (mounted) {
            setIsAdmin(false);
            navigate("/admin");
          }
          return;
        }

        if (mounted) {
          setIsAdmin(true);
        }
      } catch (error: any) {
        console.error("Error checking admin status:", error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message || "Please try logging in again.",
        });
        if (mounted) {
          setIsAdmin(false);
          navigate("/admin");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        if (mounted) {
          setIsAdmin(false);
          navigate("/admin");
        }
      } else {
        // Recheck admin status on auth state change
        checkAuth();
      }
    });

    checkAuth();

    // Cleanup
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">Smittan Admin</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/leads">
                    <MessageSquare className="w-4 h-4" />
                    <span>Leads</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/gallery">
                    <Image className="w-4 h-4" />
                    <span>Gallery</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/edit-gallery">
                    <Plus className="w-4 h-4" />
                    <span>Create New Project</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <div className="mt-auto p-4">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </Sidebar>
        <main className="flex-1 bg-gray-50">{children}</main>
      </div>
    </SidebarProvider>
  );
};