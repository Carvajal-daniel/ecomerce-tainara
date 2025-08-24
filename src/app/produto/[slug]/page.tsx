import Header from "@/components/common/header/header";
import ProductClient from "@/components/common/ProductClient";
import { db } from "@/db";
import { featuredTable, productTable } from "@/db/schema";
import { eq } from "drizzle-orm";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  // Espera o params antes de usar
  const { slug } = await params;

  const product = await db.query.productTable.findFirst({
    where: eq(productTable.slug, slug),
    with: {
      category: true,
      variations: true,
    },
  });

  if (!product) return <p>Product not found</p>;

  const feature = await db.query.featuredTable.findFirst({
    where: eq(featuredTable.product_id, product.id),
  });

  return (
    <>
      <Header />
      <main className="pt-1">
        <ProductClient product={product} feature={feature} />
      </main>
    </>
  );
};

export default ProductPage;
