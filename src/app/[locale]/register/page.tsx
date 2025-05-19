
'use client';

import type React from 'react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import API from '@/lib/axios';
import { ArrowRight } from 'lucide-react';
import { Button, Input, Checkbox } from '@heroui/react';
import { useTranslations } from 'next-intl';
import confetti from 'canvas-confetti';
import RBLogo from '@/ui/components/icons/logo';
import BackButton from '@/ui/components/buttons/exit';
import { toast } from 'sonner';

export default function RegisterPage() {
  const t = useTranslations('RegisterPage');
  const to = useTranslations('Toast');
  const router = useRouter();
  const buttonRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [skipEmail, setSkipEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Only include email if not skipping
      const registrationData = skipEmail
        ? { username: formData.username, password: formData.password }
        : formData;

      // Register the user
      await API.post('/users', registrationData);

      toast.success(to('registrationSuccess'));
      handleConfetti();
      router.push('/login');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage =
        (err as { response?: { data?: { message?: string } } }).response?.data?.message || t('errorMessage');
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <BackButton />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <RBLogo />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold">{t('title')}</h2>
        <p className="mt-2 text-center text-sm">
          {t('alreadyHaveAccount')}{' '}
          <Link
            href="/login"
            className="font-medium text-teal-600 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-400"
          >
            {t('signIn')}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="backdrop-blur-md bg-black/30 border-b border-white/10 py-8 px-4 shadow-md rounded-xl sm:px-10">
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
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {t('usernameLabel')}
              </label>
              <div className="mt-1">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 sm:text-sm transition-colors duration-200"
                  placeholder={t('usernamePlaceholder')}
                />
              </div>
            </div>

            {!skipEmail && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t('emailLabel')}
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required={!skipEmail}
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 sm:text-sm transition-colors duration-200"
                    placeholder={t('emailPlaceholder')}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {t('passwordLabel')}
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 sm:text-sm transition-colors duration-200"
                  placeholder={t('passwordPlaceholder')}
                />
              </div>
            </div>

            <div className="flex items-center">
              <Checkbox
                id="skipEmail"
                checked={skipEmail}
                onChange={(e) => setSkipEmail(e.target.checked)}
                className="h-4 w-4 text-teal-600 dark:text-teal-400 border-gray-300 dark:border-gray-700 rounded focus:ring-teal-500 dark:focus:ring-teal-400"
              />
              <label htmlFor="skipEmail" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                {t('skipEmail')}
              </label>
            </div>

            <div>
              <Button
                ref={buttonRef}
                type="submit"
                disabled={loading || (!skipEmail && !formData.email)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? t('creatingAccount') : t('createAccount')}
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
                  {t('termsAndPrivacy')}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <Link href="/terms">
                  <Button
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    {t('termsOfService')}
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/privacy">
                  <Button
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    {t('privacyPolicy')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
