"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import toast from 'react-hot-toast';

interface Variation {
  price: number;
  image_url: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  variations: Variation[];
}

interface Feature {
  id: string;
  product_id: string;
  is_offer?: boolean;
  offer?: number | null;
  order?: number | null;
  created_at?: Date | string;
  updated_at?: Date | string;
  starts_at?: Date | string | null;
  ends_at?: Date | string | null;
  is_new?: boolean;
  is_featured?: boolean;
}

interface Props {
  product: Product;
  feature?: Feature;
}

const ProductClient: React.FC<Props> = ({ product, feature }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [toastPosition, setToastPosition] = useState<'top-center' | 'bottom-center' | 'bottom-right'>('bottom-right');
  const { addItem } = useCart();

  const variation = product.variations[0];
  const offerPercent = Math.max(0, Math.min(100, feature?.offer ?? 0));
  const hasOffer = Boolean(feature?.is_offer) && offerPercent > 0;
  const originalPrice = variation.price / 100;
  const finalUnitPrice = hasOffer
    ? originalPrice * (1 - offerPercent / 100)
    : originalPrice;
  const total = finalUnitPrice * quantity;
  const savedPerUnit = hasOffer ? originalPrice - finalUnitPrice : 0;
  const savedTotal = savedPerUnit * quantity;
  const formatBRL = (n: number) =>
    n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
  const handleGoBack = () => window.history.back();

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: variation.price,
        image: variation.image_url,
        slug: product.slug,
      },
      quantity
    );
    toast.success(`${quantity} ${product.name} adicionado(s) ao carrinho!`, {
      position: toastPosition
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setToastPosition('top-center');
      } else {
        setToastPosition('bottom-right');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="container mx-auto px-4 py-6 md:py-10">
          
          {/* Botão de Voltar */}
          <div className="mb-6">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Imagem */}
            <div className="md:w-1/2">
              <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200">
                <img
                  src={variation.image_url}
                  alt={product.name}
                  className="w-full h-[420px] lg:h-[50rem] sm:h-[40rem] object-cover"
                />
                {hasOffer && (
                  <div className="absolute m-4">
                    <span className="inline-block bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow ">
                      Oferta -{offerPercent}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Detalhes */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <div>
                <h1 className="lg:text-3xl text-lg md:text-4xl font-semibold text-slate-900">{product.name}</h1>
                <p className="text-slate-600 mt-3 text-sm">{product.description}</p>
                {hasOffer && (
                  <span className="inline-block mt-3 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-medium border border-rose-200">
                    Oferta ativa (-{offerPercent}%)
                  </span>
                )}
              </div>

              {/* Preço */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                {hasOffer ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xl md:text-2xl font-bold text-slate-900">
                      R$ {formatBRL(finalUnitPrice)}
                    </span>
                    <span className="text-base line-through text-slate-400">
                      R$ {formatBRL(originalPrice)}
                    </span>
                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                      Economize {offerPercent}%
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-slate-900">
                    R$ {formatBRL(originalPrice)}
                  </span>
                )}
                <p className="text-sm text-slate-500 mt-2">
                  ou 6x de R$ {formatBRL(finalUnitPrice / 6)} sem juros
                </p>
              </div>

              {/* Quantidade */}
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-slate-300 bg-white">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2 hover:bg-slate-50 rounded-l-lg text-slate-700"
                  >
                    –
                  </button>
                  <span className="px-5 py-2 font-medium text-slate-900 min-w-[48px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-2 hover:bg-slate-50 rounded-r-lg text-slate-700"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-slate-500">Em estoque</span>
              </div>

              {/* Ações */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium text-white bg-slate-900 hover:bg-slate-800 transition">
                  <ShoppingCart className="w-5 h-5" />
                  {hasOffer ? "Aproveitar oferta" : "Adicionar ao carrinho"}
                </button>

                <button
                  onClick={() => setIsLiked(v => !v)}
                  className="px-4 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
                  title="Favoritar"
                >
                  <Heart className="w-5 h-5" />
                </button>

                <button
                  className="px-4 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
                  title="Compartilhar"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Total */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm">Total do pedido</p>
                    <p className="text-xl font-semibold text-slate-900">
                      R$ {formatBRL(total)}
                    </p>
                  </div>

                  {hasOffer && (
                    <div className="text-right">
                      <p className="text-slate-500 text-sm">Você economiza</p>
                      <p className="text-lg font-semibold text-emerald-700">
                        R$ {formatBRL(savedTotal)}
                      </p>
                    </div>
                  )}
                </div>
                {hasOffer && (
                  <p className="mt-3 text-center text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg py-2">
                    Desconto de {offerPercent}% aplicado automaticamente.
                  </p>
                )}
              </div>

              {/* Selos simples */}
              <div className="grid grid-cols-3 gap-3 mt-2">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-slate-700" />
                  </div>
                  <p className="text-xs text-slate-700 mt-1">Frete rápido</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-slate-700" />
                  </div>
                  <p className="text-xs text-slate-700 mt-1">Compra segura</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-slate-700" />
                  </div>
                  <p className="text-xs text-slate-700 mt-1">Devolução fácil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductClient;