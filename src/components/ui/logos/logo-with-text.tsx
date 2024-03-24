import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export const LogoWithText = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Logo className={cn("h-8 w-8", className)} />
      <div className="inline-block text-xl font-bold sm:text-2xl">
        Реальные проекты
      </div>
    </div>
  );
};
