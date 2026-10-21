import type { Light } from '@/lib/types';

const POSITION: Record<Light, number> = { low: 0, medium: 50, 'bright-indirect': 72, bright: 100 };
const SPOKEN: Record<Light, string> = { low: 'low', medium: 'medium', 'bright-indirect': 'bright, indirect', bright: 'bright' };

/**
 * The line-and-dot mark, used as a light meter: a thin line from "low" to "bright" with a dot where the plant
 * wants to sit. It draws in --mark: ink on the light grounds, the accent pink on the dark band.
 */
export default function LightScale({ light, className = '' }: { light: Light; className?: string }) {
  return (
    <span role="img" aria-label={`Light: ${SPOKEN[light]}`} className={`light-scale ${className}`}>
      <span aria-hidden="true" className="light-end">low</span>
      <span aria-hidden="true" className="light-track">
        <span className="light-dot" style={{ left: `${POSITION[light]}%` }} />
      </span>
      <span aria-hidden="true" className="light-end">bright</span>
    </span>
  );
}
