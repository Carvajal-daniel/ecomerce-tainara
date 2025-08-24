"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

interface CategoryItemProps {
  categories: {
    id: string;
    name: string;
    slug: string;
    image: string;
  }[];
}

const CategoryItem = ({ categories }: CategoryItemProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel opts={{ align: "start", loop: false }} setApi={setApi} className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4 py-2">
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="pl-2 md:pl-4 flex items-center justify-center basis-1/3 md:basis-1/4 lg:basis-1/6 sm:basis-1/4 flex-shrink-0"
            >
              <div className="bg-white p-2 rounded-lg hover:shadow-md transition flex flex-col">
                <Link href={`/categories/${category.slug}`}>
                  <div className="w-30 h-30 md:w-36 md:h-36 aspect-square overflow-hidden rounded-lg">
                    <Image
                      width={200}
                      height={200}
                      sizes="100vw"
                      src={category.image || "/placeholder.jpg"}
                      alt={category.name}
                      className="object-cover"
                    />
                  </div>
                  <h2 className="mt-1 md:mt-2 text-md font-medium text-center">
                    {category.name}
                  </h2>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      {/* Indicadores */}
      <div className="flex md:hidden justify-center space-x-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition ${index === current ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryItem;
