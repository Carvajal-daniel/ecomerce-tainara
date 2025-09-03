"use client";

import React from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface Props {
  imageUrl: string;
  productName: string;
  hasOffer?: boolean;
  offerPercent?: number;
  onClick: () => void;
}

const ProductImage: React.FC<Props> = ({ imageUrl, productName, hasOffer, offerPercent = 0, onClick }) => {
  return (
    <div className="md:w-1/2">
      <div className="rounded-2xl overflow-hidden bg-[#fefefe] relative aspect-3/4 md:aspect-3/4 xl:aspect-[3/4.1] cursor-pointer group">
        <Image
          fill
          src={imageUrl}
          alt={productName}
          className="object-cover  transition-transform duration-300 group-hover:scale-105"
          onClick={onClick}
        />
        <div 
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center"
          onClick={onClick}
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 md:backdrop-blur-sm rounded-full p-3">
            <ZoomIn className="w-6 h-6 text-slate-700" />
          </div>
        </div>
        {hasOffer && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
              Oferta -{offerPercent}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
