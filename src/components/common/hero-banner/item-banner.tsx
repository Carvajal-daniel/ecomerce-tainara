import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface Banner {
  id: string;
  name: string;
  imageUrlDesktop: string;
  imageUrlMobile: string;
  slug: string;
}

interface ItemBannerProps {
  banners: Banner[];
}

const ItemBanner = ({ banners }: ItemBannerProps) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <Link href={`/categoria/${banner.slug}`}>
              <picture>
                {/* Mobile */}
                <source
                  media="(max-width: 768px)"
                  srcSet={banner.imageUrlMobile}
                />
                {/* Desktop */}
                <Image
                  src={banner.imageUrlDesktop}
                  alt={`Banner da categoria ${banner.name}`}
                  width={1920}
                  height={600}
                  sizes="100vw"
                  className="lg:w-8xl mx-auto h-auto object-cover"
                />
              </picture>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ItemBanner;
