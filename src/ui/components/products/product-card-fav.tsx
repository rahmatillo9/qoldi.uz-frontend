
'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ImageCarousel from "./image-carousel";
import {  Circle, Heart } from "lucide-react";
import Avatar from "../avatar";
import Link from "next/link";
import API from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/ui/components/add-product/types";
import { Button } from "@heroui/react";
import { Favorite } from "@/ui/components/products/types";
import ProductCardSkeleton from "../skeletons/product.fev-skeleton";

interface ExtendedProductCardProps {
  favorite: Favorite;
  fetchFavorites?: () => void;
}

export default function ProductCard({ favorite, fetchFavorites }: ExtendedProductCardProps) {
  const t = useTranslations("ProductsPage");
  // const [location, setLocation] = useState<Location>({ city: "Noma'lum", district: "Noma'lum" });
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // JWT token orqali userId ni olish
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setCurrentUserId(decoded.id);
      } catch (err) {
        console.error("Token dekod qilishda xato:", err);
      }
    }
  }, []);

  // // Lokatsiyani olish
  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       setLoading(true);
  //       // const result = await getLocationFromCoords(favorite.product.latitude, favorite.product.longitude);
  //       // setLocation(result);
  //     } catch (err) {
  //       setError("Manzilni aniqlashda xatolik :(");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchLocation();
  // }, [favorite.product.latitude, favorite.product.longitude]);

  // Favorite holatini toggle qilish
  const handleToggleFavorite = async () => {
    if (!currentUserId) {
      console.error("Foydalanuvchi tizimga kirmagan!");
      return;
    }

    try {
      const response = await API.post("/favorites/toggle", {
        productId: favorite.product.id,
        userId: currentUserId,
      });

      const { status } = response.data;
      if (status === "removed" && fetchFavorites) {
        fetchFavorites(); // Favoritdan olib tashlanganda ro'yxatni yangilash
      }
    } catch (err) {
      console.error("Favorite toggle qilishda xato:", err);
    }
  };

  // Descriptionni qisqartirish
  const shortDescription = favorite.product.description.length > 50
    ? favorite.product.description.substring(0, 50) + "..."
    : favorite.product.description;

  if (loading) return <ProductCardSkeleton />;

  return (
    <div className="backdrop-blur-md bg-black/30 border-b hover:scale-102 border-white/10 shadow-mdrounded-lg shadow-md overflow-hidden transition-transform transform rounded-xl hover:shadow-lg">
      <ImageCarousel images={favorite.product.images} />
      <div className="p-3 sm:p-4 relative">
        <Link href={`/product/${favorite.product.id}`} className="block">
          <div className="flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-semibold truncate">{favorite.product.title}</h3>
            <div className="flex items-center">
              <Circle
                size={14}
                className={
                  favorite.product.status === "available"
                    ? "text-green-500 mr-1"
                    : "text-red-500 mr-1"
                }
              />
              <span className="text-xs sm:text-sm">
                {favorite.product.status === "available" ? t("available") : t("sold")}
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm mt-1 truncate">{shortDescription}</p>
          <div className="flex items-center mt-2">
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_URL}${favorite.user.avatar}`}
              size={25}
              bordered={true}
            />
            <span className="ml-3 text-2xl sm:text-sm">{favorite.user.username}</span>
          </div>
          <div className="flex items-center mt-2">
            <span className="font-medium text-sm sm:text-base">{favorite.product.price} {t("currency")}</span>
          </div>
        </Link>
        {/* Favorite yurakcha tugmasi */}
        <Button
          onClick={handleToggleFavorite}
          className="absolute top-10 right-4 p-2 rounded-full hover:bg-gray-700/50 transition-colors"
          disabled={!currentUserId}
        >
          <Heart
            size={20}
            className="text-red-500"
            fill="red"
          />
        </Button>
      </div>
    </div>
  );
}
