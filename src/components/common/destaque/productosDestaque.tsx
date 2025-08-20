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

// Interface para tipagem dos dados do produto
interface ProductItem {
  id: string;
  name: string;
  image: string;
  slug: string;
  is_offer: boolean;
  is_new: boolean;
}

// Hook/função para buscar produtos lançamentos
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

    return products?.map((item): ProductItem => ({
      id: item.product.id,
      name: item.product.name,
      image: item.product.image,
      slug: item.product.slug,
      is_offer: item.is_offer,
      is_new: item.is_new,
    })) || [];
  } catch (error) {
    console.error("Erro ao buscar produtos lançamentos:", error);
    return [];
  }
}

// Componente para o cabeçalho da seção
const SectionHeader = () => (
  <div className="text-center mb-9">
    <div className="inline-flex items-center space-x-3 mb-4">
      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-red-500" />
      <span className="text-red-600 font-medium text-sm uppercase tracking-wider">
        Lançamentos
      </span>
      <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-red-500" />
    </div>

    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-2">
      Novidades para elas!
    </h1>

    <p className="text-gray-600 max-w-2xl mx-auto md:text-lg leading-relaxed">
      Encontre o estilo perfeito para você.
    </p>

    {/* Linha decorativa */}
    <div className="flex justify-center mt-5">
      <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
    </div>
  </div>
);

// Componente para o background decorativo
const DecorativeBackground = () => (
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
  </div>
);

// Componente principal
const ProductsLancamentos = async () => {
  const productItems = await fetchNewProducts();

  // Early return se não houver produtos
  if (productItems.length === 0) {
    return null;
  }

  return (
    <section className="relative py-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <DecorativeBackground />

      <div className="relative container mx-auto px-4">
        <SectionHeader />

        {/* Carousel de produtos */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-8xl mx-auto"
        >
          <CarouselContent className="md:mx-3 py-2">
            {productItems.map((product) => (
              <CarouselItem 
                key={product.id} 
                className="md:px-4 basis-1/1 md:basis-4/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pb-8"
              >
                <ProductItemDestaque products={[product]} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="md:flex text-black md:-left-8 -left-3 hover:bg-white border-gray-200 hover:border-red-300 p-5" />
          <CarouselNext className="md:flex text-black md:-right-8 -right-3 p-5 hover:bg-white border-gray-200 hover:border-red-300" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductsLancamentos;