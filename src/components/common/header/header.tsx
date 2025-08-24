"use client";

import Link from "next/link";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      {/* Main Header Section */}
      <div className="py-4 px-4 lg:px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="group">
            <h1 className="text-3xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
              E-commerce
            </h1>
          </Link>

          {/* Desktop + Mobile Components */}
          <div className="flex items-center space-x-4">
            <DesktopHeader />
            <MobileHeader />
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="hidden md:block bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <nav className="py-3">
            <ul className="flex items-center justify-center space-x-8 md:space-x-12">
              <li>
                <Link 
                  href="/categories" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Categorias
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/promocoes" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Promoções
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/novidades" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Novidades
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contato" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Contato
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;