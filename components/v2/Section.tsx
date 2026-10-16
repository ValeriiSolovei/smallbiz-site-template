import type { ReactNode } from 'react';
import type { Space, Tone, Voice } from '@/lib/types';
import { renderVoice } from '@/lib/voice';
import Label from './Label';

type HeadProps = {
  label?: { n?: string; text: string };
  title?: Voice;
  /** A short structural rule under the heading. */
  headRule?: boolean;
  /** Extra content under the heading, such as the section's call action. */
  aside?: ReactNode;
};

/** Label, H2 and optional extras: the heading group of a section. */
export function SectionHead({ label, title, headRule, aside }: HeadProps) {
  if (!label && !title && !aside) return null;
  return (
    <div className="section-head">
      {label && <Label n={label.n}>{label.text}</Label>}
      {title && <h2 className={`h2 h-display ${label ? 'mt-4' : ''}`}>{renderVoice(title)}</h2>}
      {headRule && <div aria-hidden="true" className="rule-structural mt-6 w-20" />}
      {aside && <div className="mt-8">{aside}</div>}
    </div>
  );
}

type Props = HeadProps & {
  tone: Tone;
  space: Space;
  /** 'side': heading in columns 1-4, content in 5-12 from 768 px. */
  layout?: 'stack' | 'side';
  /** The previous section has an element crossing into this one. */
  afterCross?: boolean;
  id?: string;
  className?: string;
  children?: ReactNode;
};

/** A full-width band with one tone and one padding step. */
export default function Section({ tone, space, label, title, headRule, aside, layout = 'stack', afterCross, id, className = '', children }: Props) {
  const head = <SectionHead label={label} title={title} headRule={headRule} aside={aside} />;
  const hasHead = Boolean(label || title || aside);
  return (
    <section id={id} data-tone={tone} data-space={space} data-after-cross={afterCross ? '' : undefined} className={className}>
      <div className="wrap">
        {layout === 'side' ? (
          <div className="grid-12">
            <div className="md:col-span-4">{head}</div>
            <div className="md:col-span-8">{children}</div>
          </div>
        ) : (
          <>
            {hasHead && <div className="max-w-[52rem]">{head}</div>}
            {children && <div className={hasHead ? 'mt-8' : ''}>{children}</div>}
          </>
        )}
      </div>
    </section>
  );
}
