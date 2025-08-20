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
  <div className="grid sm:grid-cols-1 lg:grid-cols-1 md:grid-cols-4 md:gap-4 p-1 mx-auto lg:max-w-7xl">

      {products?.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white  rounded-2xl md:p-2 p-1 flex flex-col items-center shadow-lg  hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/ overflow-hidden"
        >
          {/* Container da Imagem */}
          <Link
            href={`/produto/${product.slug}`}
              className="relative overflow-hidden rounded-lg w-full group/image "
          >
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              loading="lazy"
              className="w-full h-[32rem] sm:h-[26rem] md:h-[30rem] lg:h-[26rem] object-cover transition-transform duration-500 ease-out group-hover:scale-110 "
            />

            {/* Badges */}
           <div className="absolute top-4 left-4 flex flex-col gap-3 z-20">
              {product.is_new && (
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white text-xs font-bold px-2 py-[6px] rounded-full shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 backdrop-blur-sm border border-white/20">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    NOVO
                  </span>
                </div>
              )}
              {product.is_offer && (
                <div className="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300 backdrop-blur-sm border border-white/20">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    OFERTA
                  </span>
                </div>
              )}
            </div>

            {/* Ícone de favorito */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
              <div className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-125 transition-all duration-300 cursor-pointer border border-gray-200/50">
                <svg
                  className="w-5 h-5 text-gray-600 hover:text-rose-500 transition-colors duration-300"
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
            <p className="w-full text-sm md:text-base font-medium text-gray-800 text-center truncate transition-colors duration-300 group-hover:text-gray-900">
              {product.name}
            </p>

            {/* Botão */}
            <Link href={`/produto/${product.slug}`}>
              <button className="relative cursor-pointer bg-gray-700 overflow-hidden border text-white  hover:from-rose-500 hover:via-rose-600 hover:to-rose-700  font-semibold py-3 px-20 mb-3 rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl shadow-md text-sm min-w-[140px]">
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
