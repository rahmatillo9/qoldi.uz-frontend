
'use client'

import { Skeleton, Card } from "@heroui/react";

export default function MessagesSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sarlavha skeleti */}
      <Skeleton className="h-10 w-1/4 rounded-lg mb-6" isLoaded={false} />
      
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            key={index}
            className="p-4 backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 cursor-pointer">
                {/* Avatar skeleti */}
                <Skeleton className="bg-zinc-700 h-12 w-12 rounded-full" isLoaded={false} />
                
                <div className="ml-4 flex-1 space-y-1">
                  {/* Username va unread count skeleti */}
                  <div className="flex justify-between items-center">
                    <Skeleton className="bg-zinc-700 h-6 w-1/3 rounded-lg" isLoaded={false} />
                    <Skeleton className="bg-zinc-700 h-5 w-5 rounded-full" isLoaded={false} />
                  </div>
                  
                  {/* Product ID skeleti */}
                  <Skeleton className="bg-zinc-700 h-4 w-1/4 rounded-lg" isLoaded={false} />
                  
                  {/* Date skeleti */}
                  <Skeleton className="bg-zinc-700 h-3 w-1/5 rounded-lg" isLoaded={false} />
                </div>
              </div>
              
              {/* Delete button skeleti */}
              <Skeleton className="bg-zinc-700 h-8 w-8 rounded-full" isLoaded={false} />
            </div>
            
            {/* Accordion skeleti */}
            <div className="mt-2">
              <Skeleton className="bg-zinc-700 h-8 w-1/3 rounded-lg mb-2" isLoaded={false} />
              <div className="bg-gray-900/50 rounded-md border border-gray-700 p-3 space-y-2">
                {/* Product title skeleti */}
                <Skeleton className="bg-zinc-700 h-6 w-2/3 rounded-lg" isLoaded={false} />
                
                {/* Description skeleti */}
                <Skeleton className="bg-zinc-700 h-4 w-4/5 rounded-lg" isLoaded={false} />
                
                {/* Price and status skeleti */}
                <div className="flex items-center gap-4">
                  <Skeleton className="bg-zinc-700 h-4 w-1/4 rounded-lg" isLoaded={false} />
                  <Skeleton className="bg-zinc-700 h-4 w-1/4 rounded-lg" isLoaded={false} />
                </div>
                
                {/* Image skeleti */}
                <Skeleton className="bg-zinc-700 h-32 w-32 rounded-md" isLoaded={false} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
