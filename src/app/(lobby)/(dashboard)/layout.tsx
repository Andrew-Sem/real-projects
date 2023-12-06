import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { getServerAuthSession } from "@/server/auth"
import { type PropsWithChildren } from "react"

export default async function DashboardLayout({ children }: PropsWithChildren) {
    const session = await getServerAuthSession()
    return (
        <>
            <div className="flex h-screen flex-col">
                <Header user={session?.user} />
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
