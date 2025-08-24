"use client";

import Link from "next/link";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-10 border-b  border-gray-200 shadow-md py-3 md:py-5 px-3.5">
      <div className="flex items-center justify-between max-w-[100rem] mx-auto">
    
        <Link href="/" className="group">
          <h2 className="text-2xl font-light text-gray-800 hover:opacity-80 transition-opacity">
            E-commerce
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
