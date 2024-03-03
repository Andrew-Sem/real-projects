"use client"

import { Button } from "@/shared/components/ui/button"
import { GithubMark } from "@/shared/components/ui/logos/github-mark"
import { GoogleMark } from "@/shared/components/ui/logos/google-mark"
import { Spinner } from "@/shared/components/ui/spinner"
import { ArrowRightIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export const SignInForm = () => {
    const [isGithubLoading, setIsGithubLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const isLoading = isGoogleLoading || isGithubLoading
    const searchParams = useSearchParams()
    return (
        <form className="space-y-8 rounded-2xl border p-8 shadow-xl">
            <h2 className="text-xl font-bold">Вход</h2>
            <div className="flex flex-col gap-y-4">
                <Button
                    variant={"outline"}
                    className="group justify-between"
                    onClick={() => {
                        setIsGithubLoading(true)
                        signIn("github", {
                            callbackUrl:
                                searchParams?.get("callbackUrl") ||
                                "/dashboard",
                        })
                    }}
                    disabled={isLoading}
                >
                    <div className="flex items-center gap-x-4">
                        {isGithubLoading ? (
                            <Spinner className="h-5 w-5" />
                        ) : (
                            <GithubMark />
                        )}
                        <span>Войти с GitHub</span>
                    </div>
                    <ArrowRightIcon className="mr-2 h-4 w-4 scale-95 opacity-0 duration-150 group-hover:translate-x-2 group-hover:scale-125 group-hover:opacity-100" />
                </Button>
                <Button
                    variant={"outline"}
                    className="group justify-between disabled:cursor-not-allowed"
                    onClick={() => {
                        setIsGoogleLoading(true)
                        signIn("google", {
                            callbackUrl:
                                searchParams?.get("from") || "/dashboard",
                        })
                    }}
                    disabled={isLoading}
                >
                    <div className="flex items-center gap-x-4">
                        {isGoogleLoading ? (
                            <Spinner className="h-5 w-5" />
                        ) : (
                            <GoogleMark />
                        )}
                        <span>Войти с Google</span>
                    </div>
                    <ArrowRightIcon className="mr-2 h-4 w-4 scale-95 opacity-0 duration-150 group-hover:translate-x-2 group-hover:scale-125 group-hover:opacity-100" />
                </Button>
            </div>
        </form>
    )
}
