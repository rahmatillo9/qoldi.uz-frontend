
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


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'ru' | 'uz')) {
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