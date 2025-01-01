import { 
  MessageSquare, 
  Image, 
  Plus,
  BookOpen,
  UserPlus,
} from "lucide-react";

export const menuItems = [
  {
    icon: MessageSquare,
    label: "Leads",
    href: "/admin/leads"
  },
  {
    icon: Image,
    label: "Gallery",
    href: "/admin/gallery"
  },
  {
    icon: Plus,
    label: "Create New Project",
    href: "/admin/edit-gallery"
  },
  {
    icon: BookOpen,
    label: "Guide Through Your Website",
    href: "/admin/website-guide"
  },
  {
    icon: UserPlus,
    label: "Register New Admin",
    href: "/admin/register"
  }
];