import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dayjs } from "@/lib/dayjs";

import Link from "next/link";

import { type ProjectWithMembers } from "./projects-list";
import { MembersPreview } from "./members/members-preview";

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
          <MembersPreview members={project.members} />
        </CardContent>
      </Card>
    </Link>
  );
};
