'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button } from "@heroui/react";
import { Search } from "lucide-react";

export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const t = useTranslations("SearchPage");
  const [title, setTitle] = useState(defaultValue);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // URL query o'zgarsa inputni yangilab turadi
    const paramTitle = searchParams.get("title") || "";
    setTitle(paramTitle);
  }, [searchParams]);

  const handleSearch = () => {
    const trimmed = title.trim();
    const url = trimmed ? `/search?title=${encodeURIComponent(trimmed)}` : `/search`;
    router.push(url);
  };

  return (
    <div className="p-2 rounded-lg border backdrop-blur-md bg-black/30 border-white/10 shadow-md">
      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-md focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-4 py-2 rounded-md transition-colors"
        >
          {t("search")}
        </Button>
      </div>
    </div>
  );
}
