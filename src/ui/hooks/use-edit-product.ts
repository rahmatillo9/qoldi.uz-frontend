
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import confetti from "canvas-confetti";
import API from "@/lib/axios";
import { useAuth } from "@/ui/hooks/use-auth";
import { useProductForm } from "@/ui/hooks/use-product-form";
import { ProductImage, Product } from "./type";



export const useEditProduct = () => {
  const t = useTranslations("EditProductPage");
  const router = useRouter();
  const { productId } = useParams();
  const { userId } = useAuth();
  const { formData, setFormData, error: formError, setError: setFormError, handleChange, handleLocationChange, validateForm } = useProductForm();
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagesLoading, setImagesLoading] = useState(true);

  // Mahsulot ma'lumotlarini yuklash
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/product/${productId}`);
        const product: Product = response.data;

        if (product.userId !== userId) {
          router.push(`/product/${productId}`);
          return;
        }

        setFormData({
          title: product.title,
          description: product.description,
          price: product.price.toString(),
          categoryId: product.categoryId.toString(),
          latitude: product.latitude,
          longitude: product.longitude,
          status: product.status,
        });
      } catch (err) {
        console.error("Mahsulot ma'lumotlarini yuklashda xato:", err);
        setFormError(t("error"));
      }
    };

    if (productId && userId) {
      fetchProduct();
    }
  }, [productId, userId, setFormData, router, t]);

  // Rasmlarni yuklash
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setImagesLoading(true);
        const response = await API.get(`/product-images/product/${productId}`);
        const { images } = response.data;
        setExistingImages(images || []);
      } catch (err) {
        console.error("Rasmlarni yuklashda xato:", err);
        setFormError(t("errorLoadingImages"));
      } finally {
        setImagesLoading(false);
      }
    };

    if (productId) {
      fetchImages();
    }
  }, [productId, t]);

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm(t("confirmDeleteImage"))) return;
    try {
      await API.delete(`/product-images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setExistingImages(existingImages.filter((image) => image.id !== imageId));
    } catch (err) {
      console.error("Rasmni o'chirishda xato:", err);
      setFormError(t("imageDeleteError"));
    }
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    if (!userId) {
      setFormError(t("error"));
      return;
    }

    if (step === 2 && existingImages.length === 0 && images.length === 0) {
      setFormError(t("errorNoImages"));
      return;
    }

    if (step === 1 && !validateForm()) {
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      if (step === 1) {
        const productData = {
          ...formData,
          price: Number.parseFloat(formData.price),
          categoryId: Number.parseInt(formData.categoryId),
          userId,
          status: formData.status || "available",
        };

        await API.put(`/product/${productId}`, productData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStep(2);
      } else if (step === 2) {
        if (images.length > 0) {
          for (const image of images) {
            const formData = new FormData();
            formData.append("imageUrl", image);
            if (productId) {
              formData.append("productId", productId.toString());
            } else {
              throw new Error("Product ID is undefined");
            }

            try {
              const response = await API.post("/product-images", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
              setExistingImages((prev) => [...prev, response.data]);
            } catch (err: any) {
              console.error(`Rasmni yuklashda xato ${image.name}:`, err);
              setFormError(t("imageUploadError", { name: image.name }));
              setLoading(false);
              return;
            }
          }
        }

        setSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.5, y: 0.5 },
          colors: ["#0d9488", "#2dd4bf", "#ffffff"],
        });
        setTimeout(() => {
          router.push(`/product/${productId}`);
        }, 2000);
      }
    } catch (err: any) {
      console.error("Xato:", err);
      setFormError(err.response?.data?.message || t("error"));
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    images,
    setImages,
    existingImages,
    step,
    setStep,
    loading,
    success,
    imagesLoading,
    formError,
    setFormError,
    handleChange,
    handleLocationChange,
    handleDeleteImage,
    handleSubmit,
  };
};
