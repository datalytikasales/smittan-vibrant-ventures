import { Image, Users, FileText, UserPlus, Briefcase } from "lucide-react";

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
  {
    label: "Job Postings",
    href: "/admin/job-postings",
    icon: Briefcase,
  },
  {
    label: "Job Applications",
    href: "/admin/job-applications",
    icon: Users,
  },
];