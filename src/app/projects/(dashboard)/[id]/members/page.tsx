import { CopyInviteLink } from "@/components/copy-invite-link";
import { membersColumns } from "@/components/members/columns";
import { MembersDataTable } from "@/components/members/data-table";
import { api } from "@/trpc/server";

export default async function MembersPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await api.project.getById({ id: params.id });
  await api.project.canEditRole({ id: params.id });
  if (!project) return <div>Не удалось найти проект</div>;
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        <h2 className="text-2xl font-semibold">Ссылка приглашение</h2>
        <div>
          <CopyInviteLink inviteLinkId={project.inviteLinkId} />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Участники</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Управляйте ролями здесь
        </p>
        <MembersDataTable data={project.members} columns={membersColumns} />
      </div>
    </div>
  );
}
