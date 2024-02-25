import { Clock } from "lucide-react";
import { Advantage } from "./types";
import {
	AcademicCapIcon,
	AdjustmentsVerticalIcon,
} from "@heroicons/react/24/solid";

export const advantages: Advantage[] = [
	{
		title: "Экономия времени",
		description: "Сокращайте время, затрачиваемое на повседневные задачи",
		Icon: Clock,
	},
	{
		title: "Идеально для студентов",
		description: "Шаблоны для курсовых и акселерационных проектов",
		Icon: AcademicCapIcon,
	},
	{
		title: "Гибкая настройка",
		description: "Полностью настраиваемое рабочее пространство",
		Icon: AdjustmentsVerticalIcon,
	},
];
