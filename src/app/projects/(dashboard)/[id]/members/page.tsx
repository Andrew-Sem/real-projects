import { CopyInviteLink } from "@/components/copy-invite-link";
import { api } from "@/trpc/server";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

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
        <h1 className="py-4 text-2xl font-semibold">Участники</h1>
        <div>
          {project.members.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 py-2">
              <Image
                src={member.image}
                alt={`${member.firstName} image`}
                height={40}
                width={40}
                className="rounded-full"
              />
              <div>
                <div className="flex gap-x-1">
                  <span>{member.firstName}</span>
                  {project.ownerId === member.id && (
                    <StarIcon className="h-3 w-3" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {member.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
