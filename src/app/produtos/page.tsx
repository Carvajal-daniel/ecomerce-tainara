import ProductsClient from '@/components/common/allProducts/ProductsClient'
import HeaderWrapper from '@/components/common/header/HeaderWrapper'
import PageWrapper from '@/components/PageWrapper'
import { db } from '@/db'
import React from 'react'

const AllProducts = async () => {
  // Buscar todos os produtos com categoria e variações
  const TodosOsProdutos = await db.query.productTable.findMany({
    with: {
      category: true,
      variations: true,
    },
  })

  // Buscar todas categorias do banco (mesmo as sem produtos)
  const TodasAsCategorias = await db.query.categoryTable.findMany()

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <HeaderWrapper />
        
        {/* Products Content */}
        <ProductsClient 
          products={TodosOsProdutos || []} 
          allCategories={TodasAsCategorias || []} 
        />
      </div>
    </PageWrapper>
  )
}

export default AllProducts
