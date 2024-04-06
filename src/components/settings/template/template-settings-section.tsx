"use client";

import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreateTemplateForm } from "./create-template-form";
import { useState } from "react";

export const TemplateSettingsSection = ({
  projectId,
}: {
  projectId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <h2 className="text-2xl font-semibold">Шаблон</h2>
        <div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button>Сохранить как шаблон</Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-y-8">
              <SheetHeader>
                <SheetTitle>Создание шаблона</SheetTitle>
                <SheetDescription>
                  Шаблон будет создан на основе существующего проекта
                </SheetDescription>
              </SheetHeader>
              <CreateTemplateForm
                projectId={projectId}
                closeSheet={() => setIsOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
