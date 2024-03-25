import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const project = await api.project.getById({ id: params.id });
  if (!project) return <div>Не удалось найти проект</div>;
  if (!project.users.includes(userId))
    return <div>У вас нет доступа к этому проекту</div>;
  return <div>{project?.name}</div>;
}
