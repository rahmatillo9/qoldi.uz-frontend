'use client'

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const switchLanguage = (newLocale: string) => {
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  const languages = [
    { code: "uz", name: t("uzbek"), flag: "/flags/uz.png" },
    { code: "ru", name: t("russian"), flag: "/flags/ru.png" },
    { code: "en", name: t("english"), flag: "/flags/en.png" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <div className="relative">
      {/* Language button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600"
      >
        <Image
          src={currentLanguage.flag}
          alt={currentLanguage.code}
          width={20}
          height={14}
          className="rounded-sm shadow"
        />
        <span>{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 w-44 bg-gray-800 rounded-lg shadow-lg z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`flex items-center space-x-2 px-4 py-2 w-full text-left text-gray-100 hover:bg-gray-700 ${
                lang.code === locale ? "bg-gray-600" : ""
              }`}
            >
              <Image
                src={lang.flag}
                alt={lang.code}
                width={20}
                height={14}
                className="rounded-sm shadow"
              />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
