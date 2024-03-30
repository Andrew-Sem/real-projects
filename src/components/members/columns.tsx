"use client";

import { type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const membersColumns: ColumnDef<User>[] = [
  {
    id: "member",
    header: "Участник",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <div className="flex items-center gap-x-4">
          <Image
            src={member.image}
            alt={`${member.firstName} image`}
            height={36}
            width={36}
            className="rounded-full"
          />
          <div>
            <div>{member.firstName}</div>
            <div className="text-sm text-muted-foreground">{member.email}</div>
          </div>
        </div>
      );
    },
  },
];
