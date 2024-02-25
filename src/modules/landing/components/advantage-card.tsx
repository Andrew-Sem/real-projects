import { Advantage } from "../types";

export const AdvantageCard = ({ title, description, Icon }: Advantage) => {
	return (
		<div className="p-4 flex flex-col gap-y-1">
			<Icon className="h-7 w-7 text-sky-400" />
			<div className="font-bold text-lg">{title}</div>
			<p className="text-muted-foreground">{description}</p>
		</div>
	);
};
