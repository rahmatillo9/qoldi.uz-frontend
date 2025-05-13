"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import API from "@/lib/axios"
import { ArrowRight } from "lucide-react"
import { Button, Input } from "@heroui/react"
import { useTranslations } from "next-intl"
import confetti from "canvas-confetti"
import RBLogo from "@/ui/components/icons/logo"
import BackButton from "@/ui/components/buttons/exit"
import { toast } from "sonner"

export default function LoginPage() {
  const t = useTranslations("LoginPage")
  const to = useTranslations("Toast")
  const router = useRouter()
  const buttonRef = useRef(null)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#0d9488", "#2dd4bf", "#ffffff"], // teal-600, teal-300, white
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const isEmail = identifier.includes("@")
    const loginData = {
      password,
      ...(isEmail ? { email: identifier } : { username: identifier }),
    }

    try {
      const response = await API.post("/auth/login", loginData)
      localStorage.setItem("token", response.data.access_token)
      localStorage.removeItem("pendingVerificationEmail")
      // Trigger confetti on successful login
      handleConfetti()
      toast.success(to("success"))
      router.replace("/profile")
    } catch (err ) {
      console.log(err);
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen   flex flex-col justify-center py-12 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between mb-6">
            <BackButton/>
            </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <RBLogo/>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold ">
          {t("title")}
        </h2>
        <p className="mt-2 text-center text-sm ">
          {t("noAccount")}{" "}
          <Link href="/register" className="font-medium text-teal-600 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-400">
            {t("createAccount")}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="backdrop-blur-md bg-black/30 border-b border-white/10  py-8 px-4 shadow-md rounded-xl sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 p-4 rounded-md">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-600 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {t("identifierLabel")}
              </label>
              <div className="mt-1">
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 sm:text-sm transition-colors duration-200"
                  placeholder={t("identifierPlaceholder")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {t("passwordLabel")}
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 sm:text-sm transition-colors duration-200"
                  placeholder={t("passwordPlaceholder")}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 dark:text-teal-300 focus:ring-teal-500 dark:focus:ring-teal-400 border-gray-300 dark:border-gray-700 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                  {t("rememberMe")}
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-teal-600 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-400">
                  {t("forgotPassword")}
                </Link>
              </div>
            </div>

            <div>
              <Button
                ref={buttonRef}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? t("signingIn") : t("signIn")}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  {t("continueWith")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}