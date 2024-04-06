import { api } from "@/trpc/server";

import { TRPCClientError } from "@trpc/client";
import { DataTable } from "@/components/backlog/data-table";
import { columns } from "@/components/backlog/columns";
import { CreateTaskButton } from "@/components/create-task-button";
import { BacklogTasksList } from "@/components/backlog/backlog-tasks-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function BacklogPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await api.project.getById({ id: params.id });
  if (!project) throw new TRPCClientError("Unable to get project");
  return (
    <div className="flex w-full flex-col gap-y-4">
      <Tabs defaultValue="sprint">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="backlog">Бэклог</TabsTrigger>
          <TabsTrigger value="sprint">Спринт</TabsTrigger>
        </TabsList>
        <TabsContent value="backlog">
          <div>
            <CreateTaskButton projectId={project.id} />
          </div>
          <BacklogTasksList
            initialTasks={project.tasks}
            projectId={project.id}
          />
        </TabsContent>
        <TabsContent value="sprint" className="mt-4 flex flex-col space-y-4">
          <div>
            <CreateTaskButton projectId={project.id} />
          </div>
          <DataTable columns={columns} data={project.tasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
// Можно сделать по вкладкам текущие задачи и запланированные, чтобы поместились все
// И ещё выполненные задачи тоже можно добавить

// Метки ещё добавить разные по оценкам разного цвета
