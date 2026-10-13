'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { FormSpec } from '@/lib/types';
import { HONEYPOT_FIELD } from '@/lib/constants';
import { isSpam, validateContact } from '@/lib/validate-contact';

const AUTOCOMPLETE: Record<string, string> = { name: 'name', email: 'email', phone: 'tel' };

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
      <div ref={statusRef} role="status" tabIndex={-1} className="glow rounded-2xl border border-border-default bg-surface-card p-8 focus:outline-none">
        <p className="text-xl font-semibold">Thanks, we&apos;ll be in touch.</p>
        <p className="mt-2 text-text-secondary">This is a demo site, so nothing was actually sent.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-border-default bg-surface-card p-6">
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
            'mt-1 w-full rounded-xl border border-text-muted bg-surface-base px-3 py-2 text-text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent aria-[invalid=true]:border-error',
        };
        return (
          <div key={f.name}>
            <label htmlFor={id} className="text-sm font-medium">
              {f.label}
              {f.required && (
                <span aria-hidden="true" className="text-accent">
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
              <p id={`${id}-error`} className="mt-1 text-sm text-error">
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
      <button type="submit" className="w-full rounded-xl bg-accent px-5 py-3 font-semibold text-accent-contrast hover:bg-accent-hover">
        {form.submitLabel}
      </button>
    </form>
  );
}
