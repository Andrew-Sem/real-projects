"use client";

import { SparklesIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { type User, type Project } from "@prisma/client";
import { api } from "@/trpc/react";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

export const InviteForm = ({
  project,
}: {
  project: Project & { members: User[] };
}) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const acceptInviteHandler = () => {
    acceptInvite({ id: project.id });
  };

  const { mutate: acceptInvite, isPending } =
    api.project.acceptInvite.useMutation({
      onSuccess: () => {
        setIsRedirecting(true);
        router.push(`/projects/${project.id}/dashboard`);
      },
    });
  return (
    <div className="mt-20 max-w-xl rounded-lg border p-10">
      <h1 className="flex items-center gap-x-4 pb-16 text-2xl ">
        <SparklesIcon className="h-10 w-10" />
        <div>
          <span>Вы были приглашены в проект </span>
          <span className="font-semibold">{project.name}</span>
        </div>
      </h1>
      <div className="flex justify-end space-x-4">
        <Button
          onClick={acceptInviteHandler}
          disabled={isPending || isRedirecting}
          className="space-x-2"
        >
          {(isPending || isRedirecting) && <Spinner className="h-4 w-4" />}
          <span>Присоединиться</span>
        </Button>
      </div>
    </div>
  );
};
