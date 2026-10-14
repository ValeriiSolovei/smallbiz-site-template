import type { FieldSpec } from './types';
import { HONEYPOT_FIELD } from './constants';

export const REQUIRED_MESSAGE = 'This field is required.';
// Domain may not start with a dot, contain '..', or end with a dot.
const EMAIL = /^[^\s@]+@(?!\.)(?!.*\.\.)[^\s@]+\.[^\s@.]{2,}$/;
// A trailing extension like "ext. 12", "x204", "#7" or "poste 12" is allowed and ignored.
const EXTENSION = /\s*(?:extension|ext\.?|poste|x|#)\s*\d{1,6}$/i;
const PHONE_CHARS = /^[\d\s()+.-]+$/;

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
      errors[f.name] = `Please keep this to ${max} characters or fewer (you have ${v.length}).`;
      continue;
    }
    if (f.type === 'email' && !EMAIL.test(v)) errors[f.name] = 'Please enter a valid email address.';
    if (f.type === 'tel') {
      const number = v.replace(EXTENSION, '');
      const d = number.replace(/\D/g, '');
      const ok = PHONE_CHARS.test(number) && (d.length === 10 || (d.length === 11 && d.startsWith('1')));
      if (!ok) errors[f.name] = 'Please enter a 10-digit phone number.';
    }
    if (f.type === 'select' && !(f.options ?? []).includes(v)) errors[f.name] = 'Please choose one of the options.';
  }
  return errors;
}
