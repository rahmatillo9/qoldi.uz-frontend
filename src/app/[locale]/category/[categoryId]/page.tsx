
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import API from "@/lib/axios";
import ProductCard from "@/ui/components/products/product-card";
import { CategoryResponse, CategoryName } from "@/ui/components/category/type";
import BackButton from "@/ui/components/buttons/exit";
import SearchBar from "@/ui/components/search/search-bar";



export default function CategoryProductsPage() {
  const t = useTranslations("CategoryProductsPage");
  const locale = useLocale();
  const { categoryId } = useParams();
  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await API.get(`/category/${categoryId}`);
        setCategory(response.data);
      } catch (err) {
        console.error("Failed to fetch category products:", err);
        setError(t("error"));
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId, t]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">{t("loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">{t("noCategory")}</p>
      </div>
    );
  }

  const categoryName = category.name[locale as keyof CategoryName] || category.name.uz;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="sticky top-12 z-30 mb-2 bg-[#0d0d0d] pb-4">
        <SearchBar />
      </div>
      <div className="flex items-center justify-between mb-6">
        <BackButton />
      </div>
      <h1 className="text-3xl font-extrabold mb-8">
        {t("title", { categoryName })}
      </h1>

      {category.products.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          {t("noProducts")}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {category.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            // ProductCard loyihangizda favorite funksiyasi bo'lsa, fetchFavorites funksiyasini qo'shishingiz mumkin
            />
          ))}
        </div>
      )}
    </div>
  );
}
