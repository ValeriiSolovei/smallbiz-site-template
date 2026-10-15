'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/lib/types';
import { ArrowIcon, PhoneIcon } from './Icon';

const norm = (p: string) => p.replace(/\/+$/, '') || '/';

function Cell({ item, tone }: { item: NavItem; tone: 'inverse' | 'accent' }) {
  const icon = item.href.startsWith('tel:') ? <PhoneIcon /> : <ArrowIcon />;
  const content = (
    <>
      {icon}
      <span>{item.label}</span>
    </>
  );
  return item.href.startsWith('/') ? (
    <Link href={item.href} data-tone={tone}>
      {content}
    </Link>
  ) : (
    <a href={item.href} data-tone={tone}>
      {content}
    </a>
  );
}

/** Fixed quick actions on phones (hidden from 768 px and on the contact page, where the keyboard needs the room). */
export default function CallBar({ primary, secondary }: { primary: NavItem; secondary?: NavItem }) {
  const pathname = usePathname() ?? '/';
  if (norm(pathname) === '/contact') return null;
  return (
    <nav aria-label="Quick actions" className="callbar">
      {secondary && <Cell item={secondary} tone="inverse" />}
      <Cell item={primary} tone="accent" />
    </nav>
  );
}
