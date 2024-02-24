import { Header } from "@/components/header";
import LandingPage from "@/modules/landing/components/landing-page";
import { getServerAuthSession } from "@/server/auth";

export default async function LobbyPage() {
	const session = await getServerAuthSession();
	if (!session?.user) return <LandingPage />;
	return (
		<div>
			<Header user={session.user} />
			<div>Lobby page</div>
		</div>
	);
}
