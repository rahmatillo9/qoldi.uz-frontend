
'use client'

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";

export default function BackButton() {
  const t = useTranslations("Common");
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Sahifani bir orqaga qaytaradi
  };

  return (
    <Button
      onClick={handleBack}
      className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 text-white hover:bg-gray-700/50 transition-colors"
    >
      <ArrowLeft size={16} className="text-teal-400" />
      <span>{t("back")}</span>
    </Button>
  );
}
