import { Card } from "@/components/ui/card";

interface WhyChooseUsItem {
  title: string;
  description: string;
  stats?: string;
  image: string;
}

const whyChooseUs: WhyChooseUsItem[] = [
  {
    title: "Sustainability Practices",
    description: "We prioritize responsible sourcing of skilled talent, uphold integrity, and implement best practices to ensure 100% fulfillment of our promises to clients.",
    stats: "100% Fulfillment",
    image: "https://lweyajoe.github.io/myImages/sustainability.png"
  },
  {
    title: "Customer Satisfaction",
    description: "Customer satisfaction forms the cornerstone of our business ethos. We are committed to surpassing expectations through competitive pricing and proactive support.",
    stats: "98% Client Retention",
    image: "https://lweyajoe.github.io/myImages/customer-satisfaction.png"
  },
  {
    title: "Community Engagement",
    description: "As a socially conscious entity, we actively engage with local communities, empowering small businesses through training, market access, and market insights.",
    stats: "Many Businesses Empowered",
    image: "https://lweyajoe.github.io/myImages/community.png"
  },
  {
    title: "Target Market",
    description: "We understand our target market deeply and provide tailored solutions that meet their specific needs and challenges.",
    stats: "95% Market Success Rate",
    image: "https://lweyajoe.github.io/myImages/target-market.jpg"
  },
  {
    title: "Future Plans",
    description: "We envision expanding our operations across Africa, acquiring more businesses and delivering lasting solutions in sales and marketing for sustainable partner growth.",
    stats: "5+ Countries by 2035",
    image: "https://lweyajoe.github.io/myImages/future-plans.png"
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        {/* Top row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {whyChooseUs.slice(0, 3).map((item, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden max-h-40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                {item.stats && (
                  <div className="mt-2">
                    <span className="text-lg font-bold text-smittan-600">{item.stats}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
        
        {/* Bottom row - 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          {whyChooseUs.slice(3).map((item, index) => (
            <Card 
              key={index + 3} 
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden max-h-40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                {item.stats && (
                  <div className="mt-2">
                    <span className="text-lg font-bold text-smittan-600">{item.stats}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
