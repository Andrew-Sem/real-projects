import { CreateProjectForm } from "@/components/create-project-form";
import { Header } from "@/components/header";
import { api } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs";

export default async function CreateProjectPage() {
  const availableTemplates = await api.template.getAllByUser();
  const user = await currentUser();
  return (
    <>
      <Header userImage={user?.imageUrl} />
      <div className="container flex justify-center">
        <div className="w-full max-w-xl py-10">
          <h1 className="mb-10 text-3xl font-semibold">
            Создание нового проекта
          </h1>
          <CreateProjectForm availableTemplates={availableTemplates} />
        </div>
      </div>
    </>
  );
}
