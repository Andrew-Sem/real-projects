"use client";

import { Button } from "@/shared/components/ui/button";
import { GithubMark } from "@/shared/components/ui/logos/github-mark";
import { GoogleMark } from "@/shared/components/ui/logos/google-mark";
import { Spinner } from "@/shared/components/ui/spinner";
import { ArrowRightIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const SignInForm = () => {
	const [isGithubLoading, setIsGithubLoading] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);
	const isLoading = isGoogleLoading || isGithubLoading;
	const searchParams = useSearchParams();
	return (
		<form className="rounded-2xl shadow-xl p-8 space-y-8 border">
			<h2 className="text-xl font-bold">Вход</h2>
			<div className="flex flex-col gap-y-4">
				<Button
					variant={"outline"}
					className="group justify-between"
					onClick={() => {
						setIsGithubLoading(true);
						signIn("github", {
							callbackUrl: searchParams?.get("from") || "/dashboard",
						});
					}}
					disabled={isLoading}
				>
					<div className="flex items-center gap-x-4">
						{isGithubLoading ? <Spinner className="w-5 h-5" /> : <GithubMark />}
						<span>Войти с GitHub</span>
					</div>
					<ArrowRightIcon className="w-4 h-4 scale-95 group-hover:scale-125 opacity-0 group-hover:opacity-100 duration-150 group-hover:translate-x-2 mr-2" />
				</Button>
				<Button
					variant={"outline"}
					className="group justify-between disabled:cursor-not-allowed"
					onClick={() => {
						setIsGoogleLoading(true);
						signIn("google", {
							callbackUrl: searchParams?.get("from") || "/dashboard",
						});
					}}
					disabled={isLoading}
				>
					<div className="flex items-center gap-x-4">
						{isGoogleLoading ? <Spinner className="w-5 h-5" /> : <GoogleMark />}
						<span>Войти с Google</span>
					</div>
					<ArrowRightIcon className="w-4 h-4 scale-95 group-hover:scale-125 opacity-0 group-hover:opacity-100 duration-150 group-hover:translate-x-2 mr-2" />
				</Button>
			</div>
		</form>
	);
};
