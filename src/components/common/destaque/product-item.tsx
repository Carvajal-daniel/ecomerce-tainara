"use client";

import Link from "next/link";

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
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 -mt-3 lg:w-7xl lg:mx-auto gap-6 p-1">
      {products?.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white rounded-2xl md:p-2 p-1 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100/50 overflow-hidden"
        >
          {/* Container da Imagem */}
          <Link
            href={`/produto/${product.slug}`}
            className="relative overflow-hidden rounded-xl w-full group/image"
          >
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-48 md:h-80 sm:h-72 object-cover transition-all duration-700 group-hover:scale-110 group/image:hover:brightness-110"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {product.is_offer && (
                <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white text-xs font-bold px-2 md:px-3 py-1.5 rounded-full shadow-md">
                  OFERTA
                </div>
              )}
              {product.is_new && (
                <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  NOVO
                </div>
              )}
            </div>

            {/* Ícone de favorito */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer">
                <svg
                  className="w-4 h-4 text-gray-600 hover:text-rose-500 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Conteúdo do Card */}
          <div className="flex flex-col items-center w-full mt-4 space-y-3 relative z-10">
            <h3 className="text-sm md:text-base font-medium text-gray-800 text-center line-clamp-2 transition-colors duration-300 group-hover:text-gray-900 leading-relaxed">
              {product.name}
            </h3>

            {/* Botão */}
            <Link href={`/produto/${product.slug}`}>
              <button className="relative cursor-pointer overflow-hidden bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 hover:from-rose-500 hover:via-rose-600 hover:to-rose-700 text-white font-semibold py-2 px-4 mb-1 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-xl shadow-md text-sm min-w-[140px]">
                Ver Produto
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItemDestaque;
