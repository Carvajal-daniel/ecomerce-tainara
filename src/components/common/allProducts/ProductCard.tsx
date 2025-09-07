"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product, ProductCardProps } from "@/types";
import { formatPrice } from "@/utils/format";
import { useNavigation } from "@/utils/navigation";
import LoadingOverlay from "../LoadingOverlay";



const ProductCard: React.FC<ProductCardProps> = ({ product, showLoader = true }) => {
  const [loading, setLoading] = useState(false);
  const { navigateToProduct } = useNavigation();

  const handleClick = () => {
    if (showLoader) {
      setLoading(true);
    }
    navigateToProduct(product.slug);
  };
  

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
    >
      <LoadingOverlay isLoading={loading} />

      {/* Image */}
    <div className="relative overflow-hidden bg-gray-100 md:aspect-3/5 aspect-3/4 lg:aspect-[3/4.3]">
        <Image
          fill
          src={product.variations[0]?.image_url || "/placeholder.jpg"}
          alt={product.name}
          className="md:w-[25rem] h-[17rem] object-cover group-hover:scale-103 transition-transform duration-500"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

       
      </div>

      {/* Content */}
      <div className="flex flex-col p-2 items-center text-center">
        {/* Nome do produto */}
        <h3 className="text-gray-600 text-sm md:text-md mb-1 line-clamp-1 group-hover:text-rose-300 transition-colors duration-200">
          {product.name}
        </h3>

  
        {/* Preço */}
        <div className="flex items-center justify-center">
          <span className="md:text-xl font-medium text-gray-700">
            R$ {formatPrice(product.variations[0]?.price ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
