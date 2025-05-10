
'use client'

import { Skeleton, Card } from "@heroui/react";

export default function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Info skeleti */}
      <Card className="w-full backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar skeleti */}
          <Skeleton className="bg-zinc-700 h-24 w-24 rounded-full" isLoaded={false} />
          
          {/* Username skeleti */}
          <Skeleton className="bg-zinc-700 h-6 w-2/5 rounded-lg" isLoaded={false} />
          
          {/* Bio skeleti */}
          <Skeleton className="bg-zinc-700 h-4 w-3/4 rounded-lg" isLoaded={false} />
          
          {/* Edit button skeleti */}
          <Skeleton className="bg-zinc-700 h-10 w-24 rounded-lg" isLoaded={false} />
        </div>
      </Card>

      {/* User Products skeleti */}
      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="w-full backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md overflow-hidden rounded-xl p-4">
            {/* Product image skeleti */}
            <Skeleton className="bg-zinc-700 h-48 w-full rounded-lg" isLoaded={false} />
            
            <div className="relative space-y-3 mt-3">
              {/* Title skeleti */}
              <Skeleton className="bg-zinc-700 h-5 w-2/3 rounded-lg" isLoaded={false} />
              
              {/* Description skeleti */}
              <Skeleton className="bg-zinc-700 h-4 w-4/5 rounded-lg" isLoaded={false} />
              
              {/* Price skeleti */}
              <Skeleton className="bg-zinc-700 h-4 w-1/4 rounded-lg" isLoaded={false} />
              
              {/* Buttons skeleti */}
              <div className="absolute top-0 right-0 flex gap-2">
                <Skeleton className="bg-zinc-700 h-8 w-8 rounded-full" isLoaded={false} />
                <Skeleton className="bg-zinc-700 h-8 w-8 rounded-full" isLoaded={false} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
