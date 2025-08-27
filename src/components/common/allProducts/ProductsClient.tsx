'use client'

import React, { useState, useMemo } from 'react'
import FilterBar from './FilterBar'
import ProductCard from './ProductCard'
import EmptyState from './EmptyState'

interface ProductVariation {
  id: string
  image_url?: string
  price?: number
}

interface ProductCategory {
  id: string
  name: string
  slug: string
}

interface Product {
  id: string
  name: string
  slug: string
  category?: ProductCategory
  variations: ProductVariation[]
}

interface ProductsClientProps {
  products: Product[] // produtos existentes
  allCategories: ProductCategory[] // todas as categorias do banco
}

const ProductsClient: React.FC<ProductsClientProps> = ({ products, allCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Contar produtos por categoria
  const getCategoryCount = useMemo(() => {
    const counts: Record<string, number> = {}
    products.forEach(product => {
      if (product.category?.slug) {
        counts[product.category.slug] = (counts[product.category.slug] || 0) + 1
      }
    })
    return counts
  }, [products])

  // Filtrar produtos por categoria e busca
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory =
        selectedCategory === 'all' || product.category?.slug === selectedCategory
      const matchesSearch =
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, searchTerm])

  const handleCategoryChange = (category: string) => setSelectedCategory(category)
  const handleSearchChange = (search: string) => setSearchTerm(search)
  const resetFilters = () => {
    setSelectedCategory('all')
    setSearchTerm('')
  }

  if (!products || products.length === 0) {
    return <EmptyState type="no-products" />
  }

  return (
    <>
      {/* FilterBar com todas categorias do banco */}
      <FilterBar
        categories={allCategories.map(cat => ({
          ...cat,
          count: getCategoryCount[cat.slug] || 0 // se não tiver produtos, fica 0
        }))}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        totalProducts={products.length}
        filteredCount={filteredProducts.length}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length === 0
              ? 'Nenhum produto encontrado com os filtros aplicados'
              : `Mostrando ${filteredProducts.length} de ${products.length} produtos`}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <EmptyState type="no-results" onReset={resetFilters} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Estatísticas inferiores */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center justify-center space-x-2 text-gray-500">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span className="text-sm">
                {filteredProducts.length === products.length
                  ? `${products.length} produtos disponíveis`
                  : `${filteredProducts.length} de ${products.length} produtos`}
              </span>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductsClient
