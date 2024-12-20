import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, Users, BadgeCheck, Target, 
  BarChart, Building, Megaphone, GraduationCap 
} from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Sales Development",
    description: "Comprehensive sales strategies and pipeline development to drive revenue growth.",
    features: [
      "Sales Process Optimization",
      "Pipeline Management",
      "Sales Analytics",
      "Territory Planning"
    ]
  },
  {
    icon: Megaphone,
    title: "Marketing Strategy",
    description: "Data-driven marketing solutions to enhance your brand presence and reach.",
    features: [
      "Market Research",
      "Digital Marketing",
      "Content Strategy",
      "Campaign Management"
    ]
  },
  {
    icon: BadgeCheck,
    title: "Brand Development",
    description: "Create a strong, memorable brand that resonates with your target audience.",
    features: [
      "Brand Strategy",
      "Visual Identity",
      "Brand Guidelines",
      "Brand Positioning"
    ]
  },
  {
    icon: Users,
    title: "Sales Team Mobilization",
    description: "Build and manage high-performing sales teams for maximum impact.",
    features: [
      "Team Structure",
      "Performance Metrics",
      "Incentive Programs",
      "Team Coordination"
    ]
  },
  {
    icon: GraduationCap,
    title: "Sales Training",
    description: "Comprehensive training programs to enhance your team's sales capabilities.",
    features: [
      "Skills Development",
      "Product Knowledge",
      "Sales Techniques",
      "Customer Engagement"
    ]
  },
  {
    icon: Target,
    title: "Market Entry Strategy",
    description: "Strategic guidance for successful entry into new markets and territories.",
    features: [
      "Market Analysis",
      "Risk Assessment",
      "Entry Planning",
      "Local Partnership"
    ]
  },
  {
    icon: BarChart,
    title: "Performance Analytics",
    description: "Data-driven insights to optimize your sales and marketing efforts.",
    features: [
      "KPI Tracking",
      "Performance Reports",
      "Trend Analysis",
      "ROI Measurement"
    ]
  },
  {
    icon: Building,
    title: "Business Consulting",
    description: "Expert advice on business growth and operational efficiency.",
    features: [
      "Growth Strategy",
      "Process Optimization",
      "Change Management",
      "Business Planning"
    ]
  }
];

const Services = () => {
  return (
    <div>
      <PageHero 
        title="Our Services" 
        description="Comprehensive business development solutions tailored to your needs."
      />
      
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From sales development to market entry strategies, we provide end-to-end 
            solutions to help your business grow and succeed in new markets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <service.icon className="h-12 w-12 text-smittan-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <BadgeCheck className="h-4 w-4 text-smittan-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Let's discuss how our services can help you achieve your business goals 
            and expand into new markets.
          </p>
          <Button size="lg">Contact Us Today</Button>
        </div>
      </div>
    </div>
  );
};

export default Services;