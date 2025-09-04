// CategoryProduct.tsx
import React from "react";
import HeaderWrapper from "../header/HeaderWrapper";
import { db } from "@/db";
import { categoryTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import CategoryProductClient from "./CategoryProductClient";

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

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <HeaderWrapper />
      </header>

      <CategoryProductClient
        categoryName={categoryWithProducts?.name ?? ""}
        products={categoryWithProducts?.products ?? []}
      />
    </>
  );
};

export default CategoryProduct;
