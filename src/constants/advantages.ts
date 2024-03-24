import { Clock, GraduationCap, SlidersVertical } from "lucide-react";
import { type Advantage } from "@/types/advantage";

export const advantages: Advantage[] = [
  {
    title: "Экономия времени",
    description: "Сокращайте время, затрачиваемое на повседневные задачи",
    Icon: Clock,
  },
  {
    title: "Идеально для студентов",
    description: "Шаблоны для курсовых и акселерационных проектов",
    Icon: GraduationCap,
  },
  {
    title: "Гибкая настройка",
    description: "Полностью настраиваемое рабочее пространство",
    Icon: SlidersVertical,
  },
];
