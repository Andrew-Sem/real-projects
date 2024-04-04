import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

import "dayjs/locale/ru";
import { type ProjectWithMembers } from "./projects-list";
import Image from "next/image";

dayjs.extend(relativeTime);
dayjs.locale("ru");

export const ProjectCard = ({ project }: { project: ProjectWithMembers }) => {
  return (
    <Link href={`/projects/${project.id}/dashboard`}>
      <Card className="duration-150 hover:bg-muted/50">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>
            Обновлён {dayjs(project.updatedAt).fromNow()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex -space-x-2">
            {project.members.slice(0, 4).map((member) => (
              <div key={member.id} className="rounded-full bg-muted p-1">
                <Image
                  src={member.image}
                  alt={member.firstName ?? ""}
                  height={32}
                  width={32}
                  className="rounded-full "
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
