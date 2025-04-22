'use client'
import { useState } from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number; // px birligida
  bordered?: boolean;
  fallbackText?: string; // Masalan, user.username.charAt(0).toUpperCase()
}

export default function Avatar({
  src,
  alt = "User avatar",
  size = 40,
  bordered = true,
  fallbackText = "?",
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`rounded-full overflow-hidden flex-shrink-0 ${
        bordered ? "ring-2 ring-primary" : ""
      }`}
      style={{ width: size, height: size }}
    >
      {!hasError ? (
        <img
          draggable="false"
          src={src || "/default-avatar.jpg"}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          className="w-full h-full bg-gray-600 flex items-center justify-center text-white font-semibold"
          style={{ fontSize: size * 0.5 }}
        >
          {fallbackText}
        </div>
      )}
    </div>
  );
}
