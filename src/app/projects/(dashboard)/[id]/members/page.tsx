import { CopyInviteLink } from "@/components/copy-invite-link";
import { Input } from "@/components/ui/input";

export default async function MembersPage({}) {
  const inviteLink = "https://real-projects.vercel.app/invite/...";

  return (
    <div>
      <div className="mb-4">
        <h2 className="mb-4 text-2xl font-semibold">Ссылка приглашение</h2>
        <CopyInviteLink inviteLink={inviteLink} />
      </div>
      <Input />
    </div>
  );
}
