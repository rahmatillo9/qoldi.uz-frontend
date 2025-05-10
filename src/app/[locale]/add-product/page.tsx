
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import BackButton from "@/ui/components/buttons/exit";
import { stat } from "fs";

export default function AddProductPage() {
  const t = useTranslations("AddProductPage");
  const router = useRouter();
  const { userId } = useAuth();
  const { categories, error: categoriesError, setError: setCategoriesError, isLoading: categoriesLoading } = useCategories();
  const { formData, error: formError, setError: setFormError, handleChange, handleLocationChange, validateForm } =
    useProductForm();
  const [images, setImages] = useState<File[]>([]);
  const [step, setStep] = useState(1);
  const [productId, setProductId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setError = (message: string) => {
    setFormError(message);
    setCategoriesError(message);
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    if (!userId) {
      setError(t("error"));
      return;
    }

    if (step === 2 && images.length === 0) {
      setError(t("error"));
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
          status: "available",
        };

        const response = await API.post("/product", productData);
        setProductId(response.data.id);
        setStep(2);
      } else if (step === 2 && productId) {
        for (const image of images) {
          const formData = new FormData();
          formData.append("imageUrl", image);
          formData.append("productId", productId.toString());

          console.log("Uploading image:", image.name, "with productId:", productId);
          for (const pair of formData.entries()) {
            console.log(`FormData entry: ${pair[0]}`, pair[1]);
          }

          try {
            console.log(`Starting upload for image: ${image.name}`);
            const response = await API.post("/product-images", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            console.log(`Upload response for ${image.name}:`, response.data);
            console.log(`Successfully uploaded image: ${image.name}`, response.data);
          } catch (err: any) {
            console.error(`Failed to upload image ${image.name}:`, err);
            setError(t("imageUploadError", { name: image.name }) || `Rasmni yuklashda xatolik: ${image.name}`);
            setLoading(false);
            return;
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
          router.push("/profile");
        }, 2000);
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.response?.data?.message || t("error"));
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
            <ImageUploadStep images={images} setImages={setImages} />
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
                disabled={images.length === 0}
              >
                {loading ? t("publishing") : t("publishProduct")}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
