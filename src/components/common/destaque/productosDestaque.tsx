
import { db } from "@/db";
import ProductItemDestaque from "./product-item";
import { eq } from "drizzle-orm";
import { featuredTable } from "@/db/schema";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

export const revalidate = 10;

interface ProductItem {
  id: string;
  name: string;
  image: string;
  slug: string;
  is_offer: boolean;
  is_new: boolean;
}

async function fetchNewProducts() {
  try {
    const products = await db.query.featuredTable.findMany({
      where: eq(featuredTable.is_new, true),
      with: {
        product: {
          with: {
            variations: true,
          },
        },
      },
    });

    return (
      products?.map((item): ProductItem => ({
        id: item.product.id,
        name: item.product.name,
        image: item.product.image,
        slug: item.product.slug,
        is_offer: item.is_offer,
        is_new: item.is_new,
      })) || []
    );
  } catch (error) {
    console.error("Erro ao buscar produtos lançamentos:", error);
    return [];
  }
}

const SectionHeader = () => (
  <div className="mb-10 mt-5">
    <div className="flex items-center justify-center gap-3 mb-2">
      <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Lançamentos
      </h1>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
        Novidades
      </span>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Novidades para elas! Encontre o estilo perfeito para você.
      </p>
    </div>
  </div>
);

const ProductsLancamentos = async () => {
  const productItems = await fetchNewProducts();

  if (productItems.length === 0) return null;

  return (
    <section className="bg-gray-50 py-8">
      <SectionHeader />
      <div className="relative max-w-screen-2xl px-4 md:px-6 lg:px-8 mx-auto">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="py-2">
            {productItems.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:px-4 basis-full sm:basis-1/2 md:basis-4/1 lg:basis-1/3 xl:basis-1/4 pb-8"
              >
                <ProductItemDestaque products={[product]} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="md:flex text-black md:-left-16 -left-3 hover:bg-white border-gray-200 hover:border-purple-300 p-5 transition-all duration-200 hover:shadow-lg" />
          <CarouselNext className="md:flex text-black md:-right-16 -right-3 p-5 hover:bg-white border-gray-200 hover:border-purple-300 transition-all duration-200 hover:shadow-lg" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductsLancamentos;
