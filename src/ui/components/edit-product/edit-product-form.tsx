
'use client'

import { useTranslations } from "next-intl";
import { Card, CardHeader, CardBody, CardFooter, Button, Divider } from "@heroui/react";
import ProductForm from "@/ui/components/add-product/product-form";
import StepIndicator from "@/ui/components/add-product/step-indicator";
import ImageManager from "@/ui/components/edit-product/image-manager";
import { EditProductFormProps } from "./type";
import { ProductImage } from "./type";

export default function EditProductForm({
  formData,
  categories,
  step,
  setStep,
  images,
  setImages,
  existingImages: rawExistingImages,
  imagesLoading,
  loading,
  formError,
  handleChange,
  handleLocationChange,
  handleDeleteImage,
  handleSubmit,
}: EditProductFormProps) {
  const t = useTranslations("EditProductPage");

  // string[] dan ProductImage[] ga aylantirish
  const existingImages: ProductImage[] = rawExistingImages.map((url, index) => ({
    id: index + 1, // Vaqtinchalik ID (backenddan kelishi kerak bo'lsa o'zgartiriladi)
    imageUrl: url, // URL string sifatida keladi
    productId: 0, // Backenddan kelishi kerak, hozircha 0 qilib qo'yamiz
    createdAt: new Date().toISOString(), // Vaqtinchalik yaratilgan sana
    updatedAt: new Date().toISOString(), // Vaqtinchalik yangilangan sana
  }));

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold">
          {step === 1 ? t("titleStep1") : t("titleStep2")}
        </h1>
        <p className="mt-2 text-lg">
          {step === 1 ? t("descriptionStep1") : t("descriptionStep2")}
        </p>
      </div>

      <StepIndicator step={step} />

      {formError && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 p-4 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-600">{formError}</p>
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
            <ImageManager
              images={images}
              setImages={setImages}
              existingImages={existingImages} 
              imagesLoading={imagesLoading}
              onDeleteImage={handleDeleteImage}
            />
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
