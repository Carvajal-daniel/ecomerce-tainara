"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon, ShoppingBagIcon, UserIcon, LogInIcon } from "lucide-react";

const UserActions = () => {
  const { data: session } = authClient.useSession();

  if (session?.user) {
    return (
      <div className="flex items-center  space-x-6">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-slate-700 bg-[#fefefe] h-9 w-30 hover:text-white hover:bg-slate-400 transition-all duration-500 ease-in-out"
        >
          <Link href="/pedidos" className="flex items-center gap-1">
            <ShoppingBagIcon className="w-4 h-4" />
            Pedidos
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-slate-700 bg-[#fefefefe] h-9 w-28 hover:text-white hover:bg-slate-700 transition-all duration-500 ease-in-out"
        >
          <Link href="/conta" className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            Conta
          </Link>
        </Button>

        <Avatar className="w-8 h-8 border-2 border-gray-200">
          <AvatarImage
            src={session.user.image ?? undefined}
            alt={session.user.name ?? "Avatar do usuário"}
          />
          <AvatarFallback className="bg-rose-400 text-white font-bold text-sm">
            {session.user.name?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>

        <span className="text-md text-white font-medium max-w-32 truncate">
          {session.user.name}
        </span>

        <Button
          onClick={() => authClient.signOut()}
          variant="outline"
          size="sm"
          className="text-gray-600 h-9 hover:text-gray-800 hover:bg-gray-50 border-gray-300"
        >
          <LogOutIcon className="w-4 h-4 mr-1" />
          Sair
        </Button>
      </div>
    );
  }

  // Usuário não logado
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="text-white bg-white text-gay-800 h-9 hover:bg-white"
    >
      <Link href="/authentication" className="flex items-center gap-1">
        <LogInIcon className="w-4 h-4" />
        Entrar
      </Link>
    </Button>
  );
};

export default UserActions;
