
'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import API from "@/lib/axios";
import ImageCarousel from "@/ui/components/product/image-carusel";
import ProductInfo from "@/ui/components/product/product-info";
import { Product } from "@/ui/components/product/type";
import ProductsPage from "../../home/page";
import BackButton from "@/ui/components/buttons/exit";

const ProductMap = dynamic(() => import("@/ui/components/product/product-map"), {
  ssr: false,
});

export default function ProductDetailPage() {
  const t = useTranslations("ProductDetail");
  const params = useParams();
  const productId = Array.isArray(params?.productId) ? params.productId[0] : params?.productId;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUserId(parseInt(userId, 10));
    } else {
      setCurrentUserId(null);
    }
  }, []);

  useEffect(() => {
    if (!productId) {
      setError(t("productNotFound"));
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/product/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError(t("errorLoadingProduct"));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, t]);

  if (loading) return <div className="text-center py-10">{t("loading")}</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
           <div className="flex items-center justify-between mb-6">
            <BackButton/>
            </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ImageCarousel images={product.images} title={product.title} />
        <ProductInfo
          product={product}
          currentUserId={currentUserId || 0}
        />
      </div>
      <div className="mt-8">
        <ProductMap latitude={product.latitude} longitude={product.longitude} title={product.title} />
      </div>
      <div>
        <ProductsPage />
      </div>
    </div>
  );
}
