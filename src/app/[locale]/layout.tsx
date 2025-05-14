
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { routing } from '@/i18n/routing';
import '@/styles/globals.css';
import ThemeSwitch from '@/ui/components/theme-switch';
import MarketPlaceNavbar from '@/ui/components/navbar/navbar';
import 'leaflet/dist/leaflet.css';
import Footer from '@/ui/components/footer';
import SkyDecorations from '@/ui/components/sky-decorations ';
import { Toaster } from 'sonner';
import InstallPrompt from '@/ui/components/instal-pwa';

// Service Worker uchun tip aniqlash (foydalanilmaydi, lekin saqlab qo‘yish uchun)
declare global {
  interface Window {
    registerServiceWorker?: () => void;
  }
}

export const metadata = {
  title: "UBOX",
  description: "Bu Next.js asosida qurilgan PWA dastur - UBOX Marketplace",
  icons: {
    icon: [
      { url: "/images/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "UBOX PWA",
    description: "UBOX Marketplace - Next.js asosida qurilgan PWA dastur bilan tanishing!",
    url: "https://ubox.butcher4.uz", // O‘zingizning domeningizni qo‘shing
    siteName: "UBOX PWA",
    images: [
      {
        url: "/images/screenshot1.png", // 1250x640px rasm ishlatiladi
        width: 1280,
        height: 645,
        alt: "UBOX PWA banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UBOX PWA",
    description: "UBOX Marketplace - Next.js asosida qurilgan PWA dastur bilan tanishing!",
    images: ["/images/web-app-manifest-512x512.png"],
  },
  manifest: "/manifest.json",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Locale tekshiruvi
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'ru' | 'uz')) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-background text-foreground justify-between">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale}>
            <MarketPlaceNavbar />
            <main className="flex-1">
              <SkyDecorations />
              {children}
            </main>
            <div className="md:mb-0 mb-[80px]">
              <Footer />
            </div>
            <ThemeSwitch />
            <Toaster position="top-right" />
            <InstallPrompt /> {/* PWA o‘rnatish prompt’i */}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
