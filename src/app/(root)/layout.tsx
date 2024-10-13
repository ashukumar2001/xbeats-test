import Player from "@/components/blocks/player/player";
import Sidebar from "@/components/blocks/sidebar";
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex flex-col">
      <header className="h-12 p-3">
        <Link href="/">xbeats</Link>
      </header>
      <section className="grid grid-cols-12 flex-1 overflow-hidden p-3 pr-0 gap-3 transition-all">
        <Sidebar />
        <main className="col-span-10 dark:bg-neutral-900 rounded-md p-3 overflow-auto">
          {children}
        </main>
      </section>
      <Player />
    </main>
  );
}
