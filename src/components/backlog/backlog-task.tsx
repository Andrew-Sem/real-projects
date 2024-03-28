import { type Task } from "@prisma/client";

export const BacklogTask = ({ task }: { task: Task }) => {
  return <div className="py-4">{task.name}</div>;
};
