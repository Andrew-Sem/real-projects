import { CreateProjectForm } from "@/components/create-project-form";
import { api } from "@/trpc/server";

export default async function CreateProjectPage() {
  const user = await api.user.getCurrent();
  if (!user) await api.user.create();
  return (
    <div className="container flex justify-center">
      <div className="w-full max-w-xl py-10">
        <h1 className="mb-10 text-3xl font-semibold">
          Создание нового проекта
        </h1>
        <CreateProjectForm />
      </div>
    </div>
  );
}
