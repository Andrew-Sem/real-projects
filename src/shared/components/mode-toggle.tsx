"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { CheckCheck, MoonIcon, SunIcon } from "lucide-react";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<SunIcon className="h-5 w-5 dark:hidden" />
					<MoonIcon className="h-5 w-5 hidden dark:block" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					{theme === "light" && (
						<CheckCheck className="w-4 h-4 absolute left-1 " />
					)}
					<span className="pl-4">Светлая</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					{theme === "dark" && (
						<CheckCheck className="w-4 h-4 absolute left-1" />
					)}
					<span className="pl-4">Тёмная</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					{theme === "system" && (
						<CheckCheck className="w-4 h-4 absolute left-1 " />
					)}
					<span className="pl-4">Системная</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
