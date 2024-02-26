import { Logo } from "@/shared/components/ui/logos/logo";
import { SignInForm } from "@/modules/sign-in/components/sign-in-form";
import Link from "next/link";

export default function SignInPage() {
	return (
		<div className="flex flex-col items-center">
			<Link className="rounded-full p-2 mt-10 w-20 h-20 bg-muted" href={"/"}>
				<Logo className="w-full h-full" />
			</Link>
			<p className="font-medium text-2xl mt-4">Реальные проекты</p>
			<div className="w-full max-w-sm mt-10">
				<SignInForm />
			</div>
		</div>
	);
}
