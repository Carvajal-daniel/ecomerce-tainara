import { db } from "@/db";
import ProductItemDestaque from "./product-item";
import { eq, is } from "drizzle-orm";
import { featuredTable } from "@/db/schema";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Componente que renderiza os lançamentos
const ProductsLancamentos = async () => {
  // Busca apenas produtos marcados como lançamento
  const products = await db.query.featuredTable.findMany({
    where: eq(featuredTable.is_new , true), // Filtra lançamentos
    with: {
      product: {
        with: {
          variations: true, 
        },
      },
    },
  });

  if (!products || products.length === 0) {
    return null; 
  }

  const productItems = products.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    image: item.product.image,
    slug: item.product.slug,
    is_offer: item.is_offer,
    is_new: item.is_new,
  }));

  return (
    <section className="relative py-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header da seção */}
        <div className="text-center mb-9">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-red-500"></div>
            <span className="text-red-600 font-medium text-sm uppercase tracking-wider">
              Lançamentos
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-red-500"></div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-2">
            Novidades para elas!
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto md:text-lg leading-relaxed">
            Encontre o estilo perfeito para você.
          </p>

          {/* Linha decorativa */}
          <div className="flex justify-center mt-5">
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
          </div>
        </div>

        {/* Carousel de produtos */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="">
            {productItems.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4  sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <ProductItemDestaque products={[product]} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-gradient-to-l from-rose-400 to-red-500 -left-8 text-white hover:bg-white border-gray-200 hover:border-red-300 p-5" />
          <CarouselNext className="hidden md:flex text-white -right-14 p-5 bg-gradient-to-r from-rose-400 to-red-500 hover:bg-white border-gray-200 hover:border-red-300" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductsLancamentos;