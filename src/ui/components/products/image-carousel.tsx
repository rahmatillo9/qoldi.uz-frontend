'use client'
import { useState } from "react";
import { ProductImage } from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface ImageCarouselProps {
  images: ProductImage[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations("ProductsPage")

; // ✅ HAR DOIM chaqiriladi

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
        <span className="text-gray-500 dark:text-gray-400">{t("nophoto")}</span>
      </div>
    );
  }

  

  return (
    <div className="relative w-full h-48 rounded-lg overflow-hidden">
      {images.map((image, index) => (
     <img
      draggable="false"
     key={image.id}
     src={`${process.env.NEXT_PUBLIC_API_URL}${image.imageUrl}`}
     alt={`Product image ${index + 1}`}
     className={`absolute w-full h-full object-cover transition-opacity duration-500  ${
       index === currentIndex ? "opacity-100" : "opacity-0"
     }`}
   />
   
     
      ))}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}
