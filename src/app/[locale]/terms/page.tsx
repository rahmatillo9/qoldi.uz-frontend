'use client'

import BackButton from '@/ui/components/buttons/exit';
import { useTranslations, useMessages } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations("TermsPage");
  const messages = useMessages();

  const rules: string[] = messages?.TermsPage?.rules || [];

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br  flex flex-col items-center justify-start">
           <div className="flex items-center justify-between mb-6">
            <BackButton/>
            </div>
      <div className="max-w-3xl w-full text-left space-y-8 backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-6 sm:p-8 shadow-lg">
        {/* Sarlavha */}
        <h1 className="text-4xl font-bold text-center tracking-tight text-teal-400">{t("title")}</h1>
        
        {/* Kirish so'zi */}
        <p className="text-lg text-zinc-300 text-center leading-relaxed">{t("intro")}</p>

        {/* Qoidalar ro'yxati */}
        <ul className="space-y-4 list-disc list-inside text-zinc-200 text-base">
          {rules.map((rule: string, index: number) => (
            <li key={index} className="transition-all hover:text-teal-300">{rule}</li>
          ))}
        </ul>

        {/* Ogohlantirish */}
        <div className="text-zinc-300 text-sm pt-4 border-t border-zinc-700">
          <p className="pt-4 leading-relaxed">{t("warning")}</p>
        </div>

        {/* Copyright */}
        <p className=" text-sm text-center pt-10">
          © {new Date().getFullYear()} {t("copyright")}
        </p>
      </div>
    </div>
  );
}
