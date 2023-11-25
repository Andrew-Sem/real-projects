import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { type PropsWithChildren } from "react"

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <>
            <div className="flex h-screen flex-col">
                <Header />
                <div className="relative flex flex-1 overflow-hidden">
                    <Sidebar />
                    <div className="flex-1 overflow-y-auto pl-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
