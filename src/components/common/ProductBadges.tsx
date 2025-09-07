// Componente reutilizável para badges de produtos
import React from 'react';

interface ProductBadgesProps {
  isNew?: boolean;
  isOffer?: boolean;
  offerPercent?: number;
  className?: string;
}

const ProductBadges: React.FC<ProductBadgesProps> = ({ 
  isNew = false, 
  isOffer = false, 
  offerPercent,
  className = '' 
}) => {
  if (!isNew && !isOffer) return null;

  return (
    <div className={`absolute top-3 left-3 flex gap-2 z-10 ${className}`}>
      {isNew && (
        <span className="bg-black text-white text-xs font-medium px-2 py-1 rounded-md">
          Novo
        </span>
      )}
      {isOffer && (
        <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md">
          {offerPercent ? `${offerPercent}% OFF` : 'Oferta'}
        </span>
      )}
    </div>
  );
};

export default ProductBadges;
