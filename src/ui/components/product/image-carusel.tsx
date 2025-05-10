
'use client'

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";

interface ImageCarouselProps {
  images: { id: number; imageUrl: string; productId: number; createdAt: string; updatedAt: string }[];
  title: string;
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const t = useTranslations("ProductDetail");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="relative">
      {images.length > 0 ? (
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${images[currentImageIndex].imageUrl}`}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Oldingi va keyingi tugmalar */}
          <Button
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            ←
          </Button>
          <Button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            →
          </Button>
          {/* Rasmlar soni indikatori */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? "bg-blue-500" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-700 rounded-lg">
          <span className="text-gray-400">{t("noImages")}</span>
        </div>
      )}
    </div>
  );
}
