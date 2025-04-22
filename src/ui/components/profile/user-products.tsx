
'use client'

import { useTranslations } from "next-intl";
import ProductCard from "@/ui/components/products/product-card";
import { Product } from "@/ui/components/products/types";

interface UserProductsProps {
  products: Product[];
}

export default function UserProducts({ products }: UserProductsProps) {
  const t = useTranslations("ProfilePage");

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-100 mb-6">
        {t("userProducts")}
      </h2>
      {products.length === 0 ? (
        <p className="text-gray-400">{t("noProducts")}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
