"use client";

import { CreditCard, Smartphone, Lock, Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { CardData, UserAddress } from "./types";

interface Props {
  total: number;
  paymentMethod: "card" | "pix";
  setPaymentMethod: Dispatch<SetStateAction<"card" | "pix">>;
  cardData: CardData;
  setCardData: Dispatch<SetStateAction<CardData>>;
  isFormValid: boolean;
  UserAddress: UserAddress;
}

const PaymentMethods = ({
  total,
  paymentMethod,
  setPaymentMethod,
  cardData,
  setCardData,
  isFormValid,
  UserAddress,
}: Props) => {
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\D/g, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
    return parts.join(" ");
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) return v.substring(0, 2) + "/" + v.substring(2, 4);
    return v;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-800">Pagamento Seguro</h2>
        </div>

        <div className="text-sm text-gray-700 mb-4">
          <p>Endereço de Entrega:</p>
          <p>{`${UserAddress.rua}, ${UserAddress.numero} - ${UserAddress.bairro}, ${UserAddress.cidade} - ${UserAddress.uf}`}</p>
          <p>CEP: {UserAddress.cep}</p>
        </div>

        {/* Botões de método */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setPaymentMethod("card")}
            className={`p-4 rounded-xl border-2 transition-all ${paymentMethod === "card" ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
          >
            <CreditCard className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === "card" ? "text-blue-600" : "text-gray-500"}`} />
            <p className={`font-medium ${paymentMethod === "card" ? "text-blue-600" : "text-gray-700"}`}>Cartão de Crédito</p>
          </button>

          <button
            onClick={() => setPaymentMethod("pix")}
            className={`p-4 rounded-xl border-2 transition-all ${paymentMethod === "pix" ? "border-green-500 bg-green-50 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
          >
            <Smartphone className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === "pix" ? "text-green-600" : "text-gray-500"}`} />
            <p className={`font-medium ${paymentMethod === "pix" ? "text-green-600" : "text-gray-700"}`}>PIX</p>
          </button>
        </div>

        {/* Formulário do cartão */}
        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Número do Cartão</label>
              <input
                type="text"
                value={cardData.number}
                onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Validade</label>
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                  placeholder="MM/AA"
                  maxLength={5}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "") })}
                  placeholder="123"
                  maxLength={4}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome no Cartão</label>
              <input
                type="text"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                placeholder="NOME COMPLETO"
                className="w-full p-4 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>
        )}

        {/* PIX */}
        {paymentMethod === "pix" && (
          <div className="text-center space-y-4">
            <div className="w-48 h-48 mx-auto bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center">
              <div className="w-40 h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                <div className="text-white font-mono text-xs leading-none">QR CODE</div>
              </div>
            </div>
            <p className="text-gray-600">Escaneie o QR Code com seu app</p>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-2">Ou use a chave PIX:</p>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="font-mono text-sm text-blue-600 break-all">pix@loja.com.br</p>
              </div>
            </div>
          </div>
        )}

        {/* Botão Finalizar */}
        <button
          disabled={!isFormValid}
          className={`w-full mt-8 py-4 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
            isFormValid
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <Check className="w-6 h-6" />
            Finalizar Compra - R${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
