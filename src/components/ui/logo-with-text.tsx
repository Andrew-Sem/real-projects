import { CubeTransparentIcon } from "@heroicons/react/24/solid";

export const Logo = () => {
	return (
		<div className="flex gap-2 items-center">
			<CubeTransparentIcon className="w-8 h-8" />
			<div className=" inline-block text-xl sm:text-2xl font-bold">
				Реальные проекты
			</div>
		</div>
	);
};
