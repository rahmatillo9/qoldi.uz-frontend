// components/ThemeSwitch.tsx
'use client';

import { FC, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { cn } from '@/utils';
import { useTranslations } from 'next-intl';
import { ComputerIcon, MoonIcon, SunIcon } from './icons';

export interface ThemeSwitchProps {
  className?: string;
  type?: 'fixed' | 'chip';
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ type = 'fixed', className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('ThemeSwitch'); // Tarjimalar uchun

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (type === 'fixed') {
    return (
      <div className={cn('fixed bottom-28 lg:bottom-5 right-5 z-50', className)}>
        <button
          onClick={toggleTheme}
          className="rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label={theme === 'light' ? t('switchToDark') : t('switchToLight')}
        >
          {theme === 'light' ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-fit items-center rounded-2xl bg-gray-800 p-1 ">
      <div className={cn('rounded-2xl', theme === 'dark' ? 'bg-gray-900' : 'bg-transparent')}>
        <button
          onClick={() => setTheme('dark')}
          className={cn(
            'rounded-2xl p-2 text-white hover:bg-gray-700',
            theme === 'dark' && 'bg-gray-900'
          )}
          aria-label={t('dark')}
        >
          <MoonIcon className="h-5 w-5" />
        </button>
      </div>
      <div className={cn('rounded-2xl', theme === 'light' ? 'bg-gray-900' : 'bg-transparent')}>
        <button
          onClick={() => setTheme('light')}
          className={cn(
            'rounded-2xl p-2 text-white hover:bg-gray-700',
            theme === 'light' && 'bg-gray-900'
          )}
          aria-label={t('light')}
        >
          <SunIcon className="h-5 w-5" />
        </button>
      </div>
      <div className={cn('rounded-2xl', theme === 'system' ? 'bg-gray-900' : 'bg-transparent')}>
        <button
          onClick={() => setTheme('system')}
          className={cn(
            'rounded-2xl p-2 text-white hover:bg-gray-700',
            theme === 'system' && 'bg-gray-900'
          )}
          aria-label={t('system')}
        >
          <ComputerIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitch;