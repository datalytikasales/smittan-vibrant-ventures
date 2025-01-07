import { ArrowRight, ChevronRight, MapPin, Target, Megaphone, BarChart2, Wallet, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const heroContent = [
  {
    id: 1,
    title: "Empowering Your Salesforce",
    description: "Transform your business with our comprehensive sales and marketing solutions. We help companies venture into new markets and achieve unprecedented growth.",
    image: "https://lweyajoe.github.io/myImages/carousel/smittan-growth.avif"
  },
  {
    id: 2,
    title: "Sales Development",
    description: "Build and optimize your sales processes for maximum efficiency and results. Our expert team helps you implement proven strategies, train your sales force, and leverage cutting-edge tools to drive revenue growth.",
    image: "https://lweyajoe.github.io/myImages/carousel/smittan-passion.jpg"
  },
  {
    id: 3,
    title: "Marketing Strategy",
    description: "Create compelling marketing campaigns that resonate with your target audience. We help you develop data-driven strategies, identify market opportunities, and execute campaigns that deliver measurable results.",
    image: "https://lweyajoe.github.io/myImages/carousel/smittan-sale.avif"
  },
  {
    id: 4,
    title: "Brand Development",
    description: "Develop a strong brand identity that sets you apart from the competition. Our comprehensive branding solutions help you create a memorable presence, build customer trust, and establish market leadership.",
    image: "https://lweyajoe.github.io/myImages/carousel/smittan-sign.jpg"
  }
];

const servicesData = [
  {
    id: 1,
    title: "Market Mapping",
    description: "Strategic market analysis and opportunity identification to drive business growth.",
    icon: MapPin,
    features: [
      "Comprehensive Market Analysis",
      "Opportunity Identification",
      "Competitor Landscape Assessment",
      "Growth Potential Evaluation"
    ]
  },
  {
    id: 2,
    title: "Market Activations",
    description: "Specialized sales teams dedicated to revitalizing dormant accounts and acquiring new customers.",
    icon: Target,
    features: [
      "Customer Reactivation Programs",
      "New Customer Acquisition",
      "Performance-Based Sales Teams",
      "Target Achievement Tracking"
    ]
  },
  {
    id: 3,
    title: "Roadshows & Brand Promotions",
    description: "Comprehensive marketing and merchandising solutions that elevate brand visibility and market presence.",
    icon: Megaphone,
    features: [
      "Strategic Event Planning",
      "Brand Activation Campaigns",
      "Merchandising Excellence",
      "Impact Measurement"
    ]
  },
  {
    id: 4,
    title: "Route-to-Market Strategy",
    description: "Optimize your commercial operations and distribution networks for maximum efficiency and market coverage.",
    icon: BarChart2,
    features: [
      "Distribution Network Analysis",
      "Cost Optimization",
      "Sales Force Efficiency",
      "Territory Planning"
    ]
  },
  {
    id: 5,
    title: "Credit Management Solutions",
    description: "Professional debt collection and portfolio management services to maintain healthy financial operations.",
    icon: Wallet,
    features: [
      "Portfolio Analysis",
      "Professional Debt Recovery",
      "Risk Assessment",
      "Payment Plan Structuring"
    ]
  },
  {
    id: 6,
    title: "Sales and Marketing Training",
    description: "Comprehensive training programs designed to enhance your team's sales capabilities and marketing expertise.",
    icon: GraduationCap,
    features: [
      "Sales Techniques & Strategy",
      "Marketing Best Practices",
      "Customer Relationship Management",
      "Performance Metrics & Analytics"
    ]
  }
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <Carousel className="w-full h-full" selectedIndex={currentSlide}>
          <CarouselContent>
            {heroContent.map((content, index) => (
              <CarouselItem key={content.id}>
                <div className="relative w-full h-[600px] md:h-[700px]">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" /> {/* Darker overlay instead of blue tint */}
                  <div className="relative h-full container flex items-center">
                    <div className="max-w-2xl space-y-6">
                      <h1 
                        className="text-4xl md:text-6xl font-bold text-white animate-fade-up"
                        style={{ animationDelay: '200ms' }}
                      >
                        {content.title}
                      </h1>
                      <p 
                        className="text-xl text-white/90 animate-fade-up"
                        style={{ animationDelay: '400ms' }}
                      >
                        {content.description}
                      </p>
                      <div 
                        className="flex space-x-4 animate-fade-up"
                        style={{ animationDelay: '600ms' }}
                      >
                        <Button 
                          size="lg" 
                          className="bg-[#F97316] text-white hover:bg-[#F97316]/90"
                        >
                          <Link to="/services">
                            Get Started
                          </Link>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="border-white text-white hover:bg-white/10"
                        >
                          <Link to="/about">
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="container absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex justify-center gap-2">
              {heroContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index ? "bg-white scale-125" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Carousel>
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
            {servicesData.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-smittan-600"
                >
                  <div className="p-6 space-y-4">
                    <div className="bg-[#F97316]/10 p-3 rounded-full w-fit">
                      <IconComponent size={24} className="text-[#F97316]" />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <ChevronRight size={16} className="text-smittan-600 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Card>
              );
            })}
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