"use client";
import {
	ArrowLeftOnRectangleIcon,
	BellIcon,
	ChevronDownIcon,
	Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { type User } from "next-auth";
import Image from "next/image";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import Link from "next/link";
import { Logo } from "@/shared/components/ui/logos/logo";

export const Header = ({ user }: { user: User }) => {
	return (
		<header className="sticky top-0 z-50 border-b py-3 bg-background/30 backdrop-blur-sm">
			<div className="flex items-center justify-between px-4">
				<Logo className="w-8 h-8" />
				<div className="flex items-center space-x-6">
					<Link href={"/notifications"}>
						<BellIcon className="h-5 w-5 text-muted-foreground" />
					</Link>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center space-x-2">
							<Image
								src={user.image ?? ""}
								height={32}
								width={32}
								alt="profile pic"
								className="shrink-0 cursor-pointer rounded-full"
							/>
							<ChevronDownIcon className="h-3.5 w-3.5" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="flex items-center space-x-2">
								<Cog6ToothIcon className="h-4 w-4" />
								<span>Настройки</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex items-center space-x-2"
								onClick={() => signOut()}
							>
								<ArrowLeftOnRectangleIcon className="h-4 w-4" />
								<span>Выйти</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
};
