import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type ReactNode } from "react";

export const ConfirmDialog = ({
  actions,
  children,
  title = "Вы уверены, что хотите это сделать?",
  description,
}: {
  actions?: ReactNode;
  children: ReactNode;
  title?: string;
  description?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {actions && <DialogFooter className="mt-4">{actions}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
