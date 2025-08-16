
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  return (
    <header className="bg-white flex items-center justify-between lg:block z-10 border-b border-gray-200 shadow-sm py-1 lg:py-2 px-3">

        <DesktopHeader />
        <MobileHeader />
      
    </header>
  );
};

export default Header;
