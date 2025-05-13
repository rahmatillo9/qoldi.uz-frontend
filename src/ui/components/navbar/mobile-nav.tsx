
'use client'

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, MessageSquare, Heart, PlusCircle, User } from "lucide-react";

interface MobileNavProps {
  isAuthenticated: boolean;
  unreadCount: number;
}

export default function MobileNav({ isAuthenticated, unreadCount }: MobileNavProps) {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-t border-white/10 shadow-md md:hidden">
      <div className="flex justify-around items-center py-2">
        {/* Home (always visible) */}
        <Link
          href="/home"
          className={`flex flex-col items-center p-2 ${
            isActive("/home") ? "text-teal-400" : "text-gray-300"
          } hover:text-teal-400 transition-colors`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">{t("home")}</span>
        </Link>

        {/* Messages (only when authenticated) */}
        {isAuthenticated && (
          <Link
            href="/messages"
            className={`flex flex-col items-center p-2 relative ${
              isActive("/messages") ? "text-teal-400" : "text-gray-300"
            } hover:text-teal-400 transition-colors`}
          >
            <MessageSquare size={24} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            <span className="text-xs mt-1">{t("messages")}</span>
          </Link>
        )}

        {/* Favorites (only when authenticated) */}
        {isAuthenticated && (
          <Link
            href="/favorites"
            className={`flex flex-col items-center p-2 ${
              isActive("/favorites") ? "text-teal-400" : "text-gray-300"
            } hover:text-teal-400 transition-colors`}
          >
            <Heart size={24} />
            <span className="text-xs mt-1">{t("favorites")}</span>
          </Link>
        )}

        {/* Add Post (only when authenticated) */}
        {isAuthenticated && (
          <Link
            href="/add-product"
            className={`flex flex-col items-center p-2 ${
              isActive("/add-product") ? "text-teal-400" : "text-gray-300"
            } hover:text-teal-400 transition-colors`}
          >
            <PlusCircle size={24} />
            <span className="text-xs mt-1">{t("addProduct")}</span>
          </Link>
        )}

        {/* Profile (only when authenticated) */}
        {isAuthenticated && (
          <Link
            href="/profile"
            className={`flex flex-col items-center p-2 ${
              isActive("/profile") ? "text-teal-400" : "text-gray-300"
            } hover:text-teal-400 transition-colors`}
          >
            <User size={24} />
            <span className="text-xs mt-1">{t("profile")}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
