"use client"

import { api } from "@/trpc/react"
import { getUrl, transformer } from "@/trpc/shared"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"
import { useState } from "react"

export function TRPCReactProvider(props: {
    children: React.ReactNode
    cookies: string
}) {
    const [queryClient] = useState(() => new QueryClient())

    const [trpcClient] = useState(() =>
        api.createClient({
            transformer,
            links: [
                loggerLink({
                    enabled: (op) =>
                        process.env.NODE_ENV === "development" ||
                        (op.direction === "down" && op.result instanceof Error),
                }),
                unstable_httpBatchStreamLink({
                    url: getUrl(),
                    headers() {
                        return {
                            cookie: props.cookies,
                            "x-trpc-source": "react",
                        }
                    },
                }),
            ],
        })
    )

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
            </api.Provider>
        </QueryClientProvider>
    )
}
