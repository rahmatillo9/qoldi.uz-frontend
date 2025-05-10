
import { useState } from "react";
import { useTranslations } from "next-intl";
import { FormData } from "../components/add-product/types";

export const useProductForm = () => {
  const t = useTranslations("AddProductPage");
  const [formData, setFormData] = useState<FormData>({
    status: "", // Added the missing 'status' property
    title: "",
    description: "",
    price: "",
    categoryId: "",
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError(t("errorTitleRequired"));
      return false;
    }
    if (!formData.description.trim()) {
      setError(t("errorDescriptionRequired"));
      return false;
    }
    const price = Number.parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError(t("errorPriceInvalid"));
      return false;
    }
    if (!formData.categoryId) {
      setError(t("errorCategoryRequired"));
      return false;
    }
    if (formData.latitude === 0 && formData.longitude === 0) {
      setError(t("errorLocationRequired"));
      return false;
    }
    return true;
  };

  return {
    formData,
    setFormData, // setFormData funksiyasini qaytarishga qo'shdik
    error,
    setError,
    handleChange,
    handleLocationChange,
    validateForm,
  };
};
