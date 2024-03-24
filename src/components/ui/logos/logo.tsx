import { cn } from "@/lib/utils";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";

export const Logo = ({ className }: { className?: string }) => {
  return <CubeTransparentIcon className={cn("h-8 w-8", className)} />;
};
