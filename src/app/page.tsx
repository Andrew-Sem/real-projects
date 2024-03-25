import { AdvantageCardList } from "@/components/landing/advantage-card-list";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogoWithText } from "@/components/ui/logos/logo-with-text";
import { cn } from "@/lib/utils";
import { auth, SignInButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();
  return (
    <>
      <header className="container flex justify-between py-4">
        <LogoWithText />

        {userId ? (
          <SignOutButton>
            <Button variant={"secondary"}>Выйти</Button>
          </SignOutButton>
        ) : (
          <SignInButton>
            <Button variant={"secondary"}>Войти</Button>
          </SignInButton>
        )}
      </header>
      <main>
        <section className="container flex flex-col items-center">
          <div className="max-w-4xl">
            <h1 className="my-8 text-center text-2xl font-bold sm:text-start sm:text-3xl md:text-4xl lg:text-5xl">
              Реальные проекты - практическое решение для оптимизации
              организации Ваших it-проектов
            </h1>
            <div className="flex max-w-4xl flex-wrap gap-x-4 gap-y-2">
              <Link
                href={"/projects/create"}
                className={cn("grow sm:grow-0", buttonVariants())}
              >
                Создать проект
              </Link>
              <Button className="grow sm:grow-0" variant={"outline"}>
                Присоединиться к проекту
              </Button>
            </div>
          </div>
        </section>
        <section className="my-6 hidden flex-col items-center overflow-hidden px-16 py-2 md:flex">
          <div className="relative z-10 p-8">
            <div className="overflow-hidden rounded-xl shadow-xl dark:border-2 dark:shadow-none">
              <Image
                className=" dark:hidden"
                src="/img/Dashboard preview light.png"
                alt="dashboard preview"
                width={1467}
                height={841}
              />
              <Image
                className="hidden  dark:block"
                src="/img/Dashboard preview dark.png"
                alt="dashboard preview"
                width={1467}
                height={841}
              />
            </div>
            <div className="absolute inset-0 rounded-3xl border border-primary/40 blur-[1px] filter" />
            <div className="absolute inset-0 -z-10 h-auto w-full rounded-3xl bg-primary/10 backdrop-blur-md" />
            <div className="absolute right-[calc(100%-44px)] top-1/2 -z-20 h-3/5 w-full -translate-y-1/2 bg-gradient-to-tr from-red-500 from-30% to-blue-900" />
            <div className="absolute left-[calc(100%-44px)] top-1/2 -z-20 h-3/5 w-full -translate-y-1/2 bg-gradient-to-tr  from-yellow-300 to-red-700 to-90%" />
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
