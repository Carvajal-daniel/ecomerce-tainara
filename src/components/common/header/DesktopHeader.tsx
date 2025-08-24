"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const DesktopHeader = () => {
  return (
    <>

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
