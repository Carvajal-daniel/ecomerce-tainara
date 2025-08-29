"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 Import aqui
import { ChevronDown } from "lucide-react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import UserActions from "./UserActions";
import CarPage from "../car";

interface Product {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const pathname = usePathname(); // 👈 pega rota atual

  return (
    <header className="bg-black/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      {/* Header principal */}
      <div className="py-3 px-3 sm:px-4 lg:px-6 flex items-center justify-between max-w-[100rem] mx-auto">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-white hover:text-rose-400 transition-colors duration-200"
        >
          E-commerce
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-6">
          <div className="flex-shrink-0">
            <CarPage />
          </div>

          {/* Desktop */}
          <div className=" hidden md:flex items-center space-x-8">
            <DesktopHeader categories={categories} />
            <UserActions />
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center">
            <MobileHeader categories={categories} />
          </div>
        </div>
      </div>

      {/* Navegação categorias - DESKTOP */}
      <nav className="hidden md:flex bg-white py-2 relative items-center justify-center">
        <ul className="flex items-center gap-4">
          <li className="relative group">
            <Link
              href="/produtos"
              className="flex items-center gap-1 text-gray-600 hover:text-rose-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Todos os Produtos
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </Link>

            <ul className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 absolute left-0 top-full mt-2 min-w-56 bg-white border border-gray-200 shadow-lg rounded-md p-2 z-50 max-h-96 overflow-auto">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <Link
              href="/accessories"
              className="text-gray-600 hover:text-rose-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Comprar pelo WhatsApp
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="text-gray-600 hover:text-rose-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Sobre Nós
            </Link>
          </li>
        </ul>
      </nav>

      {/* Navegação categorias - MOBILE */}
      <nav className="md:hidden bg-white border-t py-1 border-gray-100">
        <div className="relative">
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

          <div className="overflow-x-auto scrollbar-hide py-2 px-3">
            <ul className="flex space-x-1 min-w-max">
              <li>
                <Link
                  href="/produtos"
                  className={`inline-block whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 ${
                    pathname === "/produtos"
                      ? "bg-rose-50 text-rose-600 border border-rose-200"
                      : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  Todos
                </Link>
              </li>

         {categories.map((cat) => (
  <li key={cat.id}>
    <Link
      href={`/categoryproduct/${cat.slug}`}
      className={`inline-block whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 ${
        pathname === `/categoryproduct/${cat.slug}`
          ? "bg-rose-50 text-rose-600 border border-rose-200"
          : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
      }`}
    >
      {cat.name}
    </Link>
  </li>
))}


            
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </header>
  );
}
