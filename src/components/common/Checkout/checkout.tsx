"use client";

import { useCart } from "@/context/CartContext";
import CheckoutPage from "@/components/common/Checkout/CheckoutPage";
import { UserAddress } from "./types"; // tipo do endereço do usuário

interface Props {
  UserAddress: UserAddress;
}

const CheckoutItems = ({ UserAddress }: Props) => {
  const { cartItems } = useCart();

  return <CheckoutPage cartItems={cartItems} UserAddress={UserAddress} />;
};

export default CheckoutItems;
