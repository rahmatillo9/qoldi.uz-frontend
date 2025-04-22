
import { useTranslations } from "next-intl";
import {  Location, ProductCardProps } from "./types";
import ImageCarousel from "./image-carousel";
import { MapPin, DollarSign, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import { getLocationFromCoords } from "@/ui/hooks/get-location.service";
import Avatar from "../avatar";




export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("ProductsPage");
  const [location, setLocation] = useState<Location>({ city: "Noma'lum", district: "Noma'lum" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lokatsiyani olish
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        const result = await getLocationFromCoords(product.latitude, product.longitude);
        setLocation(result);
      } catch (err) {
        setError("Manzilni aniqlashda xatolik :(");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [product.latitude, product.longitude]);

  // Descriptionni qisqartirish
  const shortDescription = product.description.length > 50
    ? product.description.substring(0, 50) + "..."
    : product.description;

   

  return (
    <div className="backdrop-blur-md bg-black/30 border-b hover:scale-102  border-white/10 shadow-mdrounded-lg shadow-md overflow-hidden transition-transform transform rounded-xl">
      <ImageCarousel images={product.images} />
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-semibold  truncate">{product.title}</h3>
          <div className="flex items-center">
            <Circle
              size={14}
              className={
                product.status === "available"
                  ? "text-green-500 mr-1"
                  : "text-red-500 mr-1"
              }
            />
            <span className="text-xs sm:text-sm ">
              {product.status === "available" ? t("available") : t("sold")}
            </span>
          </div>
        </div>
        <p className="text-xs sm:text-sm  mt-1 truncate">
          {shortDescription}
        </p>
        <div className="flex items-center mt-2">
        <Avatar
    src={`${process.env.NEXT_PUBLIC_API_URL}${product.user.avatar}`}
    size={25}
    bordered={true}
       
  />

          <span className="ml-3 text-2xl sm:text-sm ">{product.user.username}</span>
        </div>
        <div className="flex items-center mt-2 ">
          <span className="font-medium text-sm sm:text-base">{product.price} {t("currency")}</span>
        </div>
        <div className="flex items-center mt-2 ">
          <MapPin size={14} className="mr-1" />
          {loading ? (
            <span className="text-xs sm:text-sm truncate">{t("loadingLocation")}</span>
          ) : error ? (
            <span className="text-xs sm:text-sm truncate text-red-500 dark:text-red-400">{error}</span>
          ) : (
            <span className="text-xs sm:text-sm truncate">
              {t("location")}: {location.city}, {location.district}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

