
'use client'

import { Skeleton, Card } from "@heroui/react";

export default function ProductCardSkeleton() {
  return (
    <Card className="w-full backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md overflow-hidden rounded-xl p-4">
      {/* Image Carousel skeleti */}
      <Skeleton className="h-48 w-full rounded-lg  bg-zinc-700" isLoaded={false} />

      <div className="relative space-y-3 mt-3">
        {/* Sarlavha va Status skeleti */}
        <div className="flex justify-between items-center ">
          <Skeleton className="  bg-zinc-700 h-5 w-2/3 rounded-lg" isLoaded={false} />
          <div className="flex items-center gap-2">
            <Skeleton className="  bg-zinc-700 h-4 w-4 rounded-full" isLoaded={false} />
            <Skeleton className="  bg-zinc-700 h-4 w-12 rounded-lg" isLoaded={false} />
          </div>
        </div>

        {/* Qisqa tavsif skeleti */}
        <Skeleton className="  bg-zinc-700 h-4 w-4/5 rounded-lg" isLoaded={false} />

        {/* Foydalanuvchi avatari va username skeleti */}
        <div className="flex items-center">
          <Skeleton className="  bg-zinc-700 h-6 w-6 rounded-full" isLoaded={false} />
          <Skeleton className="  bg-zinc-700 h-4 w-1/3 rounded-lg ml-3" isLoaded={false} />
        </div>

        {/* Narx skeleti */}
        <Skeleton className="  bg-zinc-700 h-4 w-1/4 rounded-lg" isLoaded={false} />

        {/* Tugmalar skeleti */}
        {/* <div className="absolute top-0 right-0 flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" isLoaded={false} />
          <Skeleton className="h-8 w-8 rounded-full" isLoaded={false} />
        </div> */}
      </div>
    </Card>
  );
}
