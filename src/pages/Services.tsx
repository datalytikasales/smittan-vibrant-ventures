import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Target, Megaphone, 
  BarChart2, Wallet, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: MapPin,
    title: "Market Mapping",
    description: "Strategic market analysis and opportunity identification to drive business growth.",
    features: [
      "Comprehensive Market Analysis",
      "Opportunity Identification",
      "Competitor Landscape Assessment",
      "Growth Potential Evaluation"
    ]
  },
  {
    icon: Target,
    title: "Market Activations",
    description: "Specialized sales teams dedicated to revitalizing dormant accounts and acquiring new customers.",
    features: [
      "Customer Reactivation Programs",
      "New Customer Acquisition",
      "Performance-Based Sales Teams",
      "Target Achievement Tracking"
    ]
  },
  {
    icon: Megaphone,
    title: "Roadshows & Brand Promotions",
    description: "Comprehensive marketing and merchandising solutions that elevate brand visibility and market presence.",
    features: [
      "Strategic Event Planning",
      "Brand Activation Campaigns",
      "Merchandising Excellence",
      "Impact Measurement"
    ]
  },
  {
    icon: BarChart2,
    title: "Route-to-Market Strategy",
    description: "Optimize your commercial operations and distribution networks for maximum efficiency and market coverage.",
    features: [
      "Distribution Network Analysis",
      "Cost Optimization",
      "Sales Force Efficiency",
      "Territory Planning"
    ]
  },
  {
    icon: Wallet,
    title: "Credit Management Solutions",
    description: "Professional debt collection and portfolio management services to maintain healthy financial operations.",
    features: [
      "Portfolio Analysis",
      "Professional Debt Recovery",
      "Risk Assessment",
      "Payment Plan Structuring"
    ]
  }
];

const Services = () => {
  return (
    <div className="bg-gray-50">
      <PageHero 
        title="Products & Services" 
        description="Comprehensive business solutions designed to optimize your market presence and drive sustainable growth."
      />
      
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-smittan-800">Strategic Business Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide end-to-end business solutions that help organizations identify opportunities, 
            optimize operations, and achieve sustainable growth in their target markets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-smittan-600"
            >
              <CardContent className="p-6">
                <div className="bg-smittan-50 p-3 rounded-full w-fit mb-4">
                  <service.icon className="h-8 w-8 text-smittan-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-smittan-800">{service.title}</h3>
                <p className="text-gray-600 mb-4 min-h-[60px]">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 text-smittan-600 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4 text-smittan-800">Ready to Transform Your Business?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Let's discuss how our services can help you optimize your market presence and achieve your business objectives.
          </p>
          <Button 
            size="lg" 
            className="bg-smittan-600 hover:bg-smittan-700"
            asChild
          >
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;