
import { useTranslations } from "next-intl";
import { Image, Button } from "@heroui/react";
import ImageUploadStep from "@/ui/components/add-product/image-upload-step";
import { X } from "lucide-react";
import { ImageManagerProps } from "./type";



export default function ImageManager({ images, setImages, existingImages, imagesLoading, onDeleteImage }: ImageManagerProps) {
  const t = useTranslations("EditProductPage");

  return (
    <div>
      {imagesLoading ? (
        <p className="text-center text-gray-600 dark:text-gray-400">{t("loadingImages")}</p>
      ) : existingImages.length > 0 ? (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{t("existingImages")}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {existingImages.map((image) => (
              <div key={image.id} className="relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${image.imageUrl}`}
                  alt="Product image"
                  className="w-full h-32 object-cover rounded"
                />
                <Button
                  onClick={() => onDeleteImage(image.id)}
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
  );
}
