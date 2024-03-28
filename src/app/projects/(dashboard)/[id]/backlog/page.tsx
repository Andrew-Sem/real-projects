import { api } from "@/trpc/server";

import { TRPCClientError } from "@trpc/client";
import { DataTable } from "@/components/backlog/data-table";
import { columns } from "@/components/backlog/columns";
import { CreateTaskButton } from "@/components/create-task-button";
import { BacklogTasksList } from "@/components/backlog/backlog-tasks-list";

export default async function BacklogPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await api.project.getById({ id: params.id });
  if (!project) throw new TRPCClientError("Unable to get project");
  return (
    <div className="flex w-full flex-col gap-y-4">
      <BacklogTasksList
        initialTasks={project.backlog.tasks}
        backlogId={project.backlogId}
      />
      <div>
        <CreateTaskButton backlogId={project.backlogId} />
      </div>
      <DataTable columns={columns} data={project.backlog.tasks} />
      {/* <DataTableDemo /> */}
    </div>
  );
}
