'use client'

import React, { useState, useMemo, useEffect } from 'react'
import FilterBar from './FilterBar'
import ProductCard from './ProductCard'
import EmptyState from './EmptyState'
import { useLoading } from '@/context/LoadingContext'
import { Product, ProductCategory } from '@/types'

interface ProductsClientProps {
  products: Product[]
  allCategories: ProductCategory[]
}


const ProductsClient: React.FC<ProductsClientProps> = ({ products, allCategories }) => {
  const { setLoading } = useLoading()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Dados carregaram, pode desligar o loader
    setLoading(false)
  }, [setLoading])

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const product of products) {
      if (product.category?.slug) counts[product.category.slug] = (counts[product.category.slug] || 0) + 1
    }
    return counts
  }, [products])

  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase()
    return products.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category?.slug === selectedCategory
      const matchSearch = !search || p.name.toLowerCase().includes(search) || p.category?.name.toLowerCase().includes(search)
      return matchCategory && matchSearch
    })
  }, [products, selectedCategory, searchTerm])

  if (!products?.length) return <EmptyState type="no-products" />

  return (
    <div>
      <FilterBar
        categories={allCategories.map((cat) => ({ ...cat, count: categoryCount[cat.slug] || 0 }))}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchTerm}
        totalProducts={products.length}
        filteredCount={filteredProducts.length}
      />

      <div className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <EmptyState type="no-results" onReset={() => { setSelectedCategory('all'); setSearchTerm('') }} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(ProductsClient)
