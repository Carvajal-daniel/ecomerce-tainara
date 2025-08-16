"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon, User, Package, LogOut } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const MobileHeader = () => {
  const { data: session } = authClient.useSession();

  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors">
        <MenuIcon className="w-6 h-6 " />
      </SheetTrigger>

      <SheetContent className="w-80 p-0 bg-white">
      
          <SheetTitle className="sr-only">Menu Mobile</SheetTitle>
    

        {/* Seção do usuário - Topo */}
        <div className="bg-pink-50 p-4 border-b border-pink-100">
          {/* Nome e Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-white border-2 border-pink-200 flex items-center justify-center flex-shrink-0">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="Foto do usuário"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-pink-500" />
              )}
            </div>

            <div className="text-md font-medium ">
              {session?.user ? "Olá,  " + session.user.name : "Olá, Bem vindo!"}
            </div>
          </div>

          {/* Botões Minha Conta e Pedidos */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={session?.user ? "/minha-conta" : "/login"}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-pink-50 shadow-md shadow-gray-300 rounded-lg transition-colors text-gray-800 border "
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">
                {session?.user ? "Conta" : "Fazer Login"}
              </span>
            </Link>
            <Link
              href={session?.user ? "/pedidos" : "/login"}
              className="flex items-center shadow-md shadow-gray-300 justify-center gap-2 py-2.5 px-3 bg-white hover:bg-pink-50 rounded-lg transition-colors border text-gray-800"
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
            <div className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-4 px-2">
              Categorias
            </div>

            <Link
              href="/vestidos"
              className="block text-gray-700 hover:text-pink-600 font-light py-3 px-3 rounded-lg hover:bg-pink-50 transition-colors"
            >
              Vestidos
            </Link>
            <Link
              href="/blusas"
              className="block text-gray-700 hover:text-pink-600 font-light py-3 px-3 rounded-lg hover:bg-pink-50 transition-colors"
            >
              Blusas & Tops
            </Link>
            <Link
              href="/calcas"
              className="block text-gray-700 hover:text-pink-600 font-light py-3 px-3 rounded-lg hover:bg-pink-50 transition-colors"
            >
              Calças & Jeans
            </Link>
            <Link
              href="/acessorios"
              className="block text-gray-700 hover:text-pink-600 font-light py-3 px-3 rounded-lg hover:bg-pink-50 transition-colors"
            >
              Acessórios
            </Link>
            <Link
              href="/ofertas"
              className="block text-pink-600 hover:text-pink-700 font-semibold py-3 px-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors"
            >
              Ofertas
            </Link>
          </nav>

          {/* Botão Sair */}
          <div className="border-t border-gray-200 pt-6">
            {session?.user && (
              <button
                onClick={() => authClient.signOut()}
                className="flex items-center gap-2 w-full py-2 px-3 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-light"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;