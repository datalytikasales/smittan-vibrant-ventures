import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: servicesData } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services_sections')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

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

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive business development solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData?.map((service) => (
              <Card 
                key={service.id} 
                className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-smittan-600"
              >
                <div className="p-6 space-y-4">
                  <div className="bg-[#F97316]/10 p-3 rounded-full w-fit">
                    <service.icon className="h-8 w-8 text-[#F97316]" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <ArrowRight className="h-4 w-4 text-smittan-600 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
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
            <Button size="lg" className="bg-white text-smittan-600 hover:bg-gray-100" asChild>
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;