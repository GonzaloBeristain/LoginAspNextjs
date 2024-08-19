import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-x-40 items-center h-[calc(100vh-24rem)]">
        <Link href="/login" className="text-white font-bold text-3xl bg-slate-900 p-6 rounded-full shadow transition-colors duration-300 hover:text-slate-400">Login</Link>
        <Link href="/registro" className="text-white font-bold text-3xl bg-slate-900 p-6 rounded-full shadow transition-colors duration-300 hover:text-slate-400">Registro</Link>
      </div>
    </main>
  );
}
