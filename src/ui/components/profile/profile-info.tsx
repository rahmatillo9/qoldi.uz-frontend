
'use client'

import { useState } from "react";
import { useTranslations } from "next-intl";
// import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import Avatar from "@/ui/components/avatar";
import { ProfileInfoProps } from "./taype";
// import API from "@/lib/axios";

export default function ProfileInfo({ user, onUpdate }: ProfileInfoProps) {
  const t = useTranslations("ProfilePage");
  // const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    bio: user.bio || "",
    avatar: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
    }
  };

  const handleUpdate = async () => {
    const updatedUser = {
      username: formData.username,
      bio: formData.bio || undefined,
      avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : user.avatar,
    };
    await onUpdate(updatedUser, formData.avatar);
    setIsEditing(false);
  };

  // const handleVerifyEmail = async () => {
  //   setLoading(true);
  //   setError("");

  //   try {
  //     // Kodni qayta yuborish
  //     await API.post("/users/send-email-code", { email: user.email });
  //     // Emailni localStorage'ga saqlash (VerifyEmailPage uchun)
  //     if (user.email) {
  //       localStorage.setItem("pendingVerificationEmail", user.email);
  //     } else {
  //       console.error("User email is undefined");
  //     }
  //     // Email tasdiqlash sahifasiga yo'naltirish
  //     router.push("/verify-email");
  //   } catch (err) {
  //     console.log(err);
      
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="rounded-lg p-6 mb-8 backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative">
          {isEditing ? (
            <div className="relative">
              <Avatar
                src={
                  formData.avatar
                    ? URL.createObjectURL(formData.avatar)
                    : `${process.env.NEXT_PUBLIC_API_URL}${user.avatar}`
                }
                size={120}
                bordered={true}
                fallbackText={user.username.charAt(0).toUpperCase()}
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                  />
                </svg>
              </label>
            </div>
          ) : (
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_URL}${user.avatar}`}
              size={120}
              bordered={true}
              fallbackText={user.username.charAt(0).toUpperCase()}
            />
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          {isEditing ? (
            <>
              <Input
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="mb-4 w-full max-w-md mx-auto md:mx-0"
                placeholder={t("username")}
              />
              <Input
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="mb-4 w-full max-w-md mx-auto md:mx-0"
                placeholder={t("bio")}
              />
              <div className="flex items-center space-x-2">
                <span className="">{user.email}</span>
                {!user.isEmailConfirmed && (
                  <button
                
                    disabled={loading}
                    className="text-red-500 text-sm font-medium bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? t("sendingCode") : t("emailNotConfirmed")}
                  </button>
                )}
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
              <div className="mt-4 flex space-x-2 justify-center md:justify-start">
                <Button
                  onClick={handleUpdate}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {t("save")}
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 hover:bg-gray-600"
                >
                  {t("cancel")}
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-bold">
                {user.username}
              </h1>
              <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                <span className="">{user.email}</span>
                {!user.isEmailConfirmed && (
                  <button
                   
                    disabled={loading}
                    className="text-red-500 text-sm font-medium dark:bg-red-900/30 px-2 py-1 rounded hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? t("sendingCode") : t("emailNotConfirmed")}
                  </button>
                )}
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
              <p className="mt-2">
                {user.bio || t("noBio")}
              </p>
              <Button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-blue-500 hover:bg-blue-600"
              >
                {t("editProfile")}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
