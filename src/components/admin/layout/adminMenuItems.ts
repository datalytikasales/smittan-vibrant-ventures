import { LayoutDashboard, Image, Users, FileText } from "lucide-react";

export const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
    icon: Image,
  },
  {
    label: "Leads",
    href: "/admin/leads",
    icon: Users,
  },
  {
    label: "Company Profile",
    href: "/admin/company-profile",
    icon: FileText,
  },
];