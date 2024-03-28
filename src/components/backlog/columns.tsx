"use client";

import { TaskStatus, type Task } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const {} = api.task.create;
      const task = row.original;
      return (
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder={task.status} />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TaskStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
];
