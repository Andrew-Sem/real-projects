import { DangerSettingsSections } from "@/components/danger-settings-sections";
import { api } from "@/trpc/server";

export default async function ProjectSettingsPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await api.project.getById({ id: params.id });
  if (!project) return <div>Не удалось найти проект</div>;
  return (
    <div>
      <DangerSettingsSections
        projectName={project.name}
        projectId={project.id}
      />
    </div>
  );
}
