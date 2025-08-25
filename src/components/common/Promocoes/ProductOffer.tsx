"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProductOfferProps {
  productOffer: {
    id: string;
    is_offer: boolean;
    offer: number | null; // desconto em reais
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
    <div className="container mx-auto sm:px-4 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {productOffer.map((item) => {
          const variation = item.product.variations[0];
          const price = variation ? variation.price / 100 : null;
          const image = variation?.image_url || item.product.image;

          
          const discountedPrice =
            item.is_offer && item.offer && price
              ? price - item.offer
              : price;

          const discountPercentage =
            item.is_offer && item.offer && price
              ? Math.round((item.offer / price) * 100)
              : null;

          return (
            <Link
              href={`/produto/${item.product.slug}`}
              key={item.id}
              className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              {/* Badge de Oferta */}
              {item.is_offer && (
                <div className="absolute top-2 left-2 md:left-4 md:top-4 z-10">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[8px] md:text-xs font-bold px-2 py-1.5 rounded-full shadow-lg ">
                    🔥 {discountPercentage ? `${discountPercentage}% OFF` : "OFERTA"}
                  </span>
                </div>
              )}

              {/* Container da Imagem */}
              <div className="relative overflow-hidden bg-gray-50">
                <Image
                  src={image}
                  alt={item.product.name}
                  width={400}
                  height={400}
                  className="w-full h-[15rem] lg:h-[22rem] object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-4 space-y-2 flex flex-col items-center">
                <h3 className="text-sm lg:text-lg font-light text-gray-800 transition-colors duration-200 line-clamp-1">
                  {item.product.name}
                </h3>

           
              </div>

              {/* Efeito de hover no border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 pointer-events-none"></div>
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
