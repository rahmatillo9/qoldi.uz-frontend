
'use client'

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Search, UserPlus, Send } from "lucide-react";
import { Button } from "@heroui/react";
import LanguageSwitcher from "@/ui/components/language-switcher";

export default function LandingPage() {
  const t = useTranslations("LandingPage");

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br   text-white flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-12">
        {/* Yuqori qism: Til almashtirish tugmasi */}
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>

        {/* Sarlavha */}
        <div className="text-center space-y-4 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl font-bold text-teal-400">{t("title")}</h1>
          <p className="text-lg text-zinc-300">{t("description")}</p>
        </div>

        {/* Funksiyalar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Search */}
          <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-6 text-center space-y-4 animate-slideUp">
            <Search size={32} className="text-teal-400 mx-auto animate-pulse" />
            <h3 className="text-xl font-semibold">{t("searchTitle")}</h3>
            <p className="text-sm text-zinc-400">{t("searchDescription")}</p>
            <Link href="/home">
              <Button className="backdrop-blur-md bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white hover:bg-gray-700/50 transition-colors">
                {t("exploreProducts")}
              </Button>
            </Link>
          </div>

          {/* Ro'yxatdan o'tish */}
          <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-6 text-center space-y-4 animate-slideUp" style={{ animationDelay: "0.2s" }}>
            <UserPlus size={32} className="text-teal-400 mx-auto animate-pulse" />
            <h3 className="text-xl font-semibold">{t("registerTitle")}</h3>
            <p className="text-sm text-zinc-400">{t("registerDescription")}</p>
            <Link href="/register">
              <Button className="backdrop-blur-md bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white hover:bg-gray-700/50 transition-colors">
                {t("signUp")}
              </Button>
            </Link>
          </div>

          {/* Telegram aloqasi */}
          <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-6 text-center space-y-4 animate-slideUp" style={{ animationDelay: "0.4s" }}>
            <Send size={32} className="text-teal-400 mx-auto animate-pulse" />
            <h3 className="text-xl font-semibold">{t("supportTitle")}</h3>
            <p className="text-sm text-zinc-400">{t("supportDescription")}</p>
            <a href="https://t.me/PPES571" target="_blank" rel="noopener noreferrer">
              <Button className="backdrop-blur-md bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white hover:bg-gray-700/50 transition-colors">
                {t("contactSupport")}
              </Button>
            </a>
          </div>
        </div>

     
      </div>

     
    </div>
  );
}
