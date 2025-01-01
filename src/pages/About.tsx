import { PageHero } from "@/components/layout/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Users, Trophy, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "We focus on delivering measurable outcomes that drive your business forward."
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our priority. We work closely with you to understand and meet your unique needs."
  },
  {
    icon: Trophy,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from strategy to execution."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of market trends to provide cutting-edge solutions for your business."
  }
];

const About = () => {
  return (
    <div>
      <PageHero 
        title="About Smittan Solutions" 
        description="Your trusted partner in business growth and market expansion across Kenya."
      />
      
      <div className="container py-16">
        <div className="bg-orange-50/50 shadow-sm rounded-lg mb-12 w-full">
          <div className="py-8 px-6">
            <h2 className="text-3xl font-bold text-center">Our Story</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded with a vision to transform how businesses approach growth and market expansion, 
                Smittan Solutions has emerged as a leading business development agency in Kenya.
              </p>
              <p>
                Our journey began with a simple yet powerful idea: to provide comprehensive business 
                development solutions that enable companies to reach their full potential in new markets.
              </p>
              <p>
                Today, we pride ourselves on our track record of helping businesses across various 
                sectors achieve sustainable growth through our integrated approach to sales, 
                marketing, and business development.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="/lovable-uploads/vilcom.jpeg"
              alt="Smittan Solutions Team"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-orange-50/50 shadow-sm rounded-lg mb-12 w-full">
            <div className="py-8 px-6">
              <h2 className="text-3xl font-bold text-center">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-center mt-2">
                These core values guide everything we do at Smittan Solutions, 
                ensuring we deliver the best possible outcomes for our clients.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <value.icon className="h-8 w-8 text-smittan-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Let's discuss how Smittan Solutions can help you achieve your business goals 
            and expand into new markets.
          </p>
          <Button variant="default" size="lg">Contact Us Today</Button>
        </div>
      </div>
    </div>
  );
};

export default About;