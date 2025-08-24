import React from "react";
import { Facebook, Instagram, Twitter,  } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-6 py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 items-center text-center md:text-left">
          {/* Logo/Name */}
          <div className="text-gray-600 font-semibold lg:text-lg">
           E-commerce Store
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-center space-x-6">
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Daniel Carvajal. Todos os direitos
            reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
