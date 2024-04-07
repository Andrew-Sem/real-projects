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
import { useState } from "react";
import { type Template } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CreateProjectForm = ({
  availableTemplates,
}: {
  availableTemplates: Template[];
}) => {
  const formSchema = z.object({
    projectName: z.string().min(2).max(50),
    templateId: z
      .enum(
        availableTemplates.map((template) => template.id) as [
          string,
          ...string[],
        ],
      )
      .optional(),
  });
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: createProject, isPending } = api.project.create.useMutation({
    onSuccess: (project) => {
      setIsRedirecting(true);
      router.push(`/projects/${project.id}/dashboard`);
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
        <FormField
          control={form.control}
          name="templateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Шаблон</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-60">
                    <SelectValue placeholder="Выберите шаблон" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-60">
                  {availableTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending || isRedirecting}
          type="submit"
          className="flex items-center gap-x-2"
        >
          <span>Создать проект</span>
          {(isPending || isRedirecting) && <Spinner className="h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
};
