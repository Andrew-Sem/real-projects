import { cn } from "@/shared/lib/utils";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";

export const Logo = ({ className }: { className?: string }) => {
	return <CubeTransparentIcon className={cn("w-8 h-8", className)} />;
};
