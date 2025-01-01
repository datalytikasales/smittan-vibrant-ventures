import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-smittan-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center">
          <div className="absolute inset-0 bg-smittan-600/80 backdrop-blur-sm" />
        </div>
        
        <div className="container relative py-24 md:py-32">
          <div className="max-w-2xl space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-[#F97316]">
              Empowering Your Salesforce
            </h1>
            <p className="text-xl text-[#F97316]">
              Transform your business with our comprehensive sales and marketing solutions. We help companies venture into new markets and achieve unprecedented growth.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" className="bg-white text-smittan-600 hover:bg-gray-100">
                <Link to="/services">
                  Get Started
                </Link>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-gray-50">
        <div className="bg-white shadow-sm mb-12 w-full">
          <div className="container py-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-gray-600">
                Comprehensive business development solutions tailored to your needs
              </p>
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-hover">
                <div className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-[#F97316]/10 rounded-lg flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-[#F97316]" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                  <Button variant="link" className="text-[#F97316] p-0 h-auto font-semibold" asChild>
                    <Link to="/services">
                      Learn More
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
      <section className="section-padding">
        <div className="bg-white shadow-sm mb-12 w-full">
          <div className="container py-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-gray-600">
                Discover what makes Smittan Solutions your ideal business partner
              </p>
            </div>
          </div>
        </div>
        <WhyChooseUs />
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

export default Index;
