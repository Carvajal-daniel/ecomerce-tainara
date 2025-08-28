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
  router.push(`/produto/${slug}`);
};

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-1 md:grid-cols-10 md:gap-6 p-4">
      {products?.map((product) => (
        <div
          key={product.id}
          onClick={() => handleClick(product.id, product.slug)}
          className="group relative lg:w-[22rem] bg-white rounded-xl p-2 flex flex-col transition-all duration-300 hover:shadow-xl cursor-pointer border border-gray-100 hover:border-gray-200"
        >
          {/* Loader Overlay */}
          {loadingCard === product.id && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20 rounded-xl">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Imagem */}
          <div className="relative overflow-hidden rounded-lg w-full mb-4">
            <Image
              width={400}
              height={400}
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full max-h-[27rem] h-full sm:h-[24rem] md:h-[30rem] lg:w-[40rem] lg:h-[30rem] object-cover transition-transform duration-300 group-hover:scale-105"
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

            <button className="mt-auto cursor-pointer bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-sm">
              Ver Produto
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItemDestaque;