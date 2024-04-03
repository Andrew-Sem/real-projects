"use client";

import { type ProjectUserPermission, type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { RolesCombobox } from "./roles-combobox";
import { api } from "@/trpc/react";
import { StarIcon } from "@heroicons/react/24/solid";
// import { StarIcon } from "@heroicons/react/16/solid/StarIcon";

export const membersColumns: ColumnDef<
  User & { projectUserPermissions: ProjectUserPermission[] }
>[] = [
  {
    id: "member",
    header: "Участник",
    cell: ({ row }) => {
      const member = row.original;
      const isOwner =
        row.original.projectUserPermissions[0]?.accessLevel === "owner";
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
            <div className="flex gap-x-1">
              <span>{member.firstName}</span>
              {isOwner && (
                <StarIcon className="h-3 w-3 text-accent-foreground" />
              )}
            </div>
            <div className="text-sm text-muted-foreground">{member.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    id: "projectUserPermissions",
    header: "Роль",
    cell: ({ row }) => {
      const member = row.original;
      const role = member.projectUserPermissions[0]?.role;
      const projectId = member.projectUserPermissions[0]?.projectId;
      if (!role) return <div>Не удалось получить роль</div>;
      if (!projectId) return <div>Не удалось получить id проекта</div>;
      const { data: canEditRole } = api.project.canEditRole.useQuery({
        id: projectId,
      });
      return (
        <RolesCombobox
          initialRole={role}
          projectId={projectId}
          userId={member.id}
          canEditRole={canEditRole}
        />
      );
    },
  },
];
