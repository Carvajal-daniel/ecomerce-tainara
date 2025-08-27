"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  MenuIcon,
  User,
  Package,
  LogOut,
  ChevronDown,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

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

const MobileHeader = ({ categories }: HeaderProps) => {
  const { data: session } = authClient.useSession();
  const [openProductsMenu, setOpenProductsMenu] = useState(false);

  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-3 rounded-xl transition-all duration-300">
        <MenuIcon className="w-6 h-6 text-white drop-shadow-sm" />
      </SheetTrigger>

      <SheetContent className="w-80 p-0 bg-gray-50 border-l border-slate-200">
        <SheetTitle className="sr-only">Menu Mobile</SheetTitle>

        {/* User Section */}
        <div className="p-6 bg-gradient-to-br from-slate-100 to-gray-100 border-b border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="User photo"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-slate-600" />
                )}
              </div>
              {session?.user && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">
                {session?.user
                  ? `Olá, ${session.user.name?.split(" ")[0]}!`
                  : "Bem-vindo!"}
              </h3>
              {session?.user && (
                <p className="text-sm text-slate-600">Bom ter você aqui ✨</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href={session?.user ? "/minha-conta" : "/authentication"}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-gray-50 border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">
                {session?.user ? "Conta" : "Login"}
              </span>
            </Link>

            <Link
              href={session?.user ? "/pedidos" : "/authentication"}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-600 hover:bg-slate-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">Pedidos</span>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">
            <ShoppingBag className="w-4 h-4" />
            Categorias
          </div>

          <nav className="space-y-2">
            {/* All Products Dropdown */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center">
                <Link
                  href="/produtos"
                  className="flex-1 text-slate-700 hover:text-rose-500 font-medium py-3 px-4 rounded-l-lg transition-colors"
                >
                  Todos os Produtos
                </Link>
                <button
                  onClick={() => setOpenProductsMenu(!openProductsMenu)}
                  className="p-3 hover:bg-slate-50 rounded-r-lg transition-colors"
                >
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                      openProductsMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {openProductsMenu && (
                <div className="border-t border-slate-200 bg-slate-50 rounded-b-lg">
                  <ul className="p-2 space-y-1">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          href={`/category/${cat.slug}`}
                          className="block text-sm text-slate-600 hover:text-rose-500 hover:bg-white py-2 px-3 rounded transition-all duration-300"
                          onClick={() => setOpenProductsMenu(false)}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Other Links */}
            <Link
              href="/accessories"
              className="block text-slate-700 hover:text-rose-500 hover:bg-white py-3 px-4 rounded-lg transition-all duration-300"
            >
              Acessórios
            </Link>

            <Link
              href="/about"
              className="block text-slate-700 hover:text-rose-500 hover:bg-white py-3 px-4 rounded-lg transition-all duration-300"
            >
              Sobre Nós
            </Link>

            <Link
              href="/ofertas"
              className="flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" />
              Ofertas Especiais
              <span>🔥</span>
            </Link>
          </nav>

          {/* Logout Button */}
          {session?.user && (
            <div className="border-t border-slate-200 pt-6 mt-8">
              <button
                onClick={() => authClient.signOut()}
                className="flex items-center gap-3 w-full py-3 px-4 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-lg border border-slate-200 hover:border-red-200 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Sair da Conta</span>
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;