
'use client'

import BackButton from "@/ui/components/buttons/exit";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br  flex flex-col items-center justify-start">
           <div className="flex items-center justify-between mb-6">
            <BackButton/>
            </div>
      <div className="max-w-2xl w-full text-left space-y-6 backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-6 shadow-md">
        <h1 className="text-3xl font-bold text-center text-teal-400">{t("title")}</h1>
        
        <p className="text-base text-zinc-300 leading-relaxed">{t("description")}</p>
        
        <ul className="space-y-2 list-disc list-inside text-zinc-200 text-sm">
          <li>{t("policy1")}</li>
          <li>{t("policy2")}</li>
          <li>{t("policy3")}</li>
        </ul>
        
        <div className="text-zinc-400 text-xs pt-4 border-t border-zinc-700">
          <p className="pt-2">{t("contact")}</p>
          <p className="pt-1">
            Email: <Link href="mailto:ismoilsayfiddinov06@gmail.com" className="text-blue-400 hover:underline">{t("email")}</Link>
          </p>
          <p>
          Tel: <Link href="tel:+998932688278" className="text-blue-400 hover:underline">{t("phone")}</Link>
        </p>
        <p>
          Telegram: <Link href="https://t.me/PPES571" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{t("telegram")}</Link>
        </p>
          <p className="pt-1">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </div>
    </div>
  );
}
