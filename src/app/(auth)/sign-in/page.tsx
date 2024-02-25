import { SignInForm } from "@/modules/sign-in/components/sign-in-form";

export default function SignInPage() {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center">
			<div className="w-full max-w-sm">
				<SignInForm />
			</div>
		</div>
	);
}
