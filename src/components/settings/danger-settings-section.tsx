"use client";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export const DangerSettingsSection = ({
  projectName,
  projectId,
}: {
  projectName: string;
  projectId: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = api.useUtils();
  const { mutate: deleteProject, isPending } = api.project.delete.useMutation({
    async onSuccess() {
      await utils.project.getAllByUser.refetch();
      router.push("/projects");
    },
    onError(error) {
      toast({
        title: "Ошибка при удалении проекта",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const deleteProjectHandler = () => {
    deleteProject({ id: projectId });
  };
  return (
    <div className="flex flex-col items-start gap-y-4">
      <h2 className="text-2xl font-semibold">Опасная зона</h2>
      <ConfirmDialog
        title={`Вы действительно хотите удалить проект ${projectName}?`}
        description="Восстановить данные проекта будет невозможно"
        actions={
          <div className="flex gap-x-4">
            <DialogClose>
              <Button variant={"secondary"}>Отменить</Button>
            </DialogClose>
            <Button
              className="flex gap-x-2"
              onClick={deleteProjectHandler}
              variant={"destructive"}
            >
              <span>Удалить</span>
              {isPending && <Spinner className="h-4 w-4" />}
            </Button>
          </div>
        }
      >
        <Button variant={"destructive"}>Удалить проект</Button>
      </ConfirmDialog>
    </div>
  );
};
