import { api } from "@/trpc/server";

import { TRPCClientError } from "@trpc/client";
import { BacklogTasksList } from "@/components/backlog-tasks-list";

export default async function BacklogPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await api.project.getById({ id: params.id });
  if (!project) throw new TRPCClientError("Unable to get project");
  return (
    <div className="flex w-full gap-x-8 pt-4">
      <BacklogTasksList
        initialTasks={project.backlog.tasks}
        backlogId={project.backlogId}
      />
    </div>
  );
}
