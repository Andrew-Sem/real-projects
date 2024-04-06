"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreateTaskForm } from "./create-task-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const CreateTaskButton = ({ projectId }: { projectId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>Создать задачу</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-8">
          <SheetTitle>Создание задачи</SheetTitle>
          <SheetDescription>
            Задача будет прикреплена к этому проекту
          </SheetDescription>
        </SheetHeader>
        <CreateTaskForm
          projectId={projectId}
          closeSheet={() => setIsOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};
