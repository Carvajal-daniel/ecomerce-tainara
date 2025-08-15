"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const Header = () => {
  const { data: session } = authClient.useSession();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="group">
          <h2 className="text-2xl font-bold text-gray-800 hover:opacity-80 transition-opacity">
            Tainara Moda
          </h2>
        </Link>

        {/* Menu lateral */}
        <Sheet>
          <SheetTrigger className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <MenuIcon className="w-6 h-6 text-gray-800" />
          </SheetTrigger>

          <SheetContent className="w-72 bg-white">
            <SheetHeader className="border-b border-gray-200 pb-4 mb-4">
              <SheetTitle className="text-xl font-semibold text-gray-800">
                {session?.user ? "Olá, " + session.user.name : "Olá"}
              </SheetTitle>
            </SheetHeader>

            {session?.user ? (
              <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-14 h-14 border-2 border-gray-200">
                    <AvatarImage
                      src={session.user.image ?? undefined}
                      alt={session.user.name ?? undefined}
                      className="rounded-full"
                    />
                    <AvatarFallback className="bg-gray-400 text-white font-bold flex items-center justify-center rounded-full w-14 h-14">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-gray-800 font-medium">
                      {session.user.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => authClient.signOut()}
                  className="w-full bg-primary hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  <LogOutIcon className="w-5 h-5 mr-2 inline" />
                  Sair
                </Button>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Olá! Faça seu login
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Acesse sua conta para uma experiência personalizada
                </p>
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  <Link
                    href="/authentication"
                    className="flex items-center justify-center gap-2"
                  >
                    <LogInIcon className="w-5 h-5" />
                    Entrar
                  </Link>
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
