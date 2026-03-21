export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="mb-10 flex justify-center">
          <img
            src="/archlinux-logo-light-scalable.svg"
            alt="Arch Linux Logo"
            className="h-40 w-auto object-contain"
          />
        </div>

        <h1 className="text-6xl font-bold tracking-tight text-sky-400">
          Ageless Arch
        </h1>

        <p className="mt-4 text-zinc-400">
          Arch for humans of indeterminate age. Coming Soon.
        </p>
      </div>
    </main>
  );
}
