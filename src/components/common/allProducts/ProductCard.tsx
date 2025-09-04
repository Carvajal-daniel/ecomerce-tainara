"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductVariation {
  id: string;
  image_url?: string;
  price?: number;
}

interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category?: ProductCategory;
  variations: ProductVariation[];
}

interface ProductCardProps {
  product: Product;
}



const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleGoBack = () => {
  router.back();
};

  const handleClick = () => {
    setLoading(true);
    router.push(`/produto/${product.slug}`);
  };
  

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
    >
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

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
