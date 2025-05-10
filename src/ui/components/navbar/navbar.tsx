
'use client'

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { MessageSquare, User, LogOut, Menu, Heart, DiamondPlus  } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../language-switcher";
import MobileMenuDrawer from "./mobile-menu-drawer";
import { useDisclosure } from "@heroui/react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/ui/components/add-product/types";
import API from "@/lib/axios";
import UBoxLogo from "../icons/fav-logo";

export default function MarketPlaceNavbar() {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0); // O'qilmagan xabarlar soni
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Autentifikatsiyani va userId ni tekshirish
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUserId(decoded.id);
      } catch (err) {
        console.error("Token dekod qilishda xato:", err);
      }
    } else {
      setIsAuthenticated(false);
      setUserId(null);
    }
  }, []);

  // O'qilmagan xabarlar sonini olish
  useEffect(() => {
    if (!isAuthenticated || !userId) return;

    const fetchUnreadCount = async () => {
      try {
        console.log("Fetching unread count for userId:", userId); // Debug maqsadida
        
        const response = await API.get(`/message/countUnreadMessagesForUser/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Unread count response:", response); // Debug maqsadida
        
        setUnreadCount(response.data || 0); // Agar count bo'lmasa 0
      } catch (err) {
        console.error("O'qilmagan xabarlar sonini olishda xato:", err);
      }
    };

    fetchUnreadCount();
  }, [isAuthenticated, userId]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUserId(null);
      setUnreadCount(0); // Logoutdan keyin 0 ga tushirish
      router.push("/home");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <Navbar
        shouldHideOnScroll
        className="sticky top-0 z-50 h-13 backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md"
      >
        {/* Logo */}
        <NavbarBrand onClick={() => router.push("/home")} className="flex items-center">
          <UBoxLogo /> 
          <p className="font-bold text-inherit ml-2">{t("brand")}</p>
          <h5 className="ml-4 text-red-500">beta</h5>
        </NavbarBrand>

         
        <Button
          onPress={onOpen}
          className="lg:hidden bg-transparent text-white relative"
          startContent={
            <div className="flex items-center">
              <Menu className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
          }
        />

        

        {/* Asosiy menyular (katta ekranlar uchun) */}
        <NavbarContent className="hidden lg:flex gap-4" justify="center">
          <NavbarItem isActive={isActive("/home")}>
            <Link color={isActive("/home") ? "primary" : "foreground"} href="/home">
              {t("home")}
            </Link>
          </NavbarItem>
          {isAuthenticated && (<>
            <NavbarItem isActive={isActive("/add-product")}>
              <Link color={isActive("/add-product") ? "primary" : "foreground"} href="/add-product">
             <DiamondPlus className="h-5 w-5 mr-1" />
                {t("addProduct")}
              </Link>

             
            </NavbarItem>
          </>)}
          {isAuthenticated && (
            <>
              <NavbarItem isActive={isActive("/messages")}>
                <Link color={isActive("/messages") ? "primary" : "foreground"} href="/messages">
                  <div className="flex items-center relative">
                    <MessageSquare className="h-5 w-5 mr-1" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                    {t("messages")}
                  </div>
                </Link>
              </NavbarItem>
              <NavbarItem isActive={isActive("/favorites")}>
                <Link color={isActive("/favorites") ? "primary" : "foreground"} href="/favorites">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-1" />
                    {t("favorites")}
                  </div>
                </Link>
              </NavbarItem>
              <NavbarItem isActive={isActive("/profile")}>
                <Link color={isActive("/profile") ? "primary" : "foreground"} href="/profile">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-1" />
                    {t("profile")}
                  </div>
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        {/* Language Switcher (katta ekranlar uchun) */}
        <div className="hidden lg:block">
          <LanguageSwitcher />
        </div>

        {/* Login/Logout (katta ekranlar uchun) */}
        <NavbarContent className="hidden lg:flex" justify="end">
          {!isAuthenticated ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/login">{t("login")}</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color="primary" href="/register" variant="flat">
                  {t("signUp")}
                </Button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>
              <Button
                onClick={handleLogout}
                variant="light"
                startContent={<LogOut className="h-5 w-5" />}
              >
                {t("logout")}
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>

        {/* Yon panel (kichik ekranlar uchun) */}
        <MobileMenuDrawer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          unreadCount={unreadCount} // O'qilmagan xabarlar sonini yuboramiz
        />
      </Navbar>
    </>
  );
}
