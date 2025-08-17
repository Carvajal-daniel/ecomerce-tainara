
import { db } from "@/db";
import React from "react";
import ProductItem from "./product-item";

// Type definitions for better type safety
interface DatabaseProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  variations: Array<{
    id: string;
    price: number;
    color: string;
    image_url: string;
  }>;
}

const Products = async () => {
  try {
    const productItem = await db.query.productTable.findMany({
      with: {
        variations: true,
      },
    });

    // Early return for empty products with better styling
    if (!productItem.length) {
      return (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg mx-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum produto disponível
            </h3>
            <p className="text-gray-600 max-w-md">
              Não há produtos cadastrados no momento. Volte em breve para conferir nossas novidades!
            </p>
          </div>
        </div>
      );
    }

    // Transform data with better error handling
    const productsItems = productItem.map((p: DatabaseProduct) => ({
      id: p.id,
      name: p.name || 'Produto sem nome',
      description: p.description || 'Descrição não disponível',
      image: p.image || '/placeholder.jpg',
      slug: p.slug,
      variations: p.variations?.map(v => ({
        id: v.id,
        price: Number(v.price) || 0,
        color: v.color || 'default',
        imageUrl: v.image_url || p.image || '/placeholder.jpg'
      })) || []
    }));

    return (
      <div className="container mx-auto px-4 py-6">
        {/* Optional: Add a header */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Nossos Produtos
          </h1>
          <p className="text-gray-600">
            Descubra nossa seleção de produtos
          </p>
        </div>

        <ProductItem products={productsItems} />
      </div>
    );
  } catch (error) {
    
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-lg mx-2">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-200 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-red-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Erro ao carregar produtos
          </h3>
          <p className="text-red-700 max-w-md">
            Ocorreu um erro ao buscar os produtos. Tente recarregar a página.
          </p>
        </div>
      </div>
    );
  }
};

export default Products;