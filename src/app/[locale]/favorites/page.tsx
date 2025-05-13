
'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ProductCard from "@/ui/components/products/product-card-fav";
import API from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/ui/components/add-product/types";
import { Favorite } from "@/ui/components/products/types";
import BackButton from "@/ui/components/buttons/exit";
import { toast } from "sonner";
import SearchBar from "@/ui/components/search/search-bar";
import { AxiosError } from "axios";

export default function FavoritesPage() {
  const t = useTranslations("Favorite");
  const to = useTranslations("Toast");
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [favoritesError, setFavoritesError] = useState<string | null>(null);

  // JWT token orqali userId ni olish
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setCurrentUserId(decoded.id);
      } catch (err) {
        toast.error(to("tokenError"));
        console.error("Token dekod qilishda xato:", err);
      }
    }
  }, []);

  // Favoritlarni olish
  const fetchFavorites = async () => {
    if (!currentUserId) return;

    try {
      const response = await API.get(`/favorites/user/${currentUserId}`);
   
    
      if (response.data && response.data.length === 0) {
        setFavoritesError(t("errorLoadingFavorites")); // yoki: t("noFavoritesFound")
        setFavorites([]);
      } else {
        setFavorites(response.data);
        setFavoritesError(null);
      }
    
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
    
      if (axiosError.response?.status === 404) {
        // 404 bo‘lsa – favoritlar topilmadi, lekin bu xato emas
        setFavorites([]);
        setFavoritesError(t("noFavorites"));
      } else {
        setFavorites([]);
        setFavoritesError(t("errorLoadingFavorites"));
        console.error("Favoritlarni olishda xato:", axiosError);
      }
    }
    
  };

  useEffect(() => {
    fetchFavorites();
  }, [currentUserId, t]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="sticky top-12 z-30 mb-2 bg-[#0d0d0d] pb-4">
        <SearchBar />
      </div>
      <div className="flex items-center justify-between mb-6">
        <BackButton />
      </div>
      
      {/* Favorites bo'limi */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("favorites")}</h2>
        {favoritesError && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 p-4 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-200">{favoritesError}</p>
          </div>
        )}
        {favorites.length > 0 && !favoritesError && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((favorite) => (
              <ProductCard
                key={favorite.id}
                favorite={favorite}
                fetchFavorites={fetchFavorites}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
