import { Header } from "@/shared/components/header";
import { Sidebar } from "@/shared/components/sidebar";
import { getServerAuthSession } from "@/shared/server/auth";
import { type PropsWithChildren } from "react";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: PropsWithChildren) {
	const session = await getServerAuthSession();
	if (!session?.user) redirect("/");
	return (
		<>
			<div className="flex h-screen flex-col">
				<Header user={session.user} />
				<div className="relative flex flex-1 overflow-hidden">
					<Sidebar />
					<div className="flex-1 overflow-y-auto pl-4">{children}</div>
				</div>
			</div>
		</>
	);
}
