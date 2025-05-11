
'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {  ProductCardProps } from "./types";
import ImageCarousel from "./image-carousel";
import { Circle, Heart, Edit, Trash2 } from "lucide-react";
import Avatar from "../avatar";
import Link from "next/link";
import API from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/ui/components/add-product/types";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import Switch from "react-switch";

// ProductCardProps interfeysini yangilaymiz
interface ExtendedProductCardProps extends ProductCardProps {
  onDelete?: (productId: number) => void; // O'chirishdan keyin chaqiriladigan funksiya
}

export default function ProductCard({ product, onDelete }: ExtendedProductCardProps) {
  const t = useTranslations("ProductsPage");
  // const [location, setLocation] = useState<Location>({ city: "Noma'lum", district: "Noma'lum" });
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [status, setStatus] = useState<"available" | "sold">(product.status as "available" | "sold");

  // JWT token orqali userId ni olish
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setCurrentUserId(decoded.id);
      } catch (err) {
        console.error("Token dekod qilishda xato:", err);
      }
    }
  }, []);

  // Dastlabki favorite holatini serverdan olish
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!currentUserId) return;

      try {
        const response = await API.get(`/favorites/check?productId=${product.id}&userId=${currentUserId}`);
        setIsFavorite(response.data.isFavorite);
      } catch (err) {
        console.error("Favorite holatini tekshirishda xato:", err);
      }
    };

    checkFavoriteStatus();
  }, [currentUserId, product.id]);

  // Lokatsiyani olish
  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       setLoading(true);
  //       // const result = await getLocationFromCoords(product.latitude, product.longitude);
  //       // setLocation(result);
  //     } catch (err) {
  //       setError("Manzilni aniqlashda xatolik :(");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchLocation();
  // }, [product.latitude, product.longitude]);

  // Prop'dan kelgan statusni yangilash
  useEffect(() => {
    setStatus(product.status as "available" | "sold");
  }, [product.status]);

  // Favorite holatini toggle qilish
  const handleToggleFavorite = async () => {
    if (!currentUserId) {
      console.error("Foydalanuvchi tizimga kirmagan!");
      return;
    }

    try {
      const response = await API.post("/favorites/toggle", {
        productId: product.id,
        userId: currentUserId,
      });

      const { status } = response.data;
      setIsFavorite(status === "added");
    } catch (err) {
      console.error("Favorite toggle qilishda xato:", err);
    }
  };

  // Statusni o'zgartirish
  const handleToggleStatus = async () => {
    if (!currentUserId || currentUserId !== product.userId) return;

    try {
      const newStatus = status === "available" ? "sold" : "available";
      await API.patch(`/product/status/${product.id}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStatus(newStatus);
    } catch (err) {
      console.error("Statusni o'zgartirishda xato:", err);
      setError(t("statusUpdateError"));
    }
  };

  const handleDeleteProduct = async () => {
    if (!currentUserId || currentUserId !== product.userId) return;

    const confirmDelete = window.confirm(t("confirmDelete"));
    if (!confirmDelete) return;

    try {
      await API.delete(`/product/${product.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Mahsulot muvaffaqiyatli o'chirildi, onDelete chaqiriladi
      if (onDelete) {
        onDelete(product.id);
      }
    } catch (err) {
      console.error("Mahsulotni o'chirishda xato:", err);
      setError(t("productDeleteError"));
    }
  };

  // Descriptionni qisqartirish
  const shortDescription = product.description.length > 50
    ? product.description.substring(0, 50) + "..."
    : product.description;

  // Mahsulot joriy foydalanuvchiga tegishli ekanligini tekshirish
  const isOwner = currentUserId === product.userId;

  return (
    <div className="backdrop-blur-md bg-black/30 border-b hover:scale-102 border-white/10 shadow-md overflow-hidden transition-transform transform rounded-xl hover:shadow-lg">
      <ImageCarousel images={product.images} />
      <div className="p-3 sm:p-4 relative">
        <Link href={`/product/${product.id}`} className="block">
          <div className="flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-semibold truncate">{product.title}</h3>
            <div className="flex items-center">
              <Circle
                size={14}
                className={
                  status === "available"
                    ? "text-green-500 mr-1"
                    : "text-red-500 mr-1"
                }
              />
              <span className="text-xs sm:text-sm">
                {status === "available" ? t("available") : t("sold")}
              </span>
            </div>
          </div>
          <p className={`text-xs sm:text-sm mt-1 truncate ${isOwner ? "hidden" : ""}`}>{shortDescription}</p>
          <div className="flex items-center mt-2">
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.user.avatar}`}
              size={25}
              bordered={true}
            />
            <span className={`ml-3 text-2xl sm:text-sm ${isOwner ? "hidden" : ""}`}>{product.user.username}</span>
          </div>
          <div className="flex items-center mt-2">
            <span className="font-medium text-sm sm:text-base">{product.price} {t("currency")}</span>
          </div>
        </Link>
        <div className="absolute top-10 right-4 flex gap-2">
          <Button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full hover:bg-gray-700/50 transition-colors ${isOwner ? "hidden" : ""}`}
            disabled={!currentUserId}
          >
            <Heart
              size={20}
              className={isFavorite ? "text-red-500" : "text-gray-400"}
              fill={isFavorite ? "red" : "none"}
            />
          </Button>
          {isOwner && (
            <Dropdown className="bg-white/10 border border-white/20 rounded-md shadow-md">
              <DropdownTrigger>
                <Button className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                  <Edit size={20} className="text-gray-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="solid" color="default" selectionMode="none">
                <DropdownItem
                  key="edit"
                  as={Link}
                  href={`/edit-product/${product.id}`}
                >
                  {t("edit")}
                </DropdownItem>
                <DropdownItem key="toggle-status">
                  <div className="flex items-center gap-2">
                    <Switch
                      onChange={handleToggleStatus}
                      checked={status === "available"}
                      onColor="#06b6d4"
                      onHandleColor="#ffffff"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={40}
                      className="react-switch"
                    />
                    <span>
                      {status === "available" ? t("markSold") : t("markAvailable")}
                    </span>
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-red-500 hover:bg-red-500/20 transition-colors"
                  onClick={handleDeleteProduct}
                >
                  <Trash2 size={20} className="text-red-500 mr-2" />
                  {t("delete")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
}
