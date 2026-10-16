/** A " · " separated list where each item keeps its separator on the same line, so no line ends on a lone dot. */
export default function Joined({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={item}>
          <span className="whitespace-nowrap">
            {item}
            {i < items.length - 1 ? ' ·' : ''}
          </span>
          {i < items.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}
