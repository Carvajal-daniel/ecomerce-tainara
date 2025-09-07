"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Check, ShoppingBag, ShoppingBasket, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";


const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function CartItem() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { cartItems, removeItem, addItem } = useCart();

  
 

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getToastPosition = () =>
    window.innerWidth < 768 ? "top-center" : "bottom-right";

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };


  return (
    <div>
      <Sheet>
        {/* Botão do carrinho */}
        <SheetTrigger asChild>
          <button className="p-2 relative cursor-pointer hover:bg-slate-800 h transition-colors duration-300 rounded-2xl shadow-md group">
            <ShoppingBasket className="md:w-7 md:h-7 h-5 w-5 text-[#fefefe] group-hover:text-slate-100 transition-colors duration-300" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold shadow">
                {cartItems.length}
              </span>
            )}
          </button>
        </SheetTrigger>

        {/* Conteúdo do carrinho */}
        <SheetContent
          side="right"
          className="
            w-[92vw]
            sm:!max-w-none
            sm:!w-[420px]
            md:!w-[560px]
            lg:!w-[680px]
            xl:!w-[760px]
            flex flex-col
          "
        >
          <SheetHeader>
            <SheetTitle className="text-lg font-bold text-slate-900">
              Carrinho de Compras
            </SheetTitle>
            <SheetDescription className="text-slate-500">
              Revise seus itens antes de finalizar
            </SheetDescription>
          </SheetHeader>

          {/* Lista de itens */}
          <div className="mt-4 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="font-medium">Seu carrinho está vazio</p>
                <p className="text-sm mt-1">
                  Explore nossos produtos e adicione algo incrível ✨
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200 mb-3 hover:shadow-md transition-shadow"
                >
                  {/* Imagem */}
                  <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Detalhes */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Quantidade: {item.quantity}
                    </p>
                  </div>

                  {/* Preço + remover */}
                  <div className="flex-shrink-0 text-right">
                    <span className="block text-sm font-bold text-slate-900">
                      R$ {formatBRL(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="mt-2 flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remover
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé fixo */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 bg-white sticky bottom-0 shadow-inner">
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white py-3 rounded-lg font-semibold text-sm shadow-md transition-colors"
              >
                Finalizar Compra • R$ {formatBRL(totalPrice)}
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
