"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "./ui/use-toast";
const formSchema = z.object({
  projectName: z.string().min(2).max(50),
});

export const CreateProjectForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate: createProject, isPending } = api.project.create.useMutation({
    onSuccess: (project) => {
      router.push(`/projects/${project.id}`);
    },
    onError: (error) => {
      toast({
        title: "Ошибка при создании проекта",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createProject(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название проекта</FormLabel>
              <FormControl>
                <Input placeholder="Введите название проекта" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          className="flex items-center gap-x-2"
        >
          <span>Создать проект</span>
          {isPending && <Spinner className="h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
};
