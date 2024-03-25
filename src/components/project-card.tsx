import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Project } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

import "dayjs/locale/ru";

dayjs.extend(relativeTime);
dayjs.locale("ru");

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={`/projects/${project.id}/dashboard`}>
      <Card className="duration-150 hover:bg-muted/50">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>
            Обновлён {dayjs(project.updatedAt).fromNow()}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
