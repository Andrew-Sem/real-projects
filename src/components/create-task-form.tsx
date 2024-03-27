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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { api } from "@/trpc/react";
import { useToast } from "./ui/use-toast";
import { Spinner } from "./ui/spinner";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(200),
  sprintId: z.string().optional(),
});

export const CreateTaskForm = ({
  backlogId,
  closeSheet,
}: {
  backlogId: string;
  closeSheet: () => void;
}) => {
  const utils = api.useUtils();
  const { toast } = useToast();
  const { mutate: createTask, isPending } = api.task.create.useMutation({
    onSuccess: async () => {
      await utils.task.getAllByBacklogId.refetch({
        backlogId,
      });
      closeSheet();
    },
    onError(error) {
      toast({
        title: "Ошибка при создании задачи",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      sprintId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createTask({ ...values, backlogId });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Название задачи" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  className=" max-h-48"
                  placeholder="Описание задачи"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sprintId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Спринт</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1 (текущий)</SelectItem>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="gap-x-2">
          <span>Создать</span>
          {isPending && <Spinner className="h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
};
