"use client";

import Image from "next/image";
import { useState } from "react";
import { useNavigation } from "@/utils/navigation";
import LoadingOverlay from "../LoadingOverlay";

interface ProductItemProps {
  products: {
    id: string;
    name: string;
    image: string;
    slug: string;
    is_offer: boolean;
    is_new: boolean;
  }[];
}

const ProductItemDestaque = ({ products }: ProductItemProps) => {
  const [loadingCard, setLoadingCard] = useState<string | null>(null);
  const { navigateToProduct } = useNavigation();

  const handleClick = (id: string, slug: string) => {
    setLoadingCard(id);
    navigateToProduct(slug);
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-4 md:gap-6 p-2">
      {products?.map((product) => (
        <div
          key={product.id}
          onClick={() => handleClick(product.id, product.slug)}
          className="group relative lg:w-[22rem] bg-white rounded-xl p-2 flex flex-col transition-all duration-300 hover:shadow-xl cursor-pointer border border-gray-100 hover:border-gray-200"
        >
          <LoadingOverlay 
            isLoading={loadingCard === product.id} 
            className="rounded-xl"
          />

          {/* Imagem */}
          <div className="relative overflow-hidden rounded-lg w-full mb-4 aspect-3/4">
            <Image
              fill
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Badges */}
            {(product.is_new || product.is_offer) && (
              <div className="absolute top-3 left-3 flex gap-2">
                {product.is_new && (
                  <span className="bg-black text-white text-xs font-medium px-2 py-1 rounded-md">
                    Novo
                  </span>
                )}
                {product.is_offer && (
                  <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md">
                    Oferta
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Conteúdo */}
          <div className="flex flex-col flex-1">
            <h3 className="text-gray-900 font-medium text-center text-base mb-4 line-clamp-2 leading-relaxed">
              {product.name}
            </h3>

            <button className="mt-auto cursor-pointer bg-slate-800 hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors duration-200 text-sm">
              Ver Produto
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItemDestaque;