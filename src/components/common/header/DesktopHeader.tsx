"use client";

import SearchBar from "./SearchBar";

interface Product {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  products: Product[];
}

export default function DesktopHeader({ categories }: { categories: Category[] }) {
  // Passa todos os produtos para o SearchBar
  const products = categories.flatMap(cat => cat.products);

  return (
    <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
      <div className="max-w-md w-full">
        <SearchBar products={products} />
        
      </div>
    </div>
  );
}
