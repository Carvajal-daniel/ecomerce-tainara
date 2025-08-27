"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleClick = (id: string, slug: string) => {
    setLoadingCard(id);
    setTimeout(() => {
      router.push(`/produto/${slug}`);
    }, 0); 
  };

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-1 md:grid-cols-10 md:gap-4 p-1">
      {products?.map((product) => (
        <div
          key={product.id}
          onClick={() => handleClick(product.id, product.slug)}
          className="group relative lg:w-[22rem] bg-white rounded-2xl md:p-1 p-1 flex flex-col items-center hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 border border-gray-200 overflow-hidden cursor-pointer"
        >
          {/* Loader Overlay */}
          {loadingCard === product.id && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Imagem */}
          <div className="relative overflow-hidden rounded-lg w-full group/image">
            <Image
              width={400}
              height={400}
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full max-h-[32rem] h-full sm:h-[24rem] md:h-[30rem] lg:w-[40rem] lg:h-[30rem] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-3 z-20">
              {product.is_new && (
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white text-xs font-bold px-2 py-[6px] rounded-full shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 backdrop-blur-sm border border-white/20">
                  NOVO
                </div>
              )}
            </div>

            {/* Ícone de favorito */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
              <div className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-125 transition-all duration-300 cursor-pointer border border-gray-200/50">
                ❤️
              </div>
            </div>
          </div>

          {/* Conteúdo do Card */}
          <div className="flex flex-col items-center w-full mt-4 space-y-3 relative z-10">
            <p className="w-full text-sm md:text-base font-medium text-gray-800 text-center truncate transition-colors duration-300 group-hover:text-gray-900">
              {product.name}
            </p>

            <button className="relative cursor-pointer overflow-hidden border text-gray-900 hover:from-rose-500 hover:via-rose-600 hover:to-rose-700 py-3 px-20 mb-3 rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl shadow-md text-sm min-w-[140px]">
              Ver Produto
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItemDestaque;
