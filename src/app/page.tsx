import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="text-3xl">
      Hello <UserButton />
      <ModeToggle />
    </div>
  );
}
