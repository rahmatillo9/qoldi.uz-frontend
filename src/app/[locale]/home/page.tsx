



"use client";

import { useTranslations } from "next-intl";
import { useProducts } from "@/ui/hooks/use-product";
import ProductCard from "@/ui/components/products/product-card";
import { Button } from "@heroui/react";
import CategoriesPage from "@/ui/components/category/category";
import ProductCardSkeleton from "@/ui/components/skeletons/product-card-skeleton";;
import SearchBar from "@/ui/components/search/search-bar";


export default function ProductsPage() {
  const t = useTranslations("ProductsPage");
  const { products, loading, error, loadMore } = useProducts();

  return (
   
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="sticky top-12 z-30 bg-[#0d0d0d] pb-4">
  <SearchBar />
</div>
      <CategoriesPage />
      <h1 className="text-3xl font-extrabold  mb-8">{t("title")}</h1>
   

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 p-4 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-200">{error}</p>
        </div>
      )}

      {products.length === 0 && !loading && !error && (
        <div className="text-center text-gray-600 dark:text-gray-400">{t("noProducts")}</div>
      )}
{loading && products.length === 0 ? (
  // Skeleton loader faqat birinchi yuklashda
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
) : (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {products.map((product, index) => (
      <ProductCard key={`${product.id}-${index}`} product={product} />
    ))}
  </div>
)}


      {!loading && products.length > 0 && (
        <div className="mt-8 text-center">
          <Button
            className="bg-teal-600 dark:bg-teal-500 text-white hover:bg-teal-700 dark:hover:bg-teal-400"
            onClick={loadMore}
          >
            {t("loadMore")}
          </Button>
        </div>
      )}
    </div>
  );
}
