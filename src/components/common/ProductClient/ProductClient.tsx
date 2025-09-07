"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ImageModal from "./ImageModal";
import { Product, Feature } from "@/types";
import { useNavigation } from "@/utils/navigation";

interface Props {
  product: Product;
  feature?: Feature;
}

const ProductClient: React.FC<Props> = ({ product, feature }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { navigateBack } = useNavigation();

  const handleGoBack = () => navigateBack();

  const variation = product.variations[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar</span>
        </button>

        <div className="flex flex-col md:flex-row gap-10">
          <ProductImage
            imageUrl={variation.image_url}
            productName={product.name}
            hasOffer={Boolean(feature?.is_offer)}
            offerPercent={feature?.offer ?? 0}
            onClick={() => setIsModalOpen(true)}
          />
          <ProductDetails
            product={product}
            feature={feature}
            quantity={quantity}
            setQuantity={setQuantity}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
          />
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={variation.image_url}
        productName={product.name}
      />
    </div>
  );
};

export default ProductClient;
