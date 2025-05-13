'use client';

import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function InstallPrompt() {
  const t = useTranslations('InstallPrompt');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-600 dark:to-green-800 p-4 rounded-lg shadow-lg flex items-center space-x-4 max-w-sm w-full sm:max-w-md animate-fadeIn">
      <Image
        src="/images/web-app-manifest-512x512.png"
        alt="UBOX PWA Icon"
        width={48}
        height={48}
        className="rounded-md"
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{t('installMessage')}</p>
      </div>
      <div className="flex space-x-2">
        <Button onClick={handleInstallClick} color="primary" size="sm" className="bg-white text-green-600 hover:bg-gray-100">
          {t('install')}
        </Button>
        <Button onClick={handleClose} variant="light" size="sm" className="text-white hover:text-gray-200">
          {t('close')}
        </Button>
      </div>
    </div>
  );
}
