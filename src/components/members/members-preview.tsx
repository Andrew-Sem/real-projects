import { type User } from "@prisma/client";
import Image from "next/image";

export const MembersPreview = ({ members }: { members: User[] }) => {
  return (
    <div className="flex -space-x-2">
      {members.slice(0, 4).map((member) => (
        <div key={member.id} className="rounded-full bg-muted p-1">
          <Image
            src={member.image}
            alt={member.firstName ?? ""}
            height={32}
            width={32}
            className="rounded-full "
          />
        </div>
      ))}
    </div>
  );
};
