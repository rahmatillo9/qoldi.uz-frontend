
'use client'

import { useTranslations } from "next-intl";
import {Link } from "@heroui/react";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 shadow-md py-6">
      <div className="container mx-auto px-4 text-center ">
        <div className="mb-4">
          <Link href="/home" className="text-xl font-bold  hover:text-teal-500 transition-colors">
            {t("logo")}
          </Link>
        </div>
        <div className="space-x-4 mb-4">
          <Link href="/about" className="text-sm hover:text-teal-500 transition-colors">
            {t("about")}
          </Link>
          <Link href="/terms" className="text-sm hover:text-teal-500 transition-colors">
            {t("terms")}
          </Link>
        </div>
        <p className="text-xs mb-2">
          &copy; {new Date().getFullYear()} {t("copyright")}
        </p>
        <Link href="https://butcher4.uz" target="_blank" rel="noopener noreferrer" className="text-sm text-teal-400 hover:underline">
          Power of Butcher
        </Link>
      </div>
    </footer>
  );
}
