import type { NavItem, Space, Tone } from '@/lib/types';
import { telHref } from '@/lib/phone';
import Label from '../Label';
import Button from '../Button';

/** Closing statement band: the phone number at statement size, one line of hours, one button. */
export default function Slab({ tone, space, label, body, phone, cta }: { tone: Tone; space: Space; label: string; body: string; phone: string; cta?: NavItem }) {
  return (
    <section data-tone={tone} data-space={space}>
      <div className="wrap grid-12">
        <div className="md:col-span-8">
          <Label>{label}</Label>
          <p className="mt-4">
            <a href={telHref(phone)} className="statement h-display inline-block leading-none whitespace-nowrap no-underline">
              {phone}
            </a>
          </p>
          <p className="lead mt-6">{body}</p>
          {cta && (
            <div className="mt-8">
              <Button item={cta} block />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
