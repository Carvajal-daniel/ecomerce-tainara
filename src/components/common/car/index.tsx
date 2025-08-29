"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasket } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  name: string;
  price: number;
}

export default function CarPage() {
  const [isClient, setIsClient] = useState(false); // só renderiza após o hydration
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // evita mismatch SSR

  // Produtos de exemplo
  const cartItems: CartItem[] = [
    { id: "1", name: "Tênis Esportivo", price: 199.9 },
    { id: "2", name: "Camiseta Casual", price: 49.9 },
    { id: "3", name: "Calça Jeans", price: 89.9 },
    { id: "4", name: "Boné", price: 29.9 },
    { id: "5", name: "Mochila", price: 129.9 },
    { id: "6", name: "Relógio", price: 249.9 },
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2">
            <ShoppingBasket className="w-6 h-6 text-gray-100" />
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
                <div key={item.id} className="flex justify-between items-center p-3 border-b">
                  <span>{item.name}</span>
                  <span>R$ {item.price.toFixed(2)}</span>
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
