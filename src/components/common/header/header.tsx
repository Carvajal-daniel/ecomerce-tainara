"use client";

import Link from "next/link";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  return (
    <header className="bg-white z-10 border-b border-gray-200 shadow-sm py-4 px-6">
      <div className="flex items-center justify-between max-w-[105rem] mx-auto">
        {/* Logo */}
        <Link href="/" className="group">
          <h2 className="text-2xl font-ligt text-gray-800 hover:opacity-80 transition-opacity">
            Tainara Moda
          </h2>
        </Link>

        {/* Desktop + Mobile */}
        <DesktopHeader />
        <MobileHeader />
      </div>
    </header>
  );
};

export default Header;
