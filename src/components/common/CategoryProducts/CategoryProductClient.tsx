// CategoryProductClient.tsx
"use client";

import React, { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";
import ProductCard from "../allProducts/ProductCard";
import { Product } from "@/types";

interface CategoryProductClientProps {
  categoryName: string;
  products: Product[];
}

export default function CategoryProductClient({
  categoryName,
  products,
}: CategoryProductClientProps) {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Nenhum produto encontrado para esta categoria.
        </h1>
        <p>Tente voltar à página inicial ou navegar por outras categorias.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
        Produtos em {categoryName}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
