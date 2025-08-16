"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon, User, Package, LogOut, FireExtinguisher, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const MobileHeader = () => {
  const { data: session } = authClient.useSession();

  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <MenuIcon className="w-6 h-6 text-gray-700" />
      </SheetTrigger>

      <SheetContent className="w-80 p-0 bg-white">
        <SheetTitle className="sr-only">Menu Mobile</SheetTitle>

        {/* Seção do usuário - Topo */}
        <div className="bg-gray-50 p-6 border-b border-gray-200">
          {/* Nome e Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="Foto do usuário"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-gray-500" />
              )}
            </div>

            <div className="text-lg font-medium text-gray-800">
              {session?.user ? `Olá, ${session.user.name}!` : "Olá, Bem-vindo!"}
            </div>
          </div>

          {/* Botões Minha Conta e Pedidos */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={session?.user ? "/minha-conta" : "/authentication"}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors shadow-sm"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">
                {session?.user ? "Conta" : "Login"}
              </span>
            </Link>
            <Link
              href={session?.user ? "/pedidos" : "/authentication"}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-lg transition-colors shadow-sm"
            >
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">Pedidos</span>
            </Link>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="p-6">
          {/* Categorias */}
          <nav className="space-y-1 mb-8">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 px-2">
              Categorias
            </div>

            <Link
              href="/vestidos"
              className="block text-gray-700 hover:text-pink-600 hover:bg-pink-50 font-medium py-3 px-3 rounded-lg transition-colors"
            >
              Vestidos
            </Link>
            <Link
              href="/blusas"
              className="block text-gray-700 hover:text-pink-600 hover:bg-pink-50 font-medium py-3 px-3 rounded-lg transition-colors"
            >
              Blusas & Tops
            </Link>
            <Link
              href="/calcas"
              className="block text-gray-700 hover:text-pink-600 hover:bg-pink-50 font-medium py-3 px-3 rounded-lg transition-colors"
            >
              Calças & Jeans
            </Link>
            <Link
              href="/acessorios"
              className="block text-gray-700 hover:text-pink-600 hover:bg-pink-50 font-medium py-3 px-3 rounded-lg transition-colors"
            >
              Acessórios
            </Link>
            <Link
              href="/ofertas"
              className="block text-white hover:text-pink-100 font-semibold py-3 px-3 rounded-lg bg-pink-500 hover:bg-pink-600 transition-colors shadow-sm"
            >
              Ofertas
              🔥
            </Link>
          </nav>

          {/* Botão Sair */}
          {session?.user && (
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => authClient.signOut()}
                className="flex items-center gap-3 w-full py-3 px-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;