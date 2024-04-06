import { DangerSettingsSection } from "@/components/settings/danger-settings-section";
import { TemplateSettingsSection } from "@/components/settings/template/template-settings-section";
import { api } from "@/trpc/server";

export default async function ProjectSettingsPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await api.project.getById({ id: params.id });
  if (!project) return <div>Не удалось найти проект</div>;
  const permission = await api.permission.getPermissionByProject({
    projectId: project.id,
  });

  return (
    <div className="flex flex-col gap-y-8">
      <TemplateSettingsSection projectId={project.id} />
      {(permission?.accessLevel === "owner" ||
        permission?.role === "admin") && (
        <DangerSettingsSection
          projectName={project.name}
          projectId={project.id}
        />
      )}
    </div>
  );
}
