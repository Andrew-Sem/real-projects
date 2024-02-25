import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export const LogoWithText = ({ className }: { className?: string }) => {
	return (
		<div className="flex gap-2 items-center">
			<Logo className={cn("w-8 h-8", className)} />
			<div className="inline-block text-xl sm:text-2xl font-bold">
				Реальные проекты
			</div>
		</div>
	);
};
