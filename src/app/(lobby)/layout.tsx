import { Header } from "@/components/header"
import { type PropsWithChildren } from "react"

export default function LobbyLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
