"use client";

import { Check, Copy } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const CopyInviteLink = ({ inviteLink }: { inviteLink: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={copyLink}
          className={cn(buttonVariants({ variant: "outline" }), "gap-x-2")}
        >
          <span>{inviteLink}</span>
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>Скопировать</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
