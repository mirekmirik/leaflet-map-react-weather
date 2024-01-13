import React from "react";

import { cn } from "src/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export const SkeletonCity = () => {
  return <Skeleton className="h-4 my-2" />;
};

export const SkeletonWeather = () => {
  return <Skeleton />;
};
