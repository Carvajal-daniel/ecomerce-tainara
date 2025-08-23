"use client";

import React from "react";
import Link from "next/link";

interface ProductOfferProps {
  productOffer: {
    id: string;
    is_offer: boolean;
    product: {
      id: string;
      name: string;
      description: string;
      image: string;
      slug: string;
      variations: {
        id: string;
        name: string;
        price: number; // em centavos
        image_url: string;
      }[];
    };
  }[];
}

const ProductOfferPage = ({ productOffer }: ProductOfferProps) => {
  return (
    <div className="container mx-auto  sm:px-4 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {productOffer.map((item) => {
          const variation = item.product.variations[0];
          const price = variation ? variation.price / 100 : null;
          const image = variation?.image_url || item.product.image;

          return (
            <Link
              href={`/produto/${item.product.slug}`}
              key={item.id}
              className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              {/* Badge de Oferta */}
              {item.is_offer && (
                <div className="absolute top-2 left-2 md:left-4 md:top-4 z-10">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-1 py-1.5 rounded-full shadow-lg animate-pulse">
                    🔥 OFERTA
                  </span>
                </div>
              )}

              {/* Container da Imagem */}
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={image}
                  alt={item.product.name}
                  className="w-full h-[15rem] lg:h-[22rem] object-cover  group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm lg:text-lg font-bold text-gray-600 transition-colors duration-200 line-clamp-1">
                  {item.product.name}
                </h3>

                {/* Preço */}
                {price && (
                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-md md:text-xl font-extrabold text-green-600">
                        R$ {price.toFixed(2)}
                      </span>
                      {item.is_offer && (
                        <span className="text-xs text-gray-500 line-through">
                          R$ {(price * 1.3).toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <div className="bg-blue-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Efeito de hover no border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent  transition-colors duration-300 pointer-events-none"></div>
            </Link>
          );
        })}
      </div>

      {/* Mensagem quando não há produtos */}
      {productOffer.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛍️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Nenhuma oferta disponível
          </h3>
          <p className="text-gray-500">
            Volte em breve para conferir nossas promoções!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductOfferPage;