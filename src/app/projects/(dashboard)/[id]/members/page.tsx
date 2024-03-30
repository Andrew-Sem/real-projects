import { CopyInviteLink } from "@/components/copy-invite-link";
import { api } from "@/trpc/server";

export default async function MembersPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await api.project.getById({ id: params.id });
  if (!project) return <div>Не удалось найти проект</div>;

  return (
    <div>
      <div className="mb-4">
        <h2 className="mb-4 text-2xl font-semibold">Ссылка приглашение</h2>
        <CopyInviteLink inviteLinkId={project.inviteLinkId} />
      </div>
    </div>
  );
}
