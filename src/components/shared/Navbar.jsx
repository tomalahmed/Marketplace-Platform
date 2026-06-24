"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home", exact: true },
  { href: "/prompts", label: "Marketplace" },
  { href: "/#top-creators", label: "Creators" },
  { href: "/pricing", label: "Premium" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href, exact) => {
    if (href === "/#top-creators") return false;
    if (exact) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between bg-surface/80 px-4 shadow-sm backdrop-blur-md md:px-10">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between">
          <Link
            href="/"
            className="text-headline-md text-[24px] font-bold leading-[1.4] text-primary"
          >
            PromptGrowth
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href, link.exact);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-label-md text-[14px] font-medium leading-[1.4] transition-colors ${
                    active
                      ? "border-b-2 border-primary pb-1 font-bold text-primary"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/login"
              className="text-label-md text-[14px] font-medium leading-[1.4] text-on-surface-variant transition-colors hover:text-primary"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary-container px-6 py-3 text-label-md text-[14px] font-medium leading-[1.4] text-on-primary transition-colors hover:bg-primary"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-on-surface md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-20 z-40 border-t border-outline-variant/20 bg-surface-container-lowest px-4 py-4 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href, link.exact);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-label-md text-[14px] font-medium ${
                    active
                      ? "bg-primary-container/10 font-bold text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <hr className="my-1 border-outline-variant/30" />
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-label-md text-[14px] font-medium text-on-surface-variant"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-primary-container px-3 py-2.5 text-center text-label-md text-[14px] font-medium text-on-primary"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
