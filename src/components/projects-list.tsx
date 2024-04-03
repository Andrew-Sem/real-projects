"use client";
import { type Project } from "@prisma/client";
import { ProjectCard } from "./project-card";
import { api } from "@/trpc/react";

export const ProjectsList = ({
  initialProjects,
}: {
  initialProjects: Project[];
}) => {
  const { data: projects } = api.project.getAllByUser.useQuery(undefined, {
    initialData: initialProjects,
  });
  if (!projects.length) return <div>Здесь пока пусто</div>;
  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
};
