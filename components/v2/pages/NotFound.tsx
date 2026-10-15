import Button from '../Button';

export default function NotFoundV2() {
  return (
    <section data-tone="base" data-space="loose">
      <div className="wrap">
        <h1 className="h1 h-display">Page not found</h1>
        <p className="lead mt-6 text-fg-2">That page does not exist.</p>
        <div className="mt-8">
          <Button item={{ label: 'Back to home', href: '/' }} />
        </div>
      </div>
    </section>
  );
}
