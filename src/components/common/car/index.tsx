"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingBasket } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CarPage() {
  const [isClient, setIsClient] = useState(false); // só renderiza após o hydration
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // evita mismatch SSR

  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:block">
        <button
          onClick={() => router.push('/cart')}
          className="p-2rounded-md transition-colors cursor-pointer "
        >
          <ShoppingBasket className="w-8 h-8 text-gray-100 hover:text-gray-200 hover:scale-105 transition-all duration-300 ease-in-out" />
        </button>
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2">
              <ShoppingBasket className="w-6 h-6 text-gray-100" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Carrinho de Compras</SheetTitle>
              <SheetDescription>Seus itens selecionados</SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <p>Carrinho vazio</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
