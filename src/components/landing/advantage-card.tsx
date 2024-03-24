import { type Advantage } from "@/types/advantage";

export const AdvantageCard = ({ title, description, Icon }: Advantage) => {
  return (
    <div className="flex flex-col gap-y-1 p-4">
      <Icon className="h-7 w-7 text-sky-400" />
      <div className="text-lg font-bold">{title}</div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
