
'use client'

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import API from "@/lib/axios";
import ProfileInfo from "@/ui/components/profile/profile-info";
import UserProducts from "@/ui/components/profile/user-products";
import { Product } from "@/ui/components/products/types";
import { User } from "@/ui/components/profile/taype";
import { JwtPayload } from "@/ui/components/add-product/types";
import ProfileSkeleton from "@/ui/components/skeletons/profile-skeleton";
import BackButton from "@/ui/components/buttons/exit";



export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // userId ni JWT dan olish
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;

      // Foydalanuvchi ma'lumotlarini olish
      const fetchUser = async () => {
        try {
          setLoading(true);
          const userResponse = await API.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(userResponse.data);

          // Foydalanuvchi mahsulotlarini olish
          const productsResponse = await API.get(`${process.env.NEXT_PUBLIC_API_URL}/product/user/${userId}`);
          setProducts(productsResponse.data);
        } catch (err) {
          setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } catch (err) {
      console.log("Token dekod qilishda xato:", err);
      
      router.push("/login");
    }
  }, [router]);

  // Profilni yangilash
  const handleUpdateProfile = async (updatedUser: Partial<User>, avatarFile: File | null) => {
    if (!user) return;

    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();
    formDataToSend.append("username", updatedUser.username || user.username);
    formDataToSend.append("bio", updatedUser.bio || "");

    // Agar yangi avatar yuklangan bo'lsa
    if (avatarFile) {
      let file = avatarFile;
      // HEIF formatini JPEG ga aylantirish
      if (file.type === "image/heif" || file.type === "image/heic") {
        const image = new Image();
        const url = URL.createObjectURL(file);
        image.src = url;

        await new Promise((resolve) => (image.onload = resolve));

        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(image, 0, 0);
        const jpegBlob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.9)
        );
        file = new File([jpegBlob], file.name.replace(/\.(heif|heic)$/i, ".jpg"), {
          type: "image/jpeg",
        });
        URL.revokeObjectURL(url);
      }
      formDataToSend.append("avatar", file);
    }

    try {
      await API.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUser({
        ...user,
        username: updatedUser.username || user.username,
        bio: updatedUser.bio || undefined,
        avatar: updatedUser.avatar || user.avatar,
      });
    } catch (err) {
      setError("Profilni yangilashda xatolik yuz berdi");
      console.error(err);
    }
  };

  if (loading) return <ProfileSkeleton />;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
           <div className="flex items-center justify-between mb-6">
            <BackButton/>
            </div>
      <ProfileInfo user={user} onUpdate={handleUpdateProfile} />
      <UserProducts products={products} />
    </div>
  );
}
