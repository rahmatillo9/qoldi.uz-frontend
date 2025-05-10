
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
import { getTranslations } from 'next-intl/server';


// export async function generateMetadata() {
//   const t = await getTranslations("Metadata");

//   return {
//     title: t("title"),
//     description: t("description"),
//     icons: {
//       icon: [
//         { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
//         { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
//       ],
//     },
//     openGraph: {
//       title: t("title"),
//       description: t("description"),
//       url: "https://marketplace.xai.uz",
//       siteName: "Online Marketplace",
//       images: [
//         {
//           url: "/banner.png", // 1200x630px rasm qo‘shing
//           width: 1200,
//           height: 630,
//           alt: "Online Marketplace banner",
//         },
//       ],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: t("title"),
//       description: t("description"),
//       images: ["/banner.png"],
//     },
//     manifest: "/manifest.json",
//   };
// }

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-background text-foreground justify-between">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale}>
            <MarketPlaceNavbar />
  
            <main className="flex-1">
              <SkyDecorations/>
              {children}
            </main>
  
            <Footer />
            <ThemeSwitch />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
  
}