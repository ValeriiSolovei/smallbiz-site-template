/** @param {Record<string, {file:string, unsplashId:string, alt?:string, photographer:string, photographerUrl:string}[]>} bySite */
export function buildCredits(bySite) {
  const lines = [
    '# Photo credits',
    '',
    'All photos are from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license) (free for commercial use; credit appreciated).',
    '',
  ];
  for (const [site, entries] of Object.entries(bySite).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`## ${site}`, '', '| File | Photo | Photographer |', '|---|---|---|');
    for (const e of entries) {
      lines.push(`| public/${site}/${e.file} | [${e.unsplashId}](https://unsplash.com/photos/${e.unsplashId}) | [${e.photographer}](${e.photographerUrl}) |`);
    }
    lines.push('');
  }
  return lines.join('\n');
}
