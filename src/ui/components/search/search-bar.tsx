"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Input, Button } from "@heroui/react"
import { useCategories } from "@/ui/hooks/use-categories"
import { Search, DollarSign, Tag } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: { title?: string; minPrice?: number; maxPrice?: number; categoryId?: number }) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const t = useTranslations("SearchPage")
  const { categories, error, isLoading } = useCategories()
  const [title, setTitle] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [categoryId, setCategoryId] = useState("")

  const handleSearch = () => {
    const query = {
      title: title.trim() || undefined,
      minPrice: minPrice ? Number.parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? Number.parseFloat(maxPrice) : undefined,
      categoryId: categoryId ? Number.parseInt(categoryId) : undefined,
    }
    onSearch(query)
  }

  return (
    <div className="p-3 rounded-xl border backdrop-blur-md bg-black/30 border-white/10 shadow-md">
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full pl-10 bg-white/10 border-white/20 "
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 /70 h-4 w-4" />
            <Input
              type="number"
              placeholder={t("minPricePlaceholder")}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 "
            />
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 /70 h-4 w-4" />
            <Input
              type="number"
              placeholder={t("maxPricePlaceholder")}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 "
            />
          </div>
        </div>

        <div className="relative">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2  h-4 w-4" />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full pl-10 py-2 rounded-md backdrop-blur-md bg-white/10 border border-white/20 "
            disabled={isLoading}
          >
            <option className="bg-black text-white" value="">{t("selectCategory")}</option>
            {categories?.map((category) => (
              <option className="bg-black text-white" key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-rose-400 text-xs">{error}</p>}

        <Button
          onClick={handleSearch}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 transition-colors"
        >
          {t("search")}
        </Button>
      </div>
    </div>
  )
}
