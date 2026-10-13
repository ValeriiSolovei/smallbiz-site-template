export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`;
}
