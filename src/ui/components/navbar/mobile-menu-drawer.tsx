
'use client'

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Link,
  Button,
} from "@heroui/react";
import { MessageSquare, User, LogOut, Heart, DiamondPlus } from "lucide-react";
import LanguageSwitcher from "../language-switcher";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isAuthenticated: boolean;
  handleLogout: () => void;
  unreadCount: number; 
}

export default function MobileMenuDrawer({
  isOpen,
  onOpenChange,
  isAuthenticated,
  handleLogout,
  unreadCount,
}: MobileMenuDrawerProps) {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  return (
    <Drawer
      isOpen={isOpen}
      placement="left" // Ensure this is set to "right"
      onOpenChange={onOpenChange}
      className="mobile-menu-drawer"
    >
      <DrawerContent className="fixed top-0 right-0 h-96 max-w-full bg-background backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md">
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1 pt-4">
              <p className="font-bold text-xl">{t("menu")}</p>
            </DrawerHeader>
            <DrawerBody className="px-4 pb-4">
              <div className="flex flex-col gap-4">
                {/* Home (always visible) */}
                <div className="drawer-item">
                  <Link
                    color={isActive("/home") ? "primary" : "foreground"}
                    href="/home"
                    onClick={onClose}
                    className="flex items-center text-lg"
                  >
                    {t("home")}
                  </Link>
                </div>
                {isAuthenticated && (<>
            <div className="drawer-item">
              <Link color={isActive("/add-product") ? "primary" : "foreground"} href="/add-product">
             <DiamondPlus className="h-5 w-5 mr-1" />
                {t("addProduct")}
              </Link>

             
            </div>
          </>)}
                {/* Messages (only when authenticated) */}
                {isAuthenticated && (
                  <div className="drawer-item">
                    <Link
                      color={isActive("/messages") ? "primary" : "foreground"}
                      href="/messages"
                      onClick={onClose}
                      className="flex items-center text-lg"
                    >
                      <div className="flex items-center relative">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 left-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                        {t("messages")}
                      </div>
                    </Link>
                  </div>
                )}

                {isAuthenticated && (
                  <div className="drawer-item">
                    <Link
                      color={isActive("/favorites") ? "primary" : "foreground"}
                      href="/favorites"
                      onClick={onClose}
                      className="flex items-center text-lg"
                    >
                      <Heart className="h-5 w-5 mr-1" />
                      {t("favorites")}
                    </Link>
                  </div>
                )}

                {/* Profile (only when authenticated) */}
                {isAuthenticated && (
                  <div className="drawer-item">
                    <Link
                      color={isActive("/profile") ? "primary" : "foreground"}
                      href="/profile"
                      onClick={onClose}
                      className="flex items-center text-lg"
                    >
                      <User className="h-5 w-5 mr-2" />
                      {t("profile")}
                    </Link>
                  </div>
                )}

                {/* Login/SignUp (only when not authenticated) */}
                {!isAuthenticated ? (
                  <>
                    <div className="drawer-item">
                      <Link
                        href="/login"
                        onClick={onClose}
                        className="flex items-center text-lg"
                      >
                        {t("login")}
                      </Link>
                    </div>
                    <div className="drawer-item">
                      <Button
                        as={Link}
                        color="primary"
                        href="/register"
                        variant="flat"
                        onClick={onClose}
                      >
                        {t("signUp")}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="drawer-item">
                    <Button
                      onClick={() => {
                        handleLogout();
                        onClose();
                      }}
                      variant="light"
                      startContent={<LogOut className="h-5 w-5" />}
                    >
                      {t("logout")}
                    </Button>
                  </div>
                )}

                {/* Language Switcher (always visible) */}
                <div className="drawer-item">
                  <LanguageSwitcher />
                </div>
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
