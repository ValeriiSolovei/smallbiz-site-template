import type { SiteConfigV2 } from '@/lib/types';

/** The site's name as set type: the main line (with an optional italic part, like an "&") over a small sub line. */
export default function Wordmark({ wordmark }: { wordmark: SiteConfigV2['wordmark'] }) {
  const { main, sub, voice } = wordmark;
  const [before, ...after] = voice && main.includes(voice) ? main.split(voice) : [main];
  return (
    <span className="flex flex-col">
      <span className="h-display text-[1.625rem]">
        {before}
        {after.length > 0 && (
          <>
            <span className="wordmark-voice">{voice}</span>
            {after.join(voice)}
          </>
        )}
      </span>
      {sub && <span className="wordmark-sub mt-0.5 text-fg-2">{sub}</span>}
    </span>
  );
}
