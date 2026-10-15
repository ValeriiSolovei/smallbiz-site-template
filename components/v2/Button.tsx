import Link from 'next/link';
import type { NavItem } from '@/lib/types';
import { PhoneIcon } from './Icon';

type Props = {
  item: NavItem;
  kind?: 'primary' | 'secondary';
  /** Taller primary button for the hero. */
  hero?: boolean;
  /** Full width below 768 px, for a section's main action. */
  block?: boolean;
  /** Secondary links end with an arrow unless the site's style says otherwise. */
  arrow?: boolean;
  className?: string;
};

const isInternal = (href: string) => href.startsWith('/');

/** Primary: the site's committed button shape (html[data-button]). Secondary: an underlined text link, 44 px tall. */
export default function Button({ item, kind = 'primary', hero, block, arrow = true, className = '' }: Props) {
  const tel = item.href.startsWith('tel:');
  const classes =
    kind === 'primary' ? `btn ${hero ? 'btn-hero' : ''} ${block ? 'btn-block' : ''} ${className}` : `text-link ${className}`;
  const content = (
    <>
      {kind === 'primary' && tel && <PhoneIcon />}
      <span>{item.label}</span>
      {kind === 'secondary' && arrow && <span aria-hidden="true">→</span>}
    </>
  );
  return isInternal(item.href) ? (
    <Link href={item.href} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={item.href} className={classes}>
      {content}
    </a>
  );
}
