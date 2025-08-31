"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasket, Trash } from "lucide-react";
import Image from "next/image"; // Adicione esta importação
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CarPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { cartItems, removeItem } = useCart();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price / 100) * item.quantity,
    0
  );

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 relative">
            <ShoppingBasket className="w-6 h-6 text-gray-100" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </SheetTrigger>

        {/* Carrinho responsivo */}
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
            <SheetTitle>Carrinho de Compras</SheetTitle>
            <SheetDescription>Seus itens selecionados</SheetDescription>
          </SheetHeader>

          {/* Conteúdo do carrinho com scroll */}
          <div className="mt-4 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <ShoppingBasket className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Carrinho vazio</p>
                <p className="text-sm mt-2">Adicione produtos para começar</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border-b border-gray-200"
                >
                  {/* Imagem do produto */}
                  <div className="relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Nome e quantidade */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-sm font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Quantidade: {item.quantity}
                    </p>
                  </div>

                  {/* Preço e botão de remover */}
                  <div className="flex-shrink-0 text-right">
                    <span className="block text-sm font-semibold text-gray-900">
                      R$ {((item.price / 100) * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé do carrinho fixo */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 bg-white sticky bottom-0">
              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-black/90 hover:bg-rose-600 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Finalizar Compra - R$ {totalPrice.toFixed(2)}
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}