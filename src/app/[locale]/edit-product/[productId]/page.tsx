
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import confetti from "canvas-confetti";
import API from "@/lib/axios";
import { Card, CardHeader, CardBody, CardFooter, Button, Divider } from "@heroui/react";
import { useAuth } from "@/ui/hooks/use-auth";
import { useCategories } from "@/ui/hooks/use-categories";
import { useProductForm } from "@/ui/hooks/use-product-form";
import ProductForm from "@/ui/components/add-product/product-form";
import ImageUploadStep from "@/ui/components/add-product/image-upload-step";
import SuccessMessage from "@/ui/components/add-product/success-message";
import StepIndicator from "@/ui/components/add-product/step-indicator";
import { X } from "lucide-react";
import BackButton from "@/ui/components/buttons/exit";

interface ProductImage {
  id: number;
  imageUrl: string;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  status: "available" | "sold";
  categoryId: number;
  userId: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
}

export default function EditProductPage() {
  const t = useTranslations("EditProductPage");
  const router = useRouter();
  const { productId } = useParams();
  const { userId } = useAuth();
  const { categories, error: categoriesError, setError: setCategoriesError, isLoading: categoriesLoading } = useCategories();
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

        // Foydalanuvchi mahsulot egasi ekanligini tekshirish
        if (product.userId !== userId) {
          router.push(`/product/${productId}`);
          return;
        }

        // Formaga eski ma'lumotlarni joylashtirish
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
        setError(t("error"));
      }
    };

    if (productId && userId) {
      fetchProduct();
    }
  }, [productId, userId, setFormData, router, t]);

  // Rasmlarni alohida yuklash
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setImagesLoading(true);
        const response = await API.get(`/product-images/product/${productId}`);
        const { images } = response.data;
        setExistingImages(images || []);
      } catch (err) {
        console.error("Rasmlarni yuklashda xato:", err);
        setError(t("errorLoadingImages"));
      } finally {
        setImagesLoading(false);
      }
    };

    if (productId) {
      fetchImages();
    }
  }, [productId, t]);

  const setError = (message: string) => {
    setFormError(message);
    setCategoriesError(message);
  };

  // Rasmni o'chirish funksiyasi
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
      setError(t("imageDeleteError"));
    }
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    if (!userId) {
      setError(t("error"));
      return;
    }

    if (step === 2 && existingImages.length === 0 && images.length === 0) {
      setError(t("errorNoImages"));
      return;
    }

    if (step === 1 && !validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

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
            formData.append("productId", (productId ?? "").toString());

            try {
              const response = await API.post("/product-images", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
              setExistingImages((prev) => [...prev, response.data]);
            } catch (err) {
              console.error(`Rasmni yuklashda xato ${image.name}:`, err);
              setError(t("imageUploadError", { name: image.name }));
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
    } catch (err) {
      console.error("Xato:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <SuccessMessage />;
  }

  if (categoriesLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">{t("loadingCategories")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between mb-6">
      <BackButton/>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold">
          {step === 1 ? t("titleStep1") : t("titleStep2")}
        </h1>
        <p className="mt-2 text-lg">
          {step === 1 ? t("descriptionStep1") : t("descriptionStep2")}
        </p>
      </div>

      <StepIndicator step={step} />

      {(formError || categoriesError) && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 p-4 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-600">{formError || categoriesError}</p>
            </div>
          </div>
        </div>
      )}

      <Card className="shadow-lg bg-white dark:bg-gray-800">
        <CardHeader className="pb-0 pt-6 px-6">
          <h2 className="text-xl font-bold">
            {step === 1 ? t("productInformation") : t("productImages")}
          </h2>
        </CardHeader>

        <CardBody className="px-6">
          {step === 1 ? (
            <ProductForm
              formData={formData}
              categories={categories.map(category => ({ ...category, products: [] }))}
              handleChange={handleChange}
              handleLocationChange={handleLocationChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <div>
              {/* Mavjud rasmlarni ko'rsatish va o'chirish */}
              {imagesLoading ? (
                <p className="text-center text-gray-600 dark:text-gray-400">{t("loadingImages")}</p>
              ) : existingImages.length > 0 ? (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{t("existingImages")}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {existingImages.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${image.imageUrl}`}
                          alt="Product image"
                          className="w-full h-32 object-cover rounded"
                        />
                        <Button
                          onClick={() => handleDeleteImage(image.id)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">{t("noImages")}</p>
              )}
              <ImageUploadStep images={images} setImages={setImages} />
            </div>
          )}
        </CardBody>

        <Divider className="b" />

        <CardFooter className="flex justify-between px-6 py-4">
          {step === 1 ? (
            <div className="w-full">
              <Button
                className="w-full bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400"
                type="submit"
                onClick={handleSubmit}
                isLoading={loading}
              >
                {loading ? t("saving") : t("continueToImages")}
              </Button>
            </div>
          ) : (
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => setStep(1)}
                disabled={loading}
              >
                {t("backToDetails")}
              </Button>
              <Button
                className="flex-1 bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400"
                onClick={handleSubmit}
                isLoading={loading}
                disabled={existingImages.length === 0 && images.length === 0}
              >
                {loading ? t("updating") : t("updateProduct")}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
