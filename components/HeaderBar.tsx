'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { NavItem } from '@/lib/types';

const norm = (p: string) => p.replace(/\/+$/, '') || '/';

export default function HeaderBar({ name, nav, cta }: { name: string; nav: NavItem[]; cta: NavItem }) {
  const pathname = usePathname() ?? '/';
  const current = norm(pathname);
  // The phone menu is open only on the page where it was opened, so any page change
  // (a link, Back or Forward) closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenOn(null);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border-default bg-surface-base/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight" onClick={close}>
          {name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={norm(item.href) === current ? 'page' : undefined}
              className="text-sm text-text-secondary hover:text-text-primary aria-[current=page]:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <Link href={cta.href} className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:bg-accent-hover">
            {cta.label}
          </Link>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="rounded-lg border border-border-default p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      <nav id="mobile-menu" aria-label="Mobile" hidden={!open} className="border-t border-border-default px-4 pb-4 md:hidden">
        <ul className="flex flex-col gap-1 pt-2">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                aria-current={norm(item.href) === current ? 'page' : undefined}
                className="block rounded-lg px-2 py-3 text-text-secondary hover:bg-surface-card hover:text-text-primary aria-[current=page]:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={cta.href}
              onClick={close}
              className="mt-2 block rounded-xl bg-accent px-4 py-3 text-center font-semibold text-accent-contrast"
            >
              {cta.label}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
