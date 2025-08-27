"use client";

import Link from "next/link";
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
  return (
    <header className="bg-gradient-to-r  from-slate-800/90 via-purple-800/90 to-slate-800/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="py-4 px-4 lg:px-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-rose-400"
        >
          E-commerce
        </Link>

        <div className="flex items-center md:space-x-6 space-x-3 ">
          {/* Desktop */}
          <CarPage />
          <div className="hidden md:flex items-center space-x-4">
            <DesktopHeader categories={categories} />
            <UserActions />
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center">
            <MobileHeader />
          </div>
        </div>
      </div>

      {/* Navegação categorias */}
      <nav className="hidden bg-gray-100 py-2 relative md:flex items-center justify-center">
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
                    className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
              Acessórios
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
    </header>
  );
}
