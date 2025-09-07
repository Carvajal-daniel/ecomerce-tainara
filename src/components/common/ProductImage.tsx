// Componente reutilizável para imagens de produtos
import React from 'react';
import Image from 'next/image';
import ProductBadges from './ProductBadges';

interface ProductImageProps {
  imageUrl: string;
  productName: string;
  hasOffer?: boolean;
  offerPercent?: number;
  isNew?: boolean;
  onClick?: () => void;
  className?: string;
  aspectRatio?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imageUrl,
  productName,
  hasOffer = false,
  offerPercent,
  isNew = false,
  onClick,
  className = '',
  aspectRatio = 'aspect-3/4'
}) => {
  return (
    <div className={`relative overflow-hidden rounded-lg ${aspectRatio} ${className}`}>
      <Image
        fill
        src={imageUrl || "/placeholder.jpg"}
        alt={productName}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onClick={onClick}
      />
      
      <ProductBadges 
        isNew={isNew}
        isOffer={hasOffer}
        offerPercent={offerPercent}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ProductImage;
