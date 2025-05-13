'use client'

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import API from "@/lib/axios";
import SearchBar from "@/ui/components/search/search-bar";
import ProductCard from "@/ui/components/products/product-card";
import type { Product } from "@/ui/components/category/type";
import ProductCardSkeleton from "@/ui/components/skeletons/product-card-skeleton";
import { toast } from "sonner";

export default function SearchPage() {
  const t = useTranslations("Search");
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title = searchParams.get("title") || "";

  const fetchSearchResults = async (title: string) => {
    if (!title) return;

    setLoading(true);
    setError(null);
    setProducts([]);

    try {
      const response = await API.get(`/product/search?title=${encodeURIComponent(title)}`);
      setProducts(response.data || []);
    } catch (err) {
      toast.error(t("searchError"));
      console.error("Qidiruvda xatolik:", err);
      setError(t("searchError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults(title);
  }, [title]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <SearchBar defaultValue={title} />
      </div>

      {loading && (
    // Skeleton loader faqat birinchi yuklashda
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-rose-400">{error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && title && (
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
  );
}
