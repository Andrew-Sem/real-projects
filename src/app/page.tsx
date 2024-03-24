import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="text-3xl">
      Hello <UserButton />
    </div>
  );
}
