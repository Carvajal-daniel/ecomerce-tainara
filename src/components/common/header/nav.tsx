// src/components/common/header/nav.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface NavPageProps {
  categories: {
    id: string;
    name: string;
    slug: string;
    image: string;
  }[];
}

const NavPage = ({ categories }: NavPageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>

      <div className="hidden md:block bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <nav className="py-3">
            <ul className="flex items-center justify-center space-x-8 md:space-x-12">
              <li className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <span>Produtos</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md w-56 z-50">
                    <ul className="py-2">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/categorie/${category.slug}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavPage;
