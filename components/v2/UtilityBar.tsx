import { telHref } from '@/lib/phone';

/** Desktop-only strip above the header: one line of credentials and the phone number. */
export default function UtilityBar({ left, right, phone }: { left: string; right: string; phone: string }) {
  return (
    <div data-tone="inverse" className="hidden md:block">
      <div className="wrap flex min-h-10 items-center justify-between gap-6 text-[0.9375rem] font-semibold">
        <p className="text-fg-2">{left}</p>
        <p>
          {right}{' '}
          <a href={telHref(phone)} className="link-action text-link">
            {phone}
          </a>
        </p>
      </div>
    </div>
  );
}
