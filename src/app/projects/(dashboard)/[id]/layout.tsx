import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { api } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const user = await currentUser();
  const project = await api.project.getById({ id: params.id });
  if (!user) return redirect("/sign-in");
  if (!project?.users.find((projectUser) => projectUser.id === user?.id))
    return <div>У вас нет доступа к этому проекту</div>;
  const latestProjects = await api.project.getLatestProjects();
  return (
    <div className="flex h-screen flex-col">
      <Header userImage={user.imageUrl} />
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar project={project} latestProjects={latestProjects} />
        <div className="flex-1 overflow-y-auto px-4">{children}</div>
      </div>
    </div>
  );
}
