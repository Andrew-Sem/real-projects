import { AdvantageCard } from "./advantage-card";
import { advantages } from "../const";

export const AdvantageCardList = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-4">
			{advantages.map((advantage) => (
				<AdvantageCard {...advantage} key={advantage.title} />
			))}
		</div>
	);
};
