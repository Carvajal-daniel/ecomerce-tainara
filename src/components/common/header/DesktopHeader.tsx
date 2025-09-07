"use client";

import SearchBar from "./SearchBar";
import { Category } from "@/types";

export default function DesktopHeader({ categories }: { categories: Category[] }) {

  const products = categories.flatMap(cat => cat.products || []);

  return (
    <div className="hidden md:flex flex-1 items-center justify-end space-x-4 ">
      <div className="max-w-md w-full">
        <SearchBar products={products} />
        
      </div>
    </div>
  );
}
