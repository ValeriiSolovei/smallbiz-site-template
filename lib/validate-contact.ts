import type { FieldSpec } from './types';
import { HONEYPOT_FIELD } from './constants';

export const REQUIRED_MESSAGE = 'This field is required.';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isSpam(values: Record<string, string>): boolean {
  return (values[HONEYPOT_FIELD] ?? '').trim() !== '';
}

export function validateContact(fields: FieldSpec[], values: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const v = (values[f.name] ?? '').trim();
    if (!v) {
      if (f.required) errors[f.name] = REQUIRED_MESSAGE;
      continue;
    }
    const max = f.type === 'textarea' ? 2000 : 200;
    if (v.length > max) {
      errors[f.name] = `Please keep this under ${max} characters.`;
      continue;
    }
    if (f.type === 'email' && !EMAIL.test(v)) errors[f.name] = 'Please enter a valid email address.';
    if (f.type === 'tel') {
      const d = v.replace(/\D/g, '');
      const ok = d.length === 10 || (d.length === 11 && d.startsWith('1'));
      if (!ok) errors[f.name] = 'Please enter a 10-digit phone number.';
    }
    if (f.type === 'select' && !(f.options ?? []).includes(v)) errors[f.name] = 'Please choose one of the options.';
  }
  return errors;
}
