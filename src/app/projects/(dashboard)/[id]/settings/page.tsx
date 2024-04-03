import { DangerSettingsSections } from "@/components/danger-settings-sections";
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

  console.log(permission);

  return (
    <div>
      {(permission?.accessLevel === "owner" ||
        permission?.role === "admin") && (
        <DangerSettingsSections
          projectName={project.name}
          projectId={project.id}
        />
      )}
    </div>
  );
}
