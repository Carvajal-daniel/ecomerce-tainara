"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { CartItem } from "@/types";

interface Props {
  items: CartItem[];
  total: number;
}

const OrderSummary = ({ items, total }: Props) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Resumo do Pedido</h2>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="object-cover w-full h-full" />
                ) : (
                  <ShoppingBag className="w-8 h-8 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  R${(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-xl font-bold text-gray-700">
            <span>Total:</span>
            <span className="md:text-2xl text-[18px] text-slate-600">
              R${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
