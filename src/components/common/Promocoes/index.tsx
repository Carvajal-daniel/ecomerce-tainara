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


    <section className="my-12 max-w-[93rem] mx-auto px-4 lg:px-6">
      <div className="mb-8 ">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Promoções
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            Ofertas Especiais
          </span>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Aproveite os melhores descontos
          </p>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0  rounded-2xl opacity-50 pointer-events-none"></div>
        <ProductOfferPage productOffer={productsOffer}  />
      </div>
    </section>

  );
};

export default ProductsPromocoes;