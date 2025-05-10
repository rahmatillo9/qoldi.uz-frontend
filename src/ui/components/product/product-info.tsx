
'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { DollarSign, MapPin, Circle, MessageSquare } from "lucide-react";
import Avatar from "@/ui/components/avatar";
import { Button } from "@heroui/react";
import Link from "next/link";
import ChatModal from "../chat/chat-modal";
import { ProductInfoProps } from "./type";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/ui/components/add-product/types";

export default function ProductInfo({ product }: ProductInfoProps) {
  const t = useTranslations("ProductDetail");
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

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

  const userId = product.user.id;
  const isOwner = currentUserId === userId;

  const handleMessageClick = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      <div className="rounded-lg p-6 backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="flex items-center mb-4">
          <DollarSign size={20} className="mr-2" />
          <span className="text-xl font-semibold">{product.price} {t("currency")}</span>
        </div>
        <div className="flex items-center mb-4">
          <Circle
            size={16}
            className={
              product.status === "available"
                ? "text-green-500 mr-2"
                : "text-red-500 mr-2"
            }
          />
          <span>
            {product.status === "available" ? t("available") : t("sold")}
          </span>
        </div>
        <p className="mb-4">{t("description")}: {product.description}</p>
        <Link href={`/users/${userId}`} className="block">
          <div className="flex items-center mb-4">
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.user.avatar}`}
              size={40}
              bordered={true}
            />
            <span className="ml-2">{product.user.username}</span>
          </div>
        </Link>
        <div className="flex items-center mb-4">
          <MapPin size={20} className="mr-2" />
          <span>{t("location")}</span>
        </div>
        <Button
          onClick={handleMessageClick}
          className={`flex items-center bg-blue-500 hover:bg-blue-600 ${isOwner ? "hidden" : ""}`}
          disabled={isOwner || currentUserId === null}
        >
          <MessageSquare size={20} className="mr-2" />
          {t("sendMessage")}
        </Button>
      </div>

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        product={product}
      />
    </>
  );
}
