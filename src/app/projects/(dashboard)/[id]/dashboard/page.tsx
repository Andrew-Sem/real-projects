import { api } from "@/trpc/server";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await api.project.getById({ id: params.id });
  return <div>Страница проекта</div>;
}
