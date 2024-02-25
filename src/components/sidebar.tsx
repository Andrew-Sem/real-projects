"use client";
import {
	CalendarIcon,
	Cog6ToothIcon,
	RectangleStackIcon,
	Squares2X2Icon,
	UsersIcon,
} from "@heroicons/react/24/solid";
import { Separator } from "./ui/separator";
import type { ReactElement } from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
	return (
		<div className="flex min-h-full flex-col gap-4 overflow-y-auto border-r lg:w-[280px] relative">
			<h4 className="px-4 pt-3 text-xl font-medium">Test project</h4>
			<div className="grow">
				<div className="flex flex-col font-medium">
					<MenuItem
						icon={<UsersIcon className="h-4 w-4" />}
						title="Участники"
						href="/members"
					/>
					<MenuItem
						icon={<Cog6ToothIcon className="h-4 w-4" />}
						title="Настройки пространства"
						href="/settings"
					/>
				</div>
				<div className="px-4 py-2">
					<Separator />
				</div>
				<div className="flex flex-col font-medium">
					<MenuItem
						icon={<Squares2X2Icon className="h-4 w-4" />}
						title="Дэшбоард"
						href="/dashboard"
					/>
					<MenuItem
						icon={<RectangleStackIcon className="h-4 w-4" />}
						title="Бэклог"
						href="/backlog"
					/>
					<MenuItem
						icon={<CalendarIcon className="h-4 w-4" />}
						title="Календарь"
						href="/calendar"
					/>
				</div>
			</div>
			<div className="sticky bottom-0 bg-background px-4 py-2 text-sm flex justify-between w-full items-center">
				<div>
					<span className="text-muted-foreground">@ 2023&nbsp;</span>
					<span>Andrew-Sem</span>
				</div>
				<ModeToggle />
			</div>
		</div>
	);
};

const MenuItem = ({
	icon,
	title,
	href,
}: {
	icon: ReactElement;
	title: string;
	href: string;
}) => {
	const pathname = usePathname();
	const activeStyles =
		pathname === href ? "bg-accent/80 text-accent-foreground/80" : "";
	return (
		<Link href={href}>
			<div
				className={cn(
					"flex cursor-pointer items-center gap-3 px-4 py-2 text-muted-foreground/70 hover:bg-muted hover:text-muted-foreground",
					activeStyles,
				)}
			>
				{icon}
				<span>{title}</span>
			</div>
		</Link>
	);
};
