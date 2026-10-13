// Search Openverse for public-domain (CC0 / Public Domain Mark) photos.
// Prints one JSON line per candidate; copy entries for sites/<id>/photos.json from this output only.
// Anonymous Openverse limits: 20 requests a minute, 200 a day.
const query = process.argv.slice(2).join(' ').trim();
if (!query) {
  console.error('Usage: npm run find-photos -- <search words>');
  process.exit(1);
}
const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&license=cc0,pdm&size=large&page_size=20`;
const res = await fetch(url, { headers: { accept: 'application/json', 'user-agent': 'smallbiz-site-template/0.1 (personal project)' } });
if (!res.ok) {
  console.error(`Search failed: ${res.status}`);
  process.exit(1);
}
const data = await res.json();
for (const r of data.results ?? []) {
  const license = `${r.license === 'pdm' ? 'Public Domain Mark' : r.license.toUpperCase()} ${r.license_version}`;
  console.log(
    JSON.stringify({
      source: r.source,
      size: `${r.width}x${r.height}`,
      title: r.title,
      imageUrl: r.url,
      sourceUrl: r.foreign_landing_url,
      license,
      licenseUrl: r.license_url,
      creator: r.creator ?? '',
    }),
  );
}
