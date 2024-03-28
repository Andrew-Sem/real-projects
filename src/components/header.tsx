"use client";
import {
  ArrowLeftOnRectangleIcon,
  BellIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Logo } from "@/components/ui/logos/logo";
import { SignOutButton } from "@clerk/nextjs";

export const Header = ({ userImage }: { userImage?: string }) => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/30 py-3 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4">
        <Logo className="h-8 w-8" />
        <div className="flex items-center space-x-6">
          <Link href={"/notifications"}>
            <BellIcon className="h-5 w-5 text-muted-foreground" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2">
              <Image
                src={userImage ?? ""}
                height={32}
                width={32}
                alt="profile pic"
                className="shrink-0 cursor-pointer rounded-full"
              />
              <ChevronDownIcon className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent slot="123">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center space-x-2">
                <Cog6ToothIcon className="h-4 w-4" />
                <span>Настройки</span>
              </DropdownMenuItem>
              <SignOutButton>
                <DropdownMenuItem className="flex items-center space-x-2">
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
