'use client';

import { useState, type FormEvent } from 'react';
import type { FormSpec } from '@/lib/types';
import { HONEYPOT_FIELD } from '@/lib/constants';
import { isSpam, validateContact } from '@/lib/validate-contact';

const AUTOCOMPLETE: Record<string, string> = { name: 'name', email: 'email', phone: 'tel' };

export default function ContactForm({ form }: { form: FormSpec }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

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
    setErrors(found);
    if (Object.keys(found).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="glow rounded-2xl border border-border-default bg-surface-card p-8">
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
          'aria-describedby': err ? `${id}-error` : undefined,
          className:
            'mt-1 w-full rounded-xl border border-border-default bg-surface-base px-3 py-2 text-text-primary focus:border-accent focus:outline-none',
        };
        return (
          <div key={f.name}>
            <label htmlFor={id} className="text-sm font-medium">
              {f.label}
              {f.required && <span className="text-accent"> *</span>}
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
              <p id={`${id}-error`} className="mt-1 text-sm text-accent">
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
