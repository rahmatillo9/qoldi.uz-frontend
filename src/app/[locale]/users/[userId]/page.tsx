
'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import API from "@/lib/axios";
import Avatar from "@/ui/components/avatar";
import UserProducts from "@/ui/components/profile/user-products";
import { Product } from "@/ui/components/products/types";
import BackButton from "@/ui/components/buttons/exit";
import { toast } from "sonner";

interface User {
  id: number;
  username: string;
  avatar: string;
  bio: string | null;
}

export default function UserProfilePage() {
  const t = useTranslations("UserProfilePage");
  const params = useParams();
  const userId = params?.userId as string;
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      toast.error(t("userNotFound"));
      setError(t("userNotFound"));
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Foydalanuvchi ma'lumotlarini olish
        const userResponse = await API.get(`/users/${userId}`);
        setUser({
          id: userResponse.data.id,
          username: userResponse.data.username,
          avatar: userResponse.data.avatar,
          bio: userResponse.data.bio,
        });

        // Foydalanuvchi mahsulotlarini olish
        const productsResponse = await API.get(`/product/user/${userId}`);
        setProducts(productsResponse.data);
      } catch (err) {

        toast.error(t("errorLoadingData"));
        setError(t("errorLoadingData"));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, t]);

  if (loading) return <div className="text-center py-10">{t("loading")}</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
           <div className="flex items-center justify-between mb-6">
            <BackButton/>
            </div>
      {/* Foydalanuvchi ma'lumotlari */}
      <div className="rounded-lg p-6 mb-8 backdrop-blur-md bg-black/30 border-b  border-white/10 shadow-md">
        <div className="flex items-center mb-4">
          <Avatar
            src={`${process.env.NEXT_PUBLIC_API_URL}${user.avatar}`}
            size={80}
            bordered={true}
          />
          <div>
            <h1 className="text-2xl font-bold ml-2 ">{user.username}</h1>
            <p className="ml-2">{user.bio || t("noBio")}</p>
          </div>
        </div>
      </div>

      {/* Foydalanuvchi mahsulotlari */}
      <UserProducts products={products} />
    </div>
  );
}
