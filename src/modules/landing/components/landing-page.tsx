"use client";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo-with-text";
import { signIn } from "next-auth/react";
import { AdvantageCardList } from "./advantage-card-list";

export default function LandingPage() {
	return (
		<>
			<header className="container py-4 flex justify-between">
				<Logo />
				<Button variant={"outline"} onClick={() => signIn()}>
					Войти
				</Button>
			</header>
			<main>
				<section className="flex flex-col items-center container">
					<div className="max-w-4xl">
						<h1 className="text-3xl lg:text-5xl font-bold my-8">
							Реальные проекты - практическое решение для оптимизации
							организации Ваших it-проектов
						</h1>
						<div className="flex gap-x-4 gap-y-2 max-w-4xl flex-wrap">
							<Button>Создать проект</Button>
							<Button variant={"outline"}>Присоединиться к проекту</Button>
						</div>
					</div>
				</section>
				<section className="my-8 hidden md:flex flex-col items-center px-16 overflow-hidden">
					<div className="relative z-10 p-8">
						<div className="overflow-hidden border rounded-xl">
							<img
								className="w-full h-auto"
								src="img/Dashboard preview.png"
								alt="dashboard preview"
							/>
						</div>
						<div className="absolute inset-0 filter blur-[1px] rounded-3xl border border-primary/40" />
						<div className="absolute -z-10 w-full h-auto backdrop-blur-md inset-0" />
						<div className="absolute top-1/2 right-[calc(100%-44px)] -translate-y-1/2 bg-gradient-to-tr from-30% from-red-500 to-blue-900 -z-20 h-3/5 w-full" />
						<div className="absolute top-1/2 left-[calc(100%-44px)] -translate-y-1/2 bg-gradient-to-tr from-yellow-300 to-90% to-red-700  -z-20 h-3/5 w-full" />
					</div>
				</section>
				<section className="flex flex-col items-center">
					<div className="max-w-2xl">
						<AdvantageCardList />
					</div>
				</section>
			</main>
		</>
	);
}
