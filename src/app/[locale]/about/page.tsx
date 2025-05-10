
'use client'

import { useTranslations } from "next-intl";
import RBLogo from "@/ui/components/icons/logo";
import BackButton from "@/ui/components/buttons/exit";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 ">
           <div className="flex items-center justify-between mb-6">
      <BackButton/>
      </div>
      {/* Logo */}
 
        <RBLogo  />
     

      {/* About */}
      <div className="max-w-2xl text-center space-y-6 bg-black/30 border border-white/10 rounded-xl p-6 shadow-md">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-lg ">{t("description")}</p>
        <p className="text-3xl text-blue-600">{t("author")}</p>
      </div>

      {/* Contact */}
      <div className="mt-10 text-center space-y-4 bg-black/30 border border-white/10 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold">{t("contactTitle")}</h2>
        <p>
          Email: <a href="mailto:ismoilsayfiddinov06@gmail.com" className="text-blue-400 hover:underline">{t("email")}</a>
        </p>
        <p>
          Tel: <a href="tel:+998932688278" className="text-blue-400 hover:underline">{t("phone")}</a>
        </p>
        <p>
          Telegram: <a href="https://t.me/PPES571" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{t("telegram")}</a>
        </p>
        <p className="text-sm pt-2">
          © {new Date().getFullYear()} {t("copyright")}
        </p>
      </div>
    </div>
  );
}
