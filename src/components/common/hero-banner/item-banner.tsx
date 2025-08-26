"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Autoplay
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  // Swipe mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextBanner();
    else if (distance < -50) prevBanner();
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 mt-1 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
        <Link
  key={banner.id}
  href={`/categoria/${banner.slug}`}
  className="flex-shrink-0 w-full"
>
  {/* Mobile */}
  <Image
    src={banner.imageUrlMobile}
    alt={banner.name}
    width={768}
    height={400}
    sizes="100vw"
    priority={currentIndex === 0}
    className="w-full h-auto object-cover  lg:hidden"
  />

  {/* Desktop */}
  <Image
    src={banner.imageUrlDesktop}
    alt={banner.name}
    width={1920}
    height={600}
    sizes="100vw"
    priority={currentIndex === 0}
    className="w-full h-auto object-cover  hidden lg:block"
  />
</Link>

        ))}
      </div>

      {/* Setas desktop */}
      <button
        onClick={prevBanner}
        className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextBanner}
        className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ItemBanner;
