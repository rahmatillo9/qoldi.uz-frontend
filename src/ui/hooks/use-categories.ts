
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import API from "@/lib/axios";
import { Category } from "../components/add-product/types";

export const useCategories = () => {
  const t = useTranslations("AddProductPage");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get("/category");
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError(t("error"));
      }
    };

    fetchCategories();
  }, [t]);

  return { categories, error, setError };
};
