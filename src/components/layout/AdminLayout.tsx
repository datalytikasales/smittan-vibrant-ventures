import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminAuthCheck } from "@/components/admin/layout/AdminAuthCheck";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminAuthCheck>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <main className="flex-1 bg-gray-50 p-8">{children}</main>
        </div>
      </SidebarProvider>
    </AdminAuthCheck>
  );
};