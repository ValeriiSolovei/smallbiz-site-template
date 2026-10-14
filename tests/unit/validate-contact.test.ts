import { describe, it, expect } from 'vitest';
import { validateContact, isSpam, REQUIRED_MESSAGE } from '@/lib/validate-contact';
import { HONEYPOT_FIELD } from '@/lib/constants';
import type { FieldSpec } from '@/lib/types';

const fields: FieldSpec[] = [
  { name: 'name', label: 'Your name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: false },
  { name: 'jobType', label: 'Type of job', type: 'select', required: true, options: ['Panel upgrade', 'Other'] },
  { name: 'details', label: 'Details', type: 'textarea', required: true },
];
const valid = { name: 'Alex', email: 'alex@example.com', phone: '', jobType: 'Other', details: 'Need two outlets moved.' };

describe('validateContact', () => {
  it('accepts a complete form', () => {
    expect(validateContact(fields, valid)).toEqual({});
  });
  it('flags empty and whitespace-only required fields', () => {
    const errors = validateContact(fields, { ...valid, name: '   ', details: '' });
    expect(errors).toEqual({ name: REQUIRED_MESSAGE, details: REQUIRED_MESSAGE });
  });
  it('flags an unchosen required select with the same message', () => {
    expect(validateContact(fields, { ...valid, jobType: '' })).toEqual({ jobType: REQUIRED_MESSAGE });
  });
  it('lets optional fields stay empty', () => {
    expect(validateContact(fields, { ...valid, phone: '' })).toEqual({});
  });
  it.each(['alex@example.com', 'alex+quotes@example.co', 'a.b@sub.example.ca'])('accepts email %s', (email) => {
    expect(validateContact(fields, { ...valid, email })).toEqual({});
  });
  it.each(['alex', 'alex@', 'alex@example', 'alex @example.com', 'alex@example..com', 'alex@.example.com', 'alex@example.com.'])('rejects email %s', (email) => {
    expect(validateContact(fields, { ...valid, email })).toEqual({ email: 'Please enter a valid email address.' });
  });
  it.each(['(416) 555-0142', '416-555-0142', '416.555.0142', '+1 416 555 0142', '4165550142', '1-416-555-0142', '416-555-0142 ext. 12', '(416) 555-0142 x204', '416 555 0142 #7'])('accepts phone %s', (phone) => {
    expect(validateContact(fields, { ...valid, phone })).toEqual({});
  });
  it.each(['555-0142', '22345678901', 'call me', '416-555-0142 call after 5', 'abc4165550142'])('rejects phone %s', (phone) => {
    expect(validateContact(fields, { ...valid, phone })).toEqual({ phone: 'Please enter a 10-digit phone number.' });
  });
  it('rejects a select value that is not an option', () => {
    expect(validateContact(fields, { ...valid, jobType: 'Hacked' })).toEqual({ jobType: 'Please choose one of the options.' });
  });
  it('caps message length', () => {
    expect(validateContact(fields, { ...valid, details: 'x'.repeat(2000) })).toEqual({});
    expect(validateContact(fields, { ...valid, details: 'x'.repeat(3000) })).toEqual({ details: 'Please keep this to 2000 characters or fewer (you have 3000).' });
    expect(validateContact(fields, { ...valid, name: 'x'.repeat(201) })).toEqual({ name: 'Please keep this to 200 characters or fewer (you have 201).' });
  });
  it('treats a missing key like an empty value', () => {
    const { details: _omit, ...rest } = valid;
    void _omit;
    expect(validateContact(fields, rest)).toEqual({ details: REQUIRED_MESSAGE });
  });
});

describe('isSpam', () => {
  it('is false when the honeypot is empty or absent', () => {
    expect(isSpam({})).toBe(false);
    expect(isSpam({ [HONEYPOT_FIELD]: '  ' })).toBe(false);
  });
  it('is true when the honeypot is filled', () => {
    expect(isSpam({ [HONEYPOT_FIELD]: 'http://spam.example' })).toBe(true);
  });
});
