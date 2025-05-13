
'use client'

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import API from "@/lib/axios"
import { CheckCircle, ShoppingBag } from "lucide-react"
import { Button, Input } from "@heroui/react"
import { useTranslations } from "next-intl"
import confetti from "canvas-confetti"
import BackButton from "@/ui/components/buttons/exit"
import { toast } from "sonner"

export default function VerifyEmailPage() {
  const t = useTranslations("VerifyEmailPage")
  const to = useTranslations("Toast")
  const router = useRouter()
  const buttonRef = useRef(null)
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    // Retrieve email from localStorage
    const storedEmail = localStorage.getItem("pendingVerificationEmail")
    if (!storedEmail) {
      toast.error(to("noEmailFound"))
      // If no email is found, redirect to registration
      router.push("/register")
      return
    }
    setEmail(storedEmail)
  }, [router])

  useEffect(() => {
    // If cooldown is active, decrease it every second
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#0d9488", "#2dd4bf", "#ffffff"], // teal-600, teal-300, white
      shapes: ["circle", "square"],
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await API.post("/users/confirm-email-code", { email, code })
      setSuccess(true)
      toast.success(to("emailVerified"))
      handleConfetti() // Trigger confetti on success
      // Clear the pending email from localStorage
      localStorage.removeItem("pendingVerificationEmail")
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
console.log(err);

    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      setLoading(true)
      setError("")
      await API.post("/users/send-email-code", { email })
      setResendCooldown(60) // Set cooldown to 60 seconds
    } catch (err) {
      console.log(err);
      
    } finally {
      setLoading(false)
    }
  }

  const handleLaterVerification = () => {
    if (!loading) {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <BackButton />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <ShoppingBag className="h-12 w-12 text-teal-600 dark:text-teal-300" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50">
          {t("title")}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {t("description")} <br />
          <span className="font-medium text-gray-900 dark:text-gray-100">{email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-md rounded-xl sm:px-10">
          {success ? (
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-teal-600 dark:text-teal-300" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">{t("successTitle")}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t("successDescription")}</p>
            </div>
          ) : (
            <>
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
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {t("codeLabel")}
                  </label>
                  <div className="mt-1">
                    <Input
                      id="code"
                      name="code"
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 sm:text-sm transition-colors duration-200"
                      placeholder={t("codePlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    ref={buttonRef}
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {loading ? t("verifying") : t("verifyEmail")}
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("noCode")}{" "}
                  <button
                    className="font-medium text-teal-600 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-400 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                    disabled={resendCooldown > 0 || loading}
                    onClick={handleResend}
                  >
                    {resendCooldown > 0 ? t("resendWithCooldown", { cooldown: resendCooldown }) : t("resend")}
                  </button>
                </p>
                <Button
                  onClick={handleLaterVerification}
                  disabled={loading}
                  className="mt-4 w-full backdrop-blur-md bg-black/50 border border-white/10 rounded-md px-4 py-2 text-teal-400 hover:bg-gray-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("verifyLater")}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
