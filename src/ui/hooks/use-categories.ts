
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import API from "@/lib/axios";
import { RawCategory } from "./type";




export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const useCategories = () => {
  const t = useTranslations("AddProductPage");
  const locale = useLocale(); // Joriy tilni olish (uz, ru, en)
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(""); // Oldingi xatoni tozalash

      try {
        const response = await API.get("/category");
        const rawCategories: RawCategory[] = response.data;

        // Kategoriyalarni tilga moslashtirish
        const formattedCategories = rawCategories.map((category) => ({
          id: category.id,
          name: category.name[locale as keyof typeof category.name] || category.name.uz, // Agar til topilmasa, default sifatida 'uz' ishlatiladi
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        }));

        setCategories(formattedCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError(t("error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [t, locale]); // locale o'zgarganda qayta yuklash uchun qo'shildi

  return { categories, error, setError, isLoading };
};
