import { BookOpen, Home, Users, Phone, Image, MessageSquare, Settings, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const WebsiteGuide = () => {
  const pages = [
    {
      title: "Homepage",
      icon: Home,
      description: "The main landing page showcasing 'Why Choose Us' section highlighting our sustainability practices, quality assurance, and customer satisfaction. Features three main service cards with links to detailed service information."
    },
    {
      title: "About Page",
      icon: Users,
      description: "Presents our company background, mission statement, and introduces our professional team. Details our expertise in sales, marketing, credit management, and debt collection services."
    },
    {
      title: "Services Page",
      icon: Settings,
      description: "Comprehensive overview of our services including team recruitment, promotions, branding, route-to-market strategies, credit management, and debt collection services."
    },
    {
      title: "Gallery Page",
      icon: Image,
      description: "Showcases our latest projects and achievements. This section can be managed through the admin dashboard, allowing you to add, edit, or remove project images and details."
    },
    {
      title: "Contact Page",
      icon: Phone,
      description: "Collects leads and queries from potential clients through a contact form. All submissions can be managed in the Leads Management section of the admin dashboard."
    }
  ];

  const adminFeatures = [
    {
      title: "Leads Management",
      icon: MessageSquare,
      description: "Access and manage all contact form submissions. Review client queries and track potential leads effectively."
    },
    {
      title: "Gallery Management",
      icon: Image,
      description: "Add, edit, or remove projects from the gallery. Upload new images, update project descriptions, and maintain an up-to-date portfolio of your work."
    },
    {
      title: "Company Profile Management",
      icon: FileText,
      description: "Upload and manage the company profile document. This feature allows you to keep your downloadable company profile up to date, ensuring visitors always have access to the latest version."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Website Guide</h1>
        <p className="text-muted-foreground">
          Welcome to your website administration guide. This document will help you understand the structure and management features of your website.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Public Pages</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Card key={page.title} className="transition-all hover:shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <page.icon className="w-5 h-5 text-smittan-600" />
                  {page.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{page.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Admin Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {adminFeatures.map((feature) => (
            <Card key={feature.title} className="transition-all hover:shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className="w-5 h-5 text-smittan-600" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Alert>
        <AlertDescription className="text-sm space-y-4">
          <div>
            <p className="font-medium mb-2">Website Maintenance Services:</p>
            <p>This website is maintained by Squarehaul Limited</p>
            <p>Email: admin@squarehaul.online</p>
            <p>Phone: 0717158091</p>
          </div>
          <div>
            <p className="font-medium mb-2">Hosting Information:</p>
            <p>Host: HostAfrica</p>
            <p>Hosting Package: $20 Annual Fee</p>
            <p>Next Payment Date: 02.01.2026</p>
            <p>Domain: smittan.co.ke</p>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default WebsiteGuide;