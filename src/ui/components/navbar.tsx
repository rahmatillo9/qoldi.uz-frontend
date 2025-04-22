"use client"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react"
import { ShoppingBag, ShoppingCart, User, LogOut } from "lucide-react"
import { useTranslations } from "next-intl"

export const MarketplaceLogo = () => {
  return <ShoppingBag className="h-8 w-8 text-inherit" />
}

export default function MarketPlaceNavbar() {
  const t = useTranslations("Navbar")
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)

    // Get cart count from localStorage or API
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.length)
  }, [])

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token")
      setIsAuthenticated(false)
      router.push("/")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  const isActive = (path: string) => pathname === path

  return (
<Navbar
  shouldHideOnScroll
  className="sticky top-0 z-50 h-13 backdrop-blur-md bg-black/30 border-b  border-white/10 shadow-md"
>

      <NavbarBrand>
        <MarketplaceLogo />
        <p className="font-bold text-inherit">{t("brand")}</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isActive("/")}>
          <Link color={isActive("/") ? "primary" : "foreground"} href="/">
            {t("home")}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive("/cart")}>
          <Link color={isActive("/cart") ? "primary" : "foreground"} href="/cart">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-1" />
              {t("cart")}
              {cartCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        </NavbarItem>
        {isAuthenticated && (
          <NavbarItem isActive={isActive("/profile")}>
            <Link color={isActive("/profile") ? "primary" : "foreground"} href="/profile">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-1" />
                {t("profile")}
              </div>
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
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
            <Button onClick={handleLogout} variant="light" startContent={<LogOut className="h-5 w-5" />}>
              {t("logout")}
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  )
}
