"use client";

import { type ProjectUserPermission, type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { RolesCombobox } from "./roles-combobox";
import { api } from "@/trpc/react";

export const membersColumns: ColumnDef<
  User & { projectUserPermissions: ProjectUserPermission[] }
>[] = [
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
