"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import { authClient } from "@/lib/auth-client";

const MobileHeader = () => {
  const { data: session } = authClient.useSession();

  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <MenuIcon className="w-6 h-6 text-gray-600" />
      </SheetTrigger>

      <SheetContent className="w-72 bg-white">
        <SheetHeader className="border-b border-gray-200 pb-4 mb-4">
          <SheetTitle className="text-xl font-medium text-gray-800">
            {session?.user ? "Olá, " + session.user.name : "Olá"}
          </SheetTitle>
        </SheetHeader>

        {/* Search */}
        <div className="mb-4">
          <SearchBar />
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-6">
          <Link href="/produtos" className="block text-gray-700 hover:text-gray-800 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">
            Produtos
          </Link>
          <Link href="/ofertas" className="block text-gray-700 hover:text-gray-800 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">
            Ofertas
          </Link>
          <Link href="/sobre" className="block text-gray-700 hover:text-gray-800 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">
            Sobre
          </Link>
        </nav>

        {/* User */}
        <UserActions mobile />
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;
