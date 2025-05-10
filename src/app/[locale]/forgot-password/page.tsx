
'use client'

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Input, Button } from "@heroui/react";
import API from "@/lib/axios";
import BackButton from "@/ui/components/buttons/exit";

export default function ForgotPasswordPage() {
  const t = useTranslations("ForgotPassword");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await API.post("/users/forgot-password", { email });
      setSuccess(t("emailSent"));
      setTimeout(() => {
        router.push("/reset-password");
      }, 2000); // 2 soniyadan keyin yo'naltirish
    } catch (err: any) {
      setError(err.response?.data?.message || t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
           <div className="flex items-center justify-between mb-6">
            <BackButton/>
            </div>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-100 mb-6 text-center">
          {t("title")}
        </h1>
        {success ? (
          <div className="text-green-500 text-center mb-4">{success}</div>
        ) : (
          <>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="mb-4 w-full"
              disabled={loading}
            />
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <Button
              onClick={handleSubmit}
              disabled={loading || !email}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              {loading ? t("sending") : t("submit")}
            </Button>
          </>
        )}
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-400 hover:underline">
            {t("backToLogin")}
          </a>
        </div>
      </div>
    </div>
  );
}
