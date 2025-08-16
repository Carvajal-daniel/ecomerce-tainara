
import Link from "next/link";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const DesktopHeader = () => {

  return (
    <div >
      <div className=" max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                Tainara Moda
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6" aria-label="Main navigation">
            <Link
              href="/produtos"
              className="block text-gray-700 hover:text-gray-800 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Produtos
            </Link>
            <Link
              href="/ofertas"
              className="block text-gray-700 hover:text-gray-800 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Calçados
            </Link>
            <Link
              href="/sobre"
              className="block text-gray-700 hover:text-gray-800 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Acessórios
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar placeholder="Search products, categories..." />
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <UserActions />
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;