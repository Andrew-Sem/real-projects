"use client";

import { TaskStatus, type User, type Task } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { api } from "@/trpc/react";
import { Badge } from "../ui/badge";
import { dayjs } from "@/lib/dayjs";
import { MembersPreview } from "../members/members-preview";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";

type TaskWithAssignee = Task & { assignee: User[] };

export const columns: ColumnDef<TaskWithAssignee>[] = [
  {
    id: "name",
    header: "Название",
    cell: ({ row }) => {
      const task = row.original;
      return (
        <div className="relative flex items-center">
          {task.name}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="absolute right-0 hidden gap-x-1 group-hover:flex"
              >
                <span className="sr-only">Open task</span>
                <span>Развернуть</span>
                <ArrowsPointingOutIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="flex h-[80vh] w-full max-w-2xl flex-col">
              <DialogHeader>
                <DialogTitle>{task.name}</DialogTitle>
                <DialogDescription>{task.description}</DialogDescription>
                {task.due && (
                  <div>
                    <Badge
                      variant={
                        Date.now() > task.due.getTime()
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {dayjs(task.due).format("DD MMM")}
                    </Badge>
                  </div>
                )}
              </DialogHeader>
              <div className="flex flex-grow flex-col">
                <div>{task.status}</div>
                {task.assignee.length > 0 ? (
                  <MembersPreview members={task.assignee} />
                ) : (
                  <div className="flex items-center gap-x-2">
                    <span>К задаче никто не прикреплён.</span>
                    <Button variant={"secondary"} className="gap-x-1">
                      Прикрепить
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
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
