"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const DesktopHeader = () => {
  return (
    <>
      {/* Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        <Link href="/produtos" className="text-gray-700 hover:text-gray-800 font-medium transition-colors">
          Produtos
        </Link>
        <Link href="/ofertas" className="text-gray-700 hover:text-gray-800 font-medium transition-colors">
          Ofertas
        </Link>
        <Link href="/sobre" className="text-gray-700 hover:text-gray-800 font-medium transition-colors">
          Sobre
        </Link>
      </nav>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <SearchBar />
      </div>

      {/* User */}
      <div className="hidden md:flex items-center space-x-4">
        <UserActions />
      </div>
    </>
  );
};

export default DesktopHeader;
