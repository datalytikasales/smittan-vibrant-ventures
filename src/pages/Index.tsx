import { ArrowRight, ChevronRight, Leaf, Shield, Heart, Users, Globe, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-smittan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center">
          <div className="absolute inset-0 bg-smittan-600/80 backdrop-blur-sm" />
        </div>
        
        <div className="container relative py-24 md:py-32">
          <div className="max-w-2xl space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold">
              Empowering Your Salesforce
            </h1>
            <p className="text-xl text-gray-200">
              Transform your business with our comprehensive sales and marketing solutions. We help companies venture into new markets and achieve unprecedented growth.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" className="bg-white text-smittan-600 hover:bg-gray-100">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600">
              Comprehensive business development solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-hover">
                <div className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-smittan-100 rounded-lg flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-smittan-600" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                  <Button variant="link" className="text-smittan-600 p-0 h-auto font-semibold" asChild>
                    <Link to="/services">
                      Learn More in the services page
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600">
              Discover what makes Smittan Solutions your ideal business partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mb-6 bg-smittan-100 rounded-full flex items-center justify-center mx-auto">
                  <item.icon className="h-8 w-8 text-smittan-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.description}</p>
                {item.stats && (
                  <div className="mt-4 text-center">
                    <span className="text-2xl font-bold text-smittan-600">{item.stats}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-smittan-600 text-white">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-200">
              Let's discuss how we can help you achieve your business goals and expand into new markets.
            </p>
            <Button size="lg" className="bg-white text-smittan-600 hover:bg-gray-100">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const services = [
  {
    title: "Sales Development",
    description: "Build and optimize your sales processes for maximum efficiency and results.",
    icon: ChevronRight,
  },
  {
    title: "Marketing Strategy",
    description: "Create compelling marketing campaigns that resonate with your target audience.",
    icon: ChevronRight,
  },
  {
    title: "Brand Development",
    description: "Develop a strong brand identity that sets you apart from the competition.",
    icon: ChevronRight,
  },
];

const whyChooseUs = [
  {
    icon: Leaf,
    title: "Sustainability Practices",
    description: "We prioritize responsible sourcing of skilled talent, uphold integrity, and implement best practices to ensure 100% fulfillment of our promises to clients.",
    stats: "100% Fulfillment"
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Stringent quality control measures are ingrained in our processes, guaranteeing consistency and integrity in every project ensuring 100% delivery of our objectives.",
    stats: "100% Delivery"
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description: "Customer satisfaction forms the cornerstone of our business ethos. We are committed to surpassing expectations through competitive pricing and proactive support."
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "As a socially conscious entity, we actively engage with local communities, empowering small businesses through training, market access, and market insights."
  },
  {
    icon: Globe,
    title: "Future Plans",
    description: "We envision expanding our operations across Africa, acquiring more businesses and delivering lasting solutions in sales and marketing for sustainable partner growth."
  }
];

export default Index;