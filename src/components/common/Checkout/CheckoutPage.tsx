"use client";

import { useState } from "react";
import { CartItem, CardData, UserAddress } from "@/types";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "./PaymentMethods";

interface Props {
  cartItems: CartItem[];
 UserAddress: {
    id: string;       // id é obrigatório
    cep: string | null;
    rua: string | null;
    bairro: string | null;
    cidade: string | null;
    uf: string | null;
    numero: string | null;
  };
}

const CheckoutPage = ({ cartItems, UserAddress }: Props) => {
  const itemsToShow = cartItems?.length ? cartItems : [];
  const total = itemsToShow.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("card");
  const [cardData, setCardData] = useState<CardData>({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const isFormValid = () => {
    if (paymentMethod === "card") {
      return (
        cardData.number.length === 19 &&
        cardData.expiry.length === 5 &&
        cardData.cvv.length >= 3 &&
        cardData.name.trim() !== ""
      );
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-[#fefefe] md:border-none border border-gray-100 rounded-2xl py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Finalizar Compra</h1>
          <p className="text-gray-600">Revise seus itens e complete o pagamento</p>
        </div>

        <div className="grid text:xs lg:grid-cols-2 gap-8">
          <OrderSummary items={itemsToShow} total={total} />
          <PaymentMethods
            total={total}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            cardData={cardData}
            setCardData={setCardData}
            isFormValid={isFormValid()}
            UserAddress={UserAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
