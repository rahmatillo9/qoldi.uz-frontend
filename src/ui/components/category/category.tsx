
"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCategories } from "@/ui/hooks/use-categories";
import CategoriesSkeleton from "../skeletons/categories-skeleton";

// Kategoriyalar uchun rasmlar (placeholder)
const categoryImages: { [key: number]: string } = {
  1: "/images/category/texnika.webp", // Texnika
  2: "/images/category/kochmasM.webp", // Ko‘chmas mulk
  3: "/images/category/transport.webp", // Transport
  4: "/images/category/kiyim.webp", // Kiyim-kechak va aksessuarlar
  5: "/images/category/uyUchun.webp", // Uy uchun tovarlar
  6: "/images/category/qurilish.webp", // Qurilish va ta’mirlash
  7: "/images/category/ishVa.webp", // Ish va xizmatlar
  8: "/images/category/bolalarU.webp", // Bolalar uchun
  9: "/images/category/hayvonlar.webp", // Hayvonlar
  10: "/images/category/kurslar.webp", // Ta'lim va kurslar
  11: "/images/category/hobbi.webp", // O‘yin va hobbi
  12: "/images/category/tadbirlar.webp", // Tadbirlar va xizmatlar
};

export default function CategoriesPage() {
  const t = useTranslations("CategoriesPage");
  const router = useRouter();
  const { categories, error, isLoading } = useCategories();

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/category/${categoryId}`);
  };

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">{t("noCategories")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold mb-8">{t("title")}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCategoryClick(category.id)}
          >
            <img
              src={categoryImages[category.id] || "https://picsum.photos/300/200?random=0"}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}