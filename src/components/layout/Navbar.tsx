import { Phone, Mail, Facebook, Linkedin, Twitter, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-smittan-600 text-white py-2">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:+254704444724" className="flex items-center space-x-2 text-sm hover:text-[#F97316] transition-colors">
              <Phone size={16} className="text-[#F97316]" />
              <span>+254704444724</span>
            </a>
            <a href="mailto:admin@smittan.co.ke" className="flex items-center space-x-2 text-sm hover:text-[#F97316] transition-colors">
              <Mail size={16} className="text-[#F97316]" />
              <span>admin@smittan.co.ke</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97316] transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97316] transition-colors">
              <Facebook size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97316] transition-colors">
              <Twitter size={16} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <nav className="bg-white border-b border-gray-100 py-4">
        <div className="container flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/e3a75738-c06d-4783-ac82-7934311a864a.png" alt="Smittan Logo" className="h-12" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/gallery" className="nav-link">Gallery</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <a href="https://mail.zoho.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Admin Mail
              </Button>
            </a>
            <Link to="/admin">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Admin Login
              </Button>
            </Link>
          </div>
          
          <button className="md:hidden">
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};