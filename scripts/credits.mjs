/** Escape a value for a Markdown table cell: no pipes, no line breaks. */
const cell = (value) => String(value ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();

/** @param {Record<string, {file:string, alt?:string, imageUrl?:string, sourceUrl:string, license:string, licenseUrl:string, creator:string}[]>} bySite */
export function buildCredits(bySite) {
  const lines = [
    '# Photo credits',
    '',
    'Every photo is in the public domain (CC0 or Public Domain Mark) and was found through [Openverse](https://openverse.org). No attribution is required; creators are listed here anyway.',
    '',
  ];
  for (const [site, entries] of Object.entries(bySite).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`## ${site}`, '', '| File | Photo | Creator | Licence |', '|---|---|---|---|');
    for (const e of entries) {
      lines.push(`| public/${site}/${e.file} | [source](${e.sourceUrl}) | ${cell(e.creator) || 'Unknown'} | [${cell(e.license)}](${e.licenseUrl}) |`);
    }
    lines.push('');
  }
  return lines.join('\n');
}
