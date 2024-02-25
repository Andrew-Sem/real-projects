import { cn } from "@/lib/utils";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";

export const LogoWithText = ({ className }: { className?: string }) => {
	return (
		<div className="flex gap-2 items-center">
			<CubeTransparentIcon className={cn("w-8 h-8", className)} />
			<div className="inline-block text-xl sm:text-2xl font-bold">
				Реальные проекты
			</div>
		</div>
	);
};
