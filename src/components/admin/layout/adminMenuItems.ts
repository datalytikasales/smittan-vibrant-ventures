import { LayoutDashboard, Image, Users, FileText } from "lucide-react";

export const menuItems = [
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
  {
    label: "Register New Admin",
    href: "/admin/register",
    icon: UserPlus,
  },
];
