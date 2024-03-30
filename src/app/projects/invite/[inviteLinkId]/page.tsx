import { InviteForm } from "@/components/invite-form";
import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs";

export default async function InviteToProjectPage({
  params,
}: {
  params: { inviteLinkId: string };
}) {
  const project = await api.project.getByInviteLinkId({
    inviteLinkId: params.inviteLinkId,
  });
  const { userId } = auth();
  if (!project) return <div>Не удалось найти проект или ссылка устарела</div>;
  if (project?.members.find((member) => member.id === userId))
    return <div>Вы уже состоите в этом проекте</div>;
  return (
    <div className="container flex flex-col items-center">
      <InviteForm project={project} />
    </div>
  );
}
