import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-smittan-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About Smittan</h3>
            <p className="text-sm text-gray-300">
              Smittan Solutions Limited is a leading business development agency specializing in sales, marketing, and brand development. We help companies venture into new markets and achieve their growth objectives.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Info</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Nairobi, Kenya</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+254 700 000 000</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@smittan.com</span>
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-smittan-300 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-smittan-300 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-smittan-300 transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-smittan-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Smittan Solutions Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};