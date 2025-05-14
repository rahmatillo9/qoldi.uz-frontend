'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ServerError() {
  const t = useTranslations('Error');
  const router = useRouter();

  useEffect(() => {
    document.title = `${t('title')} - UBOX PWA`;
  }, [t]);

  const handleRetry = () => {
    router.refresh(); // Sahifani qayta yuklaydi
  };

  return (
    <div className="min-h-screen flex items-center justify-center backdrop-blur-md bg-black/30 border-b border-white/10 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <Image
          src="/images/web-app-manifest-512x512.png"
          alt="UBOX Logo"
          width={120}
          height={120}
          className="mx-auto mb-4 rounded-full border-4 border-red-500 shadow-lg"
        />
        <h1 className="text-5xl font-extrabold text-red-500 drop-shadow-md">
          {t('title')}
        </h1>
        <p className="text-lg ">
          {t('message')}
        </p>
        <p className="text-sm  italic">
          {t('reason')}
        </p>
        <p className="text-sm italic">
          {t('thanks')}
        </p>

        {/* Tamirlash tugmasi */}
        <button
          onClick={handleRetry}
          className="mt-4 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition  font-bold shadow-lg"
        >
          🔧 {t('repair') || 'Tamirlash'}
        </button>
      </div>
    </div>
  );
}
