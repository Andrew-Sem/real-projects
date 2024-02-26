import { Toaster } from "@/shared/components/ui/toaster";
import { cn } from "@/shared/lib/utils";
import { Providers } from "@/modules/providers";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

export const metadata = {
	title: "Реальные проекты",
	description: "Система для управления студенческими ит-проектами",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru" suppressHydrationWarning className={fontSans.variable}>
			<body className={cn("flex min-h-screen flex-col font-sans antialiased")}>
				<Providers>{children}</Providers>
				<Toaster />
			</body>
		</html>
	);
}
