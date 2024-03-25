"use client";
import {
  CalendarIcon,
  ChevronUpDownIcon,
  Cog6ToothIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Separator } from "@/components/ui/separator";
import type { ReactElement } from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";
import { type Project } from "@prisma/client";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Sidebar = ({
  project,
  latestProjects,
}: {
  project: Project;
  latestProjects: Project[];
}) => {
  return (
    <div className="relative flex min-h-full flex-col gap-4 overflow-y-auto border-r lg:w-[280px]">
      <h4 className="flex items-center justify-between px-4 pt-3 text-xl font-medium">
        {project.name}
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1">
            <ChevronUpDownIcon className="h-5 w-5 text-muted-foreground " />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[200px]">
            <DropdownMenuLabel>Недавние проекты</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {latestProjects.map((latestProject) => (
              <Link
                key={latestProject.id}
                href={`/projects/${latestProject.id}/dashboard`}
              >
                <DropdownMenuItem
                  className={
                    latestProject.id === project.id ? "bg-accent/80" : ""
                  }
                >
                  {latestProject.name}
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuSeparator />
            <Link href={"/projects"}>
              <DropdownMenuItem>Посмотреть все</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </h4>

      <div className="grow">
        <div className="flex flex-col font-medium">
          <MenuItem
            icon={<UsersIcon className="h-4 w-4" />}
            title="Участники"
            href={`/projects/${project.id}/members`}
          />
          <MenuItem
            icon={<Cog6ToothIcon className="h-4 w-4" />}
            title="Настройки пространства"
            href={`/projects/${project.id}/settings`}
          />
        </div>
        <div className="px-4 py-2">
          <Separator />
        </div>
        <div className="flex flex-col font-medium">
          <MenuItem
            icon={<Squares2X2Icon className="h-4 w-4" />}
            title="Дэшбоард"
            href={`/projects/${project.id}/dashboard`}
          />
          <MenuItem
            icon={<RectangleStackIcon className="h-4 w-4" />}
            title="Бэклог"
            href={`/projects/${project.id}/backlog`}
          />
          <MenuItem
            icon={<CalendarIcon className="h-4 w-4" />}
            title="Календарь"
            href={`/projects/${project.id}/calendar`}
          />
        </div>
      </div>
      <div className="sticky bottom-0 flex w-full items-center justify-between bg-background px-4 py-2 text-sm">
        <div>
          <span className="text-muted-foreground">
            © {new Date().getFullYear()}&nbsp;
          </span>
          <span>Andrew-Sem</span>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};

const MenuItem = ({
  icon,
  title,
  href,
}: {
  icon: ReactElement;
  title: string;
  href: string;
}) => {
  const pathname = usePathname();
  const activeStyles =
    pathname === href ? "bg-accent/80 text-accent-foreground/80" : "";
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex cursor-pointer items-center gap-3 px-4 py-2 text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground",
          activeStyles,
        )}
      >
        {icon}
        <span>{title}</span>
      </div>
    </Link>
  );
};
