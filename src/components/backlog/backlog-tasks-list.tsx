"use client";

import { type Task } from "@prisma/client";
import { BacklogTask } from "./backlog-task";
import { api } from "@/trpc/react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";

export const BacklogTasksList = ({
  initialTasks,
  projectId,
}: {
  initialTasks: Task[];
  projectId: string;
}) => {
  const { data: tasks } = api.task.getAllByProjectId.useQuery(
    { projectId },
    { initialData: initialTasks },
  );
  return (
    <div className="flex grow flex-col rounded-lg border p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium">Задачи</h2>
          <p className="text-sm text-muted-foreground">
            Количество: {tasks.length}
          </p>
        </div>
        <Input className="w-96" placeholder="Поиск задач" />
      </div>
      {tasks.length ? (
        <ScrollArea className="max-h-96">
          <div className="divide-y">
            {tasks.map((task) => (
              <BacklogTask key={task.id} task={task} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="py-10 text-center">
          Здесь пока пусто. Создайте новую задачу
        </div>
      )}
    </div>
  );
};
