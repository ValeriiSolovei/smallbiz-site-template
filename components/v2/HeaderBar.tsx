'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { NavItem } from '@/lib/types';
import Button from './Button';

const norm = (p: string) => p.replace(/\/+$/, '') || '/';

type Props = { wordmark: { main: string; sub?: string }; nav: NavItem[]; cta: NavItem };

/** Solid header: sticky from 768 px only, since the call bar owns the bottom of a phone screen. */
export default function HeaderBar({ wordmark, nav, cta }: Props) {
  const pathname = usePathname() ?? '/';
  const current = norm(pathname);
  const [open, setOpen] = useState(false);
  // Any page change (a link, Back or Forward) closes the phone menu.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }
  const close = () => setOpen(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header data-tone="base" className="relative z-40 border-b border-rule md:sticky md:top-0">
      <div className="wrap flex min-h-16 items-center justify-between gap-6 py-2">
        <Link href="/" onClick={close} className="flex min-h-11 flex-col justify-center leading-none">
          <span className="h-display text-[1.5rem]">{wordmark.main}</span>
          {wordmark.sub && <span className="mt-1 text-[0.8125rem] font-semibold tracking-[0.2em] text-fg-2 uppercase">{wordmark.sub}</span>}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={norm(item.href) === current ? 'page' : undefined}
              className="inline-flex min-h-11 items-center text-[0.9375rem] text-fg-2 decoration-mark decoration-[3px] underline-offset-8 hover:text-fg aria-[current=page]:text-fg aria-[current=page]:underline"
            >
              {item.label}
            </Link>
          ))}
          <Button item={cta} />
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-rule md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      <nav id="mobile-menu" aria-label="Mobile" hidden={!open} className="border-t border-rule pb-6 md:hidden">
        <ul className="wrap">
          {nav.map((item) => (
            <li key={item.href} className="border-b border-rule">
              <Link
                href={item.href}
                onClick={close}
                aria-current={norm(item.href) === current ? 'page' : undefined}
                className="h-display flex min-h-14 items-center text-[1.5rem] decoration-mark decoration-[3px] underline-offset-8 aria-[current=page]:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-6">
            <Button item={cta} block className="w-full" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
