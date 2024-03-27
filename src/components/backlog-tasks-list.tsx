"use client";

import { type Task } from "@prisma/client";
import { BacklogTask } from "./backlog-task";
import { api } from "@/trpc/react";
import { Separator } from "./ui/separator";
import { CreateTaskButton } from "./create-task-button";

export const BacklogTasksList = ({
  initialTasks,
  backlogId,
}: {
  initialTasks: Task[];
  backlogId: string;
}) => {
  const { data: tasks } = api.task.getAllByBacklogId.useQuery(
    { backlogId },
    { initialData: initialTasks },
  );
  return (
    <div className="flex grow flex-col rounded-lg border">
      <div className="flex items-center justify-between bg-muted p-4">
        <h2 className="text-xl font-medium">Задачи</h2>
        <CreateTaskButton backlogId={backlogId} />
      </div>
      <Separator />
      {tasks.length ? (
        <div className="divide-y">
          {tasks.map((task) => (
            <BacklogTask key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div>Здесь пока пусто</div>
      )}
    </div>
  );
};
