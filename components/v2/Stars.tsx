/**
 * A row of five stars for one review. Stars use the current text colour unless a class overrides it,
 * so they keep contrast on every tone. Screen readers hear one label, not five shapes.
 */
const PATH = 'M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9z';

export default function Stars({ rating = 5, size = 16, className = '' }: { rating?: number; size?: number; className?: string }) {
  const filled = Math.max(1, Math.min(5, Math.round(rating)));
  return (
    <span role="img" aria-label={`Rated ${filled} out of 5`} className={`inline-flex flex-none gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 20 20">
          <path d={PATH} fill={i <= filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}
