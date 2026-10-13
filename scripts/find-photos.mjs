const query = process.argv.slice(2).join(' ').trim();
if (!query) {
  console.error('Usage: npm run find-photos -- <search words>');
  process.exit(1);
}
const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=30&orientation=landscape`;
const res = await fetch(url, { headers: { accept: 'application/json', 'user-agent': 'Mozilla/5.0' } });
if (!res.ok) {
  console.error(`Search failed: ${res.status}. Fall back to browsing unsplash.com/s/photos/<query> and copying IDs from photo URLs.`);
  process.exit(1);
}
const data = await res.json();
for (const r of data.results ?? []) {
  if (r.premium || r.plus) continue;
  console.log([r.id, `${r.width}x${r.height}`, r.user?.name, r.user?.links?.html, (r.alt_description ?? '').slice(0, 90)].join(' | '));
}
