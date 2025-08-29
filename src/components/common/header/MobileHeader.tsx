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
      <SheetTrigger className="md:hidden p-2 rounded-full hover:bg-white/20 transition-all duration-300 ">
        <MenuIcon className="w-6 h-6 text-white drop-shadow-lg" />
      </SheetTrigger>

      <SheetContent className="w-full max-w-xs p-0 border-none shadow-2xl backdrop-blur-xl">
        <SheetTitle className="sr-only">Menu Mobile</SheetTitle>

        {/* User Section */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center overflow-hidden shadow-md">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="User photo"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-slate-600" />
                )}
              </div>
              {session?.user && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white shadow-md"></div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-base text-slate-800">
                {session?.user
                  ? `${session.user.name?.split(" ")[0]} ✨`
                  : "Bem-vindo!"}
              </h2>
              <p className="text-slate-500 text-xs">
                {session?.user ? "Pronto para comprar?" : "Faça login para continuar"}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href={session?.user ? "/minha-conta" : "/authentication"}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-slate-200 text-slate-700 text-sm hover:border-rose-300 hover:text-rose-600 transition-all duration-300 hover:shadow-md"
            >
              <User className="w-4 h-4" />
              <span>{session?.user ? "Perfil" : "Entrar"}</span>
            </Link>

            <Link
              href={session?.user ? "/pedidos" : "/authentication"}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-slate-800 hover:border-slate-900"
              style={{
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              }}
            >
              <Package className="w-4 h-4" />
              <span>Pedidos</span>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5 text-slate-600" />
            </div>
            <span className="font-bold text-slate-700 text-sm">Explorar</span>
          </div>

          <nav className="space-y-3">
            {/* Categories Dropdown */}
            <div className="rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-all duration-300">
              <button
                onClick={() => setOpenProductsMenu(!openProductsMenu)}
                className="w-full flex items-center justify-between px-3 py-3 hover:bg-slate-50 transition-all duration-300 text-sm font-medium"
              >
                <span className="text-slate-700">Categorias</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-all duration-300 ${
                    openProductsMenu ? "rotate-180 text-rose-500" : ""
                  }`}
                />
              </button>

              {openProductsMenu && (
                <div className="border-t border-slate-100">
                  <div className="p-2 space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className="block text-slate-600 hover:text-rose-500 py-2 px-3 rounded-lg hover:bg-slate-50 transition-all duration-300 text-sm"
                        onClick={() => setOpenProductsMenu(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Menu Items */}
            <Link
              href="/accessories"
              className="flex items-center gap-2 px-3 py-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all duration-300 text-sm"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              <span className="font-medium text-slate-700">Compre pelo WhatsApp</span>
            </Link>

            <Link
              href="/about"
              className="flex items-center gap-2 px-3 py-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all duration-300 text-sm"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
              <span className="font-medium text-slate-700">Sobre Nós</span>
            </Link>

            <Link
              href="/ofertas"
              className="relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #ec4899 0%, #f97316 50%, #eab308 100%)",
                backgroundSize: "200% 200%",
                animation: "gradient 3s ease infinite",
              }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span className="relative z-10">Ofertas</span>
              <span className="text-lg animate-bounce">🔥</span>
            </Link>
          </nav>

          {/* Logout Button */}
          {session?.user && (
            <div className="pt-3 mt-4 border-t border-slate-100">
              <button
                onClick={() => authClient.signOut()}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-red-500 hover:text-red-600 border border-red-200 hover:border-red-300 rounded-xl hover:bg-red-50 transition-all duration-300 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;
