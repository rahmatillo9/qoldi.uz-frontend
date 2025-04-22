// 'use client';
// import React from 'react';
// import {Button} from '@heroui/react';
// import confetti from 'canvas-confetti';
// import { useTranslations } from 'next-intl';


// const CustomButton = () => {
//   const buttonRef = React.useRef(null);

//   const t = useTranslations('button'); // Tarjimalar uchun
//   const handleConfetti = () => {
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { x: 0.5, y: 0.5 },
//     });
//   };

//   return (
//     <div>
//        {/* <Button
//       ref={buttonRef}
//       disableRipple
//       className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
//       size="lg"
//       onPress={handleConfetti}
//     >
//       {t('text')}
//       <span className="absolute inset-0 rounded-full bg-background/40 z-[-1] transition duration-500 hover:scale-150 hover:opacity-0" />
//     </Button> */}
//     </div>
//    );
// };

// export default CustomButton;




"use client";

import { useTranslations } from "next-intl";
import { useProducts } from "@/ui/hooks/use-product";
import ProductCard from "@/ui/components/products/product-card";
import { Button } from "@heroui/react";

export default function ProductsPage() {
  const t = useTranslations("ProductsPage");
  const { products, loading, error, loadMore } = useProducts();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold  mb-8">{t("title")}</h1>

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 p-4 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-200">{error}</p>
        </div>
      )}

      {products.length === 0 && !loading && !error && (
        <div className="text-center text-gray-600 dark:text-gray-400">{t("noProducts")}</div>
      )}

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {loading && (
        <div className="text-center mt-8">
          <span className="text-gray-600 dark:text-gray-400">{t("loading")}</span>
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
