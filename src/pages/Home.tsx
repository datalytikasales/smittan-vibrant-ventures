import { PageHero } from "@/components/layout/PageHero";

const Home = () => {
  return (
    <div>
      <PageHero 
        title="Welcome to Smittan Solutions" 
        description="Your trusted partner in business growth and market expansion across Kenya."
      />
      
      <div className="container py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Why Choose Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
            <p className="text-gray-600">
              We focus on creating long-term, sustainable growth strategies that benefit your business for years to come.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
            <p className="text-gray-600">
              Our rigorous quality control processes ensure consistent, high-quality service delivery.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Customer Satisfaction</h3>
            <p className="text-gray-600">
              We prioritize your success and satisfaction, maintaining open communication throughout our partnership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;