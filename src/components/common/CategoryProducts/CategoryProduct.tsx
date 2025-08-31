
import React from "react";
import HeaderWrapper from "../header/HeaderWrapper";
import { db } from "@/db";
import { categoryTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductCard from "../allProducts/ProductCard";
interface CategoryProductProps {
  slug: string;
}

const CategoryProduct = async ({ slug }: CategoryProductProps) => {
  const categoryWithProducts = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
    with: {
      products: {
        with: {
          variations: true,
          category: true, 
        },
      },
    },
  });

  if (
    !categoryWithProducts ||
    !categoryWithProducts.products ||
    categoryWithProducts.products.length === 0
  ) {
    return (
      <>
        <HeaderWrapper />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Nenhum produto encontrado para esta categoria.
          </h1>
          <p>Tente voltar à página inicial ou navegar por outras categorias.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <HeaderWrapper />
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          Produtos em {categoryWithProducts.name}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {categoryWithProducts.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;
