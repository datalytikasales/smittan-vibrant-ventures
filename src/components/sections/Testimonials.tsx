import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    content: "Smittan Solutions transformed our sales approach completely. Their strategic insights and hands-on training resulted in a 40% increase in our quarterly revenue.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    name: "Michael Chen",
    role: "Sales Director, GrowthPro",
    content: "The team at Smittan doesn't just provide solutions; they become your growth partners. Their dedication to our success was evident throughout our collaboration.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    name: "David Kimani",
    role: "Founder, LocalTech Kenya",
    content: "Working with Smittan Solutions has been transformative for our business. Their deep understanding of the Kenyan market helped us expand our reach significantly.",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What People Say About Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience working with Smittan Solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-12 pb-8">
                <div className="absolute -top-6 left-6">
                  <div className="bg-smittan-600 rounded-full p-4">
                    <QuoteIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                  />
                  <p className="text-gray-700 italic mb-6">{testimonial.content}</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};