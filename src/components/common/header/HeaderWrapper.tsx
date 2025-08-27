
import { db } from "@/db";
import Header from "./header";

interface Product {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

export default async function HeaderWrapper() {
  const categoriesFromDb = await db.query.categoryTable.findMany({
    with: { products: true },
  });

  const categories: Category[] = categoriesFromDb.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    products: cat.products.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
    })),
  }));

  return (
    <div className=" w-full">
      <Header categories={categories} />
    </div>
  );
}
