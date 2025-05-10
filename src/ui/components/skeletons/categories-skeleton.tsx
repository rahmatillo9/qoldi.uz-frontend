
'use client'

import { Skeleton, Card } from "@heroui/react";

export default function CategoriesSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Skeleton className="bg-zinc-700 h-10 w-2/5 rounded-lg mb-8" isLoaded={false} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card
            key={index}
            className="backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md overflow-hidden rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
          >
            {/* Image skeleti */}
            <Skeleton className="bg-zinc-700 h-40 w-full rounded-t-lg" isLoaded={false} />
            
            <div className="p-4">
              {/* Title skeleti */}
              <Skeleton className="bg-zinc-700 h-6 w-3/4 rounded-lg" isLoaded={false} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
