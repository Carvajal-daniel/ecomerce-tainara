"use client";
import Link from "next/link";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

interface CategoryItemProps {
  categories: {
    id: string;
    name: string;
    slug: string;
    image: string;
  }[];
}

const ProductItem = ({ categories }: CategoryItemProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-4">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4 py-2 ">
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="pl-2 md:pl-4 flex item-center  justify-center basis-1/3 md:basis-1/4 lg:basis-1/6 flex-shrink-0"
            >
              <div className="bg-white p-2 rounded-lg  hover:shadow-md transition flex flex-col">
                <Link href={`/categories/${category.slug}`}>
                  <div className="w-30 h-30 md:w-36 md:h-36 aspect-square overflow-hidden  rounded-lg">
                    <img
                      src={category.image || "/placeholder.jpg"}
                      alt={category.name}
                      className=" object-cover"
                    />
                  </div>
                  <h2 className="mt-1 md:mt-2 text-sm font-light text-center">{category.name}</h2>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default ProductItem;
