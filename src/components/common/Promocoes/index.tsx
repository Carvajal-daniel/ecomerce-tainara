import { db } from "@/db";
import { featuredTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductOfferPage from "./ProductOffer";

const ProductsPromocoes = async () => {
  const productsOffer = await db.query.featuredTable.findMany({
    where: eq(featuredTable.is_offer, true),
    with: {
      product: {
        with: {
          variations: true,
        },
      },
    },
  });

  if (productsOffer.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 md:mt-16 max-w-[93rem] mx-auto px-4 lg:px-6">
      {/* Header Section */}
      <div className="text-center mb-2 md:mb-4">
        {/* Title */}
        <div className="inline-flex items-center gap-3 md:mb-4">
          <div className="w-1 h-10 bg-red-500 rounded-full"></div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white tracking-tight">
            Promoções
          </h1>
        </div>

        {/* Subtitle */}
        <div className="flex items-center justify-center gap-6 md:mb-6 mb-3">
          <div className="hidden md:block w-16 h-px bg-gray-200 dark:bg-gray-700"></div>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-light">
            Descontos imperdíveis por tempo limitado
          </p>
          <div className="hidden md:block w-16 h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-full">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-600 dark:text-red-400 text-sm font-medium">
            Ofertas Ativas
          </span>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="relative">
        <ProductOfferPage productOffer={productsOffer} />
      </div>
    </section>
  );
};

export default ProductsPromocoes;