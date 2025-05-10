"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import API from "@/lib/axios"
import SearchBar from "./search-bar"
import ProductCard from "@/ui/components/products/product-card"
import type { Product } from "@/ui/components/category/type"

export default function SearchPage() {
  const t = useTranslations("Search")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query: { title?: string; minPrice?: number; maxPrice?: number; categoryId?: number }) => {
    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const params = new URLSearchParams()
      if (query.title) params.append("title", query.title)
      if (query.minPrice !== undefined) params.append("minPrice", query.minPrice.toString())
      if (query.maxPrice !== undefined) params.append("maxPrice", query.maxPrice.toString())
      if (query.categoryId !== undefined) params.append("categoryId", query.categoryId.toString())

      const response = await API.get(`/product/search?${params.toString()}`)
      setProducts(response.data || [])
    } catch (err) {
      console.error("Qidiruvda xatolik:", err)
      setError(t("searchError"))
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">{t("searchTitle")}</h1>
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && (
        <div className="text-center py-8">
          <p className="text-white">{t("loading")}</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-rose-400">{error}</p>
        </div>
      )}

      {!loading && !error && hasSearched && products.length === 0 && (
        <div className="text-center py-8">
          <p className="text-white">{t("noResults")}</p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
