import { ProjectCard } from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await api.project.getAllByUser();
  return (
    <div className="">
      <h1 className="py-10 text-2xl font-semibold">Ваши проекты</h1>
      {projects.length ? (
        <div className="grid grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      ) : (
        <div>
          <div>Здесь пока пусто</div>
          <Link
            href={"/projects/create"}
            className={cn("grow sm:grow-0", buttonVariants())}
          >
            Создать проект
          </Link>
        </div>
      )}
    </div>
  );
}
