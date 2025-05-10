'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SkyDecorations() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
  }));

  return (
    <div className="sky-decorations fixed inset-0 pointer-events-none -z-10">
      {isDark ? (
        <>
          {/* Oy */}
          <div
            className="moon"
            style={{
              position: 'absolute',
              top: '10%',
              left: '80%',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#fdf6e3',
              boxShadow: '0 0 30px #fdf6e3',
            }}
          />
          {/* Yulduzlar */}
          {stars.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                position: 'absolute',
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                borderRadius: '9999px',
                backgroundColor: 'white',
                opacity: 0.8,
                animation: 'twinkle 2s ease-in-out infinite',
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </>
      ) : (
        <>
          {/* Quyosh */}
          <div
            className="sun"
            style={{
              position: 'absolute',
              top: '10%',
              left: '80%',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#FFD700',
              boxShadow: '0 0 40px #FFD700',
            }}
          />
          {/* Bulutlar */}
          <div
            className="cloud cloud-1"
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: '120px',
              height: '60px',
              backgroundColor: '#ffffff',
              borderRadius: '60px',
              boxShadow: '60px 0 #ffffff, 30px 10px #ffffff',
              opacity: 0.8,
            }}
          />
          <div
            className="cloud cloud-2"
            style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              width: '100px',
              height: '50px',
              backgroundColor: '#ffffff',
              borderRadius: '50px',
              boxShadow: '40px 0 #ffffff, 20px 10px #ffffff',
              opacity: 0.8,
            }}
          />
        </>
      )}
    </div>
  );
}
