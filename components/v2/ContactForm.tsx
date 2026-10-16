'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { FormSpec } from '@/lib/types';
import { HONEYPOT_FIELD } from '@/lib/constants';
import { isSpam, validateContact } from '@/lib/validate-contact';

const AUTOCOMPLETE: Record<string, string> = { name: 'name', email: 'email', phone: 'tel' };

/** Contact form on v2 grounds. Field ids, aria, the honeypot and focus handling match the v1 form exactly. */
export default function ContactForm({ form }: { form: FormSpec }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const focusAfterRender = useRef<string | null>(null);

  // After a failed submit, take the user to the first problem once its error text is rendered,
  // so screen readers read the field together with its message.
  useEffect(() => {
    if (!focusAfterRender.current) return;
    document.getElementById(focusAfterRender.current)?.focus();
    focusAfterRender.current = null;
  }, [errors]);

  // Move focus to the confirmation so it is announced and keyboard users are not dropped on <body>.
  useEffect(() => {
    if (sent) statusRef.current?.focus();
  }, [sent]);

  function clearError(name: string) {
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values: Record<string, string> = {};
    new FormData(e.currentTarget).forEach((v, k) => {
      values[k] = typeof v === 'string' ? v : '';
    });
    if (isSpam(values)) {
      setSent(true);
      return;
    }
    const found = validateContact(form.fields, values);
    const firstBad = form.fields.find((f) => found[f.name]);
    focusAfterRender.current = firstBad ? `field-${firstBad.name}` : null;
    setErrors(found);
    if (!firstBad) setSent(true);
  }

  if (sent) {
    return (
      <div ref={statusRef} role="status" tabIndex={-1} data-tone="base" className="border-2 border-fg p-8 focus:outline-none">
        <p className="h3 h-display">Thanks, we&apos;ll be in touch.</p>
        <p className="mt-3 text-fg-2">This is a demo site, so nothing was actually sent.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      {form.fields.map((f) => {
        const id = `field-${f.name}`;
        const err = errors[f.name];
        const common = {
          id,
          name: f.name,
          'aria-invalid': err ? true : undefined,
          'aria-required': f.required || undefined,
          'aria-describedby': err ? `${id}-error` : undefined,
          onInput: () => clearError(f.name),
          className:
            'mt-2 min-h-12 w-full rounded-[2px] border border-fg-3 bg-chip px-3 py-2.5 text-fg focus:border-fg focus:outline-none focus:ring-2 focus:ring-link aria-[invalid=true]:border-error',
        };
        return (
          <div key={f.name}>
            <label htmlFor={id} className="text-small font-semibold">
              {f.label}
              {f.required && (
                <span aria-hidden="true" className="text-fg-2">
                  {' '}
                  *
                </span>
              )}
            </label>
            {f.type === 'textarea' ? (
              <textarea rows={5} {...common} />
            ) : f.type === 'select' ? (
              <select defaultValue="" {...common}>
                <option value="" disabled>
                  Choose one
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input type={f.type} autoComplete={AUTOCOMPLETE[f.name]} {...common} />
            )}
            {err && (
              <p id={`${id}-error`} className="text-small mt-2 font-semibold text-error">
                {err}
              </p>
            )}
          </div>
        );
      })}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn w-full">
        {form.submitLabel}
      </button>
    </form>
  );
}
