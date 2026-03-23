"use client";

import { useState } from "react";

type Status = "ready" | "progress" | "planned";

type Section = {
  title: string;
  status: Status;
  content: React.ReactNode;
};

function TerminalCommand({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-sky-500/20 bg-black">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 py-2">
        <span className="text-xs uppercase tracking-wider text-zinc-500">
          Command
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 transition hover:border-sky-500/40 hover:text-sky-300"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="overflow-x-auto px-4 py-4">
        <pre className="text-left text-sm text-sky-300">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}

const sections: Section[] = [
  {
    title: "Ageless Linux AUR Packages",
    status: "ready",
    content: (
      <>
        <p className="text-zinc-300">
          These packages give users a simple way to keep an Arch system age free
          without manually patching components. Choose one depending on how
          strongly you want to resist age reporting and storage.
        </p>

        <div className="mt-4 space-y-4 text-left text-sm text-zinc-400">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3">
            <p className="font-medium text-zinc-100">agelessd</p>
            <p className="mt-1">
              Malicious compliance. A more conservative option that limits what
              is surrendered while still resisting identity creep.
            </p>
            <TerminalCommand>paru -S agelessd</TerminalCommand>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3">
            <p className="font-medium text-zinc-100">agelessd-flagrant</p>
            <p className="mt-1">
              Flagrantly non-compliant. Refuses age reporting and storage
              outright for users who do not want their system participating in
              that model at all.
            </p>
            <TerminalCommand>paru -S agelessd-flagrant</TerminalCommand>
          </div>
        </div>

        <p className="mt-4 text-sm text-zinc-400">
          See{" "}
          <a
            href="https://agelesslinux.org"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 underline underline-offset-4 hover:text-sky-300"
          >
            agelesslinux.org
          </a>{" "}
          for the full difference before choosing one.
        </p>
      </>
    ),
  },
  {
    title: "Maintenance Promise",
    status: "progress",
    content: (
      <>
        <p className="text-zinc-300">
          This project is currently maintained and kept{" "}
          <span className="font-medium text-sky-400">age free</span>. That
          matters because privacy tools only protect users while they stay
          current with upstream changes.
        </p>

        <p className="mt-4 text-zinc-300">
          More contributors are very appreciated. Extra help with packaging,
          testing, and review makes it much easier to keep these protections in
          place long term.
        </p>
      </>
    ),
  },
  {
    title: "systemd Fork + Package",
    status: "progress",
    content: (
      <div className="space-y-3 text-zinc-300">
        <p>
          This fork keeps one of the most important parts of the Linux stack
          ageless. Since systemd sits so deep in the system, keeping it clean
          helps prevent age-related behavior from becoming normalized at the
          core.
        </p>

        <p>
          The fork is currently installable and being kept ageless, but
          packaging is not finished yet.
        </p>

        <p className="text-sm text-zinc-400">
          It is also still awaiting a better name.
        </p>

        <p>
          <a
            href="https://github.com/Queer-Coded-LGBTQ/systemd-fuck-california"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 underline underline-offset-4 hover:text-sky-300"
          >
            View the current fork project page
          </a>
        </p>
      </div>
    ),
  },
  {
    title: "xdg-desktop-portal Fork + Package",
    status: "planned",
    content: (
      <>
        <p className="text-zinc-300">
          This is planned next to keep the desktop-facing layer age free too.
          The goal is to stop age-verification behavior from quietly entering
          normal app and portal flows.
        </p>
      </>
    ),
  },
  {
    title: "Custom Repositories",
    status: "planned",
    content: (
      <>
        <p className="text-zinc-300">
          Custom repositories will make the safer path easier to keep updated.
          Instead of relying on one-off scripts, users will be able to stay age
          free through normal pacman updates.
        </p>
      </>
    ),
  },
  {
    title: "Custom Arch ISO",
    status: "planned",
    content: (
      <>
        <p className="text-zinc-300">
          The custom ISO is meant to provide a clean starting point with ageless
          components included from the beginning, making setup easier and
          reducing exposure to age-related behavior during install.
        </p>
      </>
    ),
  },
];

function StatusDot({ status }: { status: Status }) {
  const cls =
    status === "ready"
      ? "bg-emerald-400"
      : status === "progress"
        ? "bg-amber-400"
        : "bg-zinc-500";

  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${cls}`} />;
}

function StatusLabel({ status }: { status: Status }) {
  const map = {
    ready: { text: "Ready", cls: "text-emerald-400" },
    progress: { text: "In Progress", cls: "text-amber-400" },
    planned: { text: "Planned", cls: "text-zinc-400" },
  };

  return (
    <span
      className={`text-xs font-medium uppercase tracking-wide ${map[status].cls}`}
    >
      {map[status].text}
    </span>
  );
}

function AccordionItem({
  section,
  isOpen,
  onClick,
}: {
  section: Section;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <StatusDot status={section.status} />
          <span className="text-base font-medium text-zinc-100">
            {section.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <StatusLabel status={section.status} />
          <span
            className={`text-zinc-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-zinc-800 px-5 py-4 text-sm leading-7 text-zinc-300">
            {section.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16">
        <div className="w-full text-center">
          <div className="mb-5 flex justify-center">
            <img
              src="/archlinux-logo-light-scalable.svg"
              alt="Arch Linux Logo"
              className="h-14 w-auto object-contain"
            />
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-sky-400 sm:text-7xl">
            Ageless Arch
          </h1>

          <p className="mt-4 text-lg text-zinc-400">
            Arch for humans of indeterminate age. Coming Soon.
          </p>
          <p className="mt-4 text-xl text-white">
            Stay free, stay private, stay secure. Your system should not need
            your identity to function.
          </p>
        </div>

        <div className="mt-10 w-full space-y-4">
          {sections.map((section, index) => (
            <AccordionItem
              key={section.title}
              section={section}
              isOpen={openIndex === index}
              onClick={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}
