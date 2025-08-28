
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
  <div className="text-center mb-4">
        {/* Title */}
        <div className="inline-flex items-center gap-3 md:mb-4 mt-4">
          <div className="w-1 h-10 bg-purple-500 rounded-full"></div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white tracking-tight">
              Lançamentos            
          </h1>
        </div>

        {/* Subtitle */}
        <div className="flex items-center justify-center gap-6 ">
          <div className="hidden md:block w-16 h-px bg-gray-200 dark:bg-gray-700"></div>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-light">
            Os melhores produtos para você
          </p>
          <div className="hidden md:block w-16 h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>

      
      </div>
      
);

const ProductsLancamentos = async () => {
  const productItems = await fetchNewProducts();

  if (productItems.length === 0) return null;

  return (
    <section className="bg-gray-50 md:py-8 pt-4">
      <SectionHeader />
      <div className="relative max-w-screen-2xl px-3 md:px-6 lg:px-8 mx-auto">
        <Carousel opts={{ align: "start" }} className="w-full">
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

          <CarouselPrevious className="md:flex text-black md:-left-16 -left-2 hover:bg-white border-gray-200 hover:border-purple-300 p-5 transition-all duration-200 hover:shadow-lg" />
          <CarouselNext className="md:flex text-black md:-right-16 -right-2 p-5 hover:bg-white border-gray-200 hover:border-purple-300 transition-all duration-200 hover:shadow-lg" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductsLancamentos;
