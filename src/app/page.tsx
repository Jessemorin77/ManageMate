import Link from "next/link";
import Hero from "~/_components/HomeScreen/Hero";
import NavBar from "~/_components/NavBar";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();
  await console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Hero />
    </main>
  );
}
