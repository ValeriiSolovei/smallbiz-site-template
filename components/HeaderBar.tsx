'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { NavItem } from '@/lib/types';

const norm = (p: string) => p.replace(/\/+$/, '') || '/';

export default function HeaderBar({ name, nav, cta }: { name: string; nav: NavItem[]; cta: NavItem }) {
  const [open, setOpen] = useState(false);
  const current = norm(usePathname() ?? '/');
  return (
    <header className="sticky top-0 z-40 border-b border-border-default bg-surface-base/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight" onClick={() => setOpen(false)}>
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
          type="button"
          className="rounded-lg border border-border-default px-3 py-2 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-border-default px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-text-secondary hover:bg-surface-card hover:text-text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={cta.href}
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl bg-accent px-4 py-3 text-center font-semibold text-accent-contrast"
              >
                {cta.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
