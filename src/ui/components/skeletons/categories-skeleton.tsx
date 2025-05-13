
'use client'

import { Skeleton, Card } from "@heroui/react";

export default function CategoriesSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Skeleton className="bg-zinc-700 h-10 w-2/5 rounded-lg mb-6" isLoaded={false} />
      <div className="flex flex-nowrap gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900 pb-4 max-h-[16rem] overflow-y-hidden">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card
            key={index}
            className="flex-none w-24 h-32 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer flex flex-col items-center justify-center p-2"
          >
            {/* Image skeleti */}
            <Skeleton className="bg-zinc-700 w-16 h-16 rounded-full mb-2" isLoaded={false} />
            
            {/* Title skeleti */}
            <Skeleton className="bg-zinc-700 h-4 w-3/4 rounded-lg" isLoaded={false} />
          </Card>
        ))}
      </div>
    </div>
  );
}
