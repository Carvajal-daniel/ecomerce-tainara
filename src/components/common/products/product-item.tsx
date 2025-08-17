"use client";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ProductItemProps {
  products: {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
    variations?: {
      id: string;
      price: number; // valor em centavos
      color: string;
      imageUrl: string;
    }[];
  }[];
}

const ProductItem = ({ products }: ProductItemProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4 py-2">
          {products.map((product) => {
            const priceCents = product.variations?.[0]?.price || 0;
            const price = priceCents / 100; // converter de centavos para reais
            const priceFormatted = price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            });

            return (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 flex-shrink-0"
              >
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col">
                  <Link href={`/products/${product.slug}`}>
                    <div className="w-full aspect-square overflow-hidden rounded-lg">
                      <img
                        src={product.image || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="mt-2 font-semibold">{product.name}</h2>
                  </Link>
                  
                  <p className="text-lg font-bold mt-2">{priceFormatted}</p>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default ProductItem;
