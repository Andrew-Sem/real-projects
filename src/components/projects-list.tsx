"use client";
import { type Project, type User } from "@prisma/client";
import { ProjectCard } from "./project-card";
import { api } from "@/trpc/react";

export type ProjectWithMembers = Project & { members: User[] };

export const ProjectsList = ({
  initialProjects,
}: {
  initialProjects: ProjectWithMembers[];
}) => {
  const { data: projects } = api.project.getAllByUser.useQuery(undefined, {
    initialData: initialProjects,
  });
  if (!projects.length) return <div>Здесь пока пусто</div>;
  return (
    <div className="my-4 grid grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
};
