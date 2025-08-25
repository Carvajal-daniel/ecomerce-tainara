

import Link from "next/link";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = async () => {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
            <div className="py-4 px-4 lg:px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="group">
            <h1 className="md:text-3xl text-2xl text-gray-700 hover:text-rose-400 transition-colors duration-200">
              E-commerce
            </h1>
          </Link>

          <div className="flex items-center space-x-4">
            <DesktopHeader />
            <MobileHeader />
          </div>
        </div>
      </div>

     
    </header>
  );
};

export default Header;
