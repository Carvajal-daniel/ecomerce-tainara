"use client";

import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon, ShoppingBagIcon, UserIcon, LogInIcon, ChevronDown } from "lucide-react";

const UserActions = () => {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (session?.user) {
    return (
      <div className="relative flex items-center" ref={dropdownRef}>
        {/* Botão de abrir/fechar o dropdown */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-slate-900 hover:bg-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
        >
          {/* Avatar do usuário */}
          <Avatar className="w-8.5 h-8 border-2 border-slate-300">
            <AvatarImage
              src={session.user.image ?? undefined}
              alt={session.user.name ?? "Avatar do usuário"}
            />
            <AvatarFallback className="bg-rose-400 text-white font-bold text-sm">
              {session.user.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>

          {/* Nome e seta */}
          <span className="text-sm md:text-md font-medium max-w-[100px] truncate hidden sm:block">
            {session.user.name}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown - Animação de entrada e saída */}
        {open && (
          <div
            className="absolute top-full right-0 mt-2 w-56 p-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-fade-in"
          >
            <div className="flex flex-col gap-1">
              {/* Pedidos */}
              <Link
                href="/pedidos"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ShoppingBagIcon className="w-4 h-4 text-slate-500" />
                <span className="font-medium">Meus Pedidos</span>
              </Link>
              
              {/* Conta */}
              <Link
                href="/perfil"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <UserIcon className="w-4 h-4 text-slate-500" />
                <span className="font-medium">Minha Conta</span>
              </Link>

              {/* Linha separadora */}
              <div className="h-px w-full bg-slate-200 my-1" />

              {/* Sair */}
              <button
                onClick={() => authClient.signOut()}
                className="w-full flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOutIcon className="w-4 h-4" />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Usuário não logado
  return (
    <Link
      href="/authentication"
      className="flex items-center gap-2 bg-slate-100 text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors duration-200"
    >
      <LogInIcon className="w-4 h-4" />
      <span className="font-medium">Entrar</span>
    </Link>
  );
};

export default UserActions;