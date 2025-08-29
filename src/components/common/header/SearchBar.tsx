"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
}

interface SearchBarProps {
  products: Product[];
}

export default function SearchBar({ products }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (slug: string) => {
    setQuery("");
    router.push(`/produto/${slug}`);
  };

  return (
    <div className="relative ">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquisar produtos..."
        className="w-full  bg-white pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-0 focus:border-gray-300 !ring-0 !border-gray-300"
      />

      <button
        type="button"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      {query && (
        <ul className="absolute w-full bg-white border border-gray-200 mt-1 rounded-md max-h-60 overflow-auto z-50">
          {filtered.map((p) => (
            <li
              key={p.id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(p.slug)}
            >
              {p.name}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-gray-400">
              Nenhum produto encontrado
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
