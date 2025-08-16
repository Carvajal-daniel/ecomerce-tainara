"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogInIcon, LogOutIcon } from "lucide-react";

interface UserActionsProps {
  mobile?: boolean;
}

const UserActions = ({ mobile }: UserActionsProps) => {
  const { data: session } = authClient.useSession();

  if (session?.user) {
    if (mobile) {
      return (
        <div className="bg-white p-4 rounded-lg space-y-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <Avatar className="w-14 h-14 border-2 border-gray-200">
              <AvatarImage
                src={session.user.image ?? undefined}
                alt={session.user.name ?? "Avatar do usuário"}
              />
              <AvatarFallback className="bg-gray-400 text-white font-bold text-lg">
                {session.user.name?.charAt(0).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-gray-800 font-medium truncate">{session.user.name}</p>
              <p className="text-gray-500 text-sm truncate">{session.user.email}</p>
            </div>
          </div>
          <Button
            onClick={() => authClient.signOut()}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors"
          >
            <LogOutIcon className="w-5 h-5 mr-2" />
            Sair
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-3">
        <Avatar className="w-8 h-8 border-2 border-gray-200">
          <AvatarImage
            src={session.user.image ?? undefined}
            alt={session.user.name ?? "Avatar do usuário"}
          />
          <AvatarFallback className="bg-rose-400 text-white font-bold text-sm">
            {session.user.name?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm text-gray-800 font-medium max-w-32 truncate">
          {session.user.name}
        </span>
        <Button
          onClick={() => authClient.signOut()}
          variant="outline"
          size="sm"
          className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-gray-300"
        >
          <LogOutIcon className="w-4 h-4 mr-1" />
          Sair
        </Button>
      </div>
    );
  }

  if (mobile) {
    return (
      <div className="bg-white p-4 mx-2 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-2">Olá! Faça seu login</h3>
        <p className="text-sm text-gray-500 mb-4">
          Acesse sua conta para uma experiência personalizada
        </p>
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors"
        >
          <Link href="/authentication" className="flex items-center justify-center gap-2">
            <LogInIcon className="w-5 h-5" />
            Entrar
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-gray-300"
    >
      <Link href="/authentication" className="flex items-center gap-2">
        <LogInIcon className="w-4 h-4" />
        Entrar
      </Link>
    </Button>
  );
};

export default UserActions;