"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type Role } from "@prisma/client";
import { api } from "@/trpc/react";
import { Skeleton } from "../ui/skeleton";

const roles = [
  {
    value: "user",
    label: "user",
  },
  {
    value: "admin",
    label: "admin",
  },
];

export function RolesCombobox({
  initialRole,
  projectId,
  userId,
  canEditRole,
}: {
  initialRole: Role;
  projectId: string;
  userId: string;
  canEditRole: boolean | undefined;
}) {
  const { mutate: updateRole } = api.permission.updateRole.useMutation();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Role>(initialRole);

  if (canEditRole === undefined) return <Skeleton className="h-4 w-40" />;
  if (!canEditRole) return <div className="w-40">{initialRole}</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-40 justify-between"
        >
          {value
            ? roles.find((framework) => framework.value === value)?.label
            : "user"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0">
        <Command>
          <CommandInput placeholder="Поиск ролей..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {roles.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  const currentRole = currentValue as Role;
                  updateRole({ projectId, userId, role: currentRole });
                  setValue(currentRole);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
