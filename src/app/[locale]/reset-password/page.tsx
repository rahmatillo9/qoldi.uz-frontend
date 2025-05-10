
'use client'

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Input, Button } from "@heroui/react";
import API from "@/lib/axios";
import Link from "next/link";


export default function ResetPasswordPage() {
  const t = useTranslations("ResetPassword");
  const router = useRouter();
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await API.post("/users/reset-password", { resetCode, newPassword });
      setSuccess(t("passwordResetSuccess"));
      setTimeout(() => {
        router.push("/login");
      }, 2000); // 2 soniyadan keyin yo'naltirish
    } catch (err) {
    console.log(err);
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-100 mb-6 text-center">
          {t("title")}
        </h1>
        {success ? (
          <div className="text-green-500 text-center mb-4">{success}</div>
        ) : (
          <>
            <Input
              type="text"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              placeholder={t("resetCodePlaceholder")}
              className="mb-4 w-full"
              disabled={loading}
            />
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t("newPasswordPlaceholder")}
              className="mb-4 w-full"
              disabled={loading}
            />
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <Button
              onClick={handleSubmit}
              disabled={loading || !resetCode || !newPassword}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              {loading ? t("submitting") : t("submit")}
            </Button>
          </>
        )}
        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-400 hover:underline">
            {t("backToLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
}
