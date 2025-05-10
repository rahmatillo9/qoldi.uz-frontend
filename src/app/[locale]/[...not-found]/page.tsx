
'use client'

import { useTranslations } from "next-intl";
import BackButton from "@/ui/components/buttons/exit";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center space-y-6 backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-6 shadow-md">
        <div className="flex justify-center">
          <AlertTriangle size={48} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-teal-400">{t("title")}</h1>
        <p className="text-base text-zinc-300 leading-relaxed">{t("description")}</p>
        <div className="mt-4">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
