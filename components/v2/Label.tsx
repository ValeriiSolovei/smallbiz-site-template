/** Section label; the per-site style comes from html[data-label]. The text sits in its own span. */
export default function Label({ n, children, className = '' }: { n?: string; children: string; className?: string }) {
  return (
    <p className={`label ${className}`}>
      {n && (
        <span className="n" aria-hidden="true">
          {n}
        </span>
      )}
      <span className="text">{children}</span>
    </p>
  );
}
