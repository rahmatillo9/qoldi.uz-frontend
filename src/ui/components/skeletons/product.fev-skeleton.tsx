
'use client'

import { Skeleton, Card } from "@heroui/react";

export default function ProductCardSkeleton() {
  return (
    <Card className="backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-102 hover:shadow-lg">
      {/* Image Carousel skeleti */}
      <Skeleton className="bg-zinc-700 h-48 w-full rounded-t-lg" isLoaded={false} />
      
      <div className="p-3 sm:p-4 relative">
        {/* Title va status skeleti */}
        <div className="flex justify-between items-center">
          <Skeleton className="bg-zinc-700 h-6 w-2/3 rounded-lg" isLoaded={false} />
          <div className="flex items-center">
            <Skeleton className="bg-zinc-700 h-4 w-4 rounded-full" isLoaded={false} />
            <Skeleton className="bg-zinc-700 h-4 w-12 rounded-lg" isLoaded={false} />
          </div>
        </div>
        
        {/* Description skeleti */}
        <Skeleton className="bg-zinc-700 h-4 w-4/5 rounded-lg mt-1" isLoaded={false} />
        
        {/* Avatar va username skeleti */}
        <div className="flex items-center mt-2">
          <Skeleton className="bg-zinc-700 h-6 w-6 rounded-full" isLoaded={false} />
          <Skeleton className="bg-zinc-700 h-4 w-1/3 rounded-lg ml-3" isLoaded={false} />
        </div>
        
        {/* Price skeleti */}
        <Skeleton className="bg-zinc-700 h-4 w-1/4 rounded-lg mt-2" isLoaded={false} />
        
        {/* Favorite button skeleti */}
        <Skeleton className="bg-zinc-700 h-8 w-8 rounded-full absolute top-10 right-4" isLoaded={false} />
      </div>
    </Card>
  );
}
