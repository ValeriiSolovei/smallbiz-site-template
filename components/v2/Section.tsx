import type { ReactNode } from 'react';
import type { Space, Tone, Voice } from '@/lib/types';
import { renderVoice } from '@/lib/voice';
import Label from './Label';

type Props = {
  tone: Tone;
  space: Space;
  label?: { n?: string; text: string };
  title?: Voice;
  /** 'side': heading in columns 1-4, content in 5-12 from 768 px. */
  layout?: 'stack' | 'side';
  /** The previous section has an element crossing into this one. */
  afterCross?: boolean;
  id?: string;
  className?: string;
  children?: ReactNode;
};

/** A full-width band with one tone and one padding step. */
export default function Section({ tone, space, label, title, layout = 'stack', afterCross, id, className = '', children }: Props) {
  const head =
    label || title ? (
      <div className="section-head">
        {label && <Label n={label.n}>{label.text}</Label>}
        {title && <h2 className={`h2 h-display ${label ? 'mt-4' : ''}`}>{renderVoice(title)}</h2>}
      </div>
    ) : null;
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
            {head && <div className="max-w-[52rem]">{head}</div>}
            {children && <div className={head ? 'mt-8' : ''}>{children}</div>}
          </>
        )}
      </div>
    </section>
  );
}
