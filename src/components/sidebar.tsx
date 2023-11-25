import {
    CalendarIcon,
    Cog6ToothIcon,
    RectangleStackIcon,
    Squares2X2Icon,
    UsersIcon,
} from "@heroicons/react/24/solid"
import { Separator } from "./ui/separator"
import type { ReactElement } from "react"
import { cn } from "@/lib/utils"

export const Sidebar = () => {
    return (
        <div className="flex min-h-full flex-col gap-4 overflow-y-auto border-r lg:w-[280px]">
            <h4 className="px-4 pt-3 text-xl font-medium">Test project</h4>
            <div className="flex flex-col font-medium">
                <MenuItem
                    icon={<UsersIcon className="h-4 w-4" />}
                    title="Участники"
                />
                <MenuItem
                    icon={<Cog6ToothIcon className="h-4 w-4" />}
                    title="Настройки пространства"
                />
            </div>
            <div className="px-4">
                <Separator />
            </div>
            <div className="flex flex-col font-medium">
                <MenuItem
                    icon={<Squares2X2Icon className="h-4 w-4" />}
                    title="Дэшбоард"
                    active
                />
                <MenuItem
                    icon={<RectangleStackIcon className="h-4 w-4" />}
                    title="Бэклог"
                />
                <MenuItem
                    icon={<CalendarIcon className="h-4 w-4" />}
                    title="Календарь"
                />
            </div>
            <div className="fixed bottom-0 bg-background px-4 py-2 text-sm text-muted-foreground">
                Andrew-Sem
            </div>
        </div>
    )
}

const MenuItem = ({
    icon,
    title,
    active,
}: {
    icon: ReactElement
    title: string
    active?: boolean
}) => {
    return (
        <div
            className={cn(
                active ? "bg-muted" : "",
                "flex cursor-pointer items-center gap-3 px-4 py-2 text-muted-foreground/70 hover:bg-muted/50"
            )}
        >
            {icon}
            <span>{title}</span>
        </div>
    )
}
