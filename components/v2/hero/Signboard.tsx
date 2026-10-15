import type { SiteConfigV2 } from '@/lib/types';
import { renderVoice } from '@/lib/voice';
import Button from '../Button';
import Label from '../Label';

/** Type-only hero: the label, a big H1 one sentence per line, the lead, one button and one text link, then the stats. */
export default function Signboard({ site }: { site: SiteConfigV2 }) {
  const { hero, stats } = site;
  return (
    <section data-tone={hero.tone} className="pt-12 pb-12 md:pt-16 md:pb-14">
      <div className="wrap">
        <Label>{hero.label}</Label>
        <h1 className="h1 h-display mt-6 max-w-[11em]">{renderVoice(hero.headline, { lines: true })}</h1>
        <p className="lead mt-6 text-fg-2">{hero.subhead}</p>
        <div className="mt-8 flex flex-col items-start gap-x-8 gap-y-3 md:flex-row md:items-center">
          <Button item={hero.cta} hero block />
          {hero.secondaryCta && <Button item={hero.secondaryCta} kind="secondary" arrow={site.design.button !== 'tab'} />}
        </div>
        {stats && stats.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-6 md:flex md:flex-wrap md:gap-x-16">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="text-small mt-2 max-w-[18ch] text-fg-2">{s.label}</dt>
                <dd className="numeral h-display">
                  {s.value}
                  {s.unit && <span className="ml-1 text-[0.45em]">{s.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
