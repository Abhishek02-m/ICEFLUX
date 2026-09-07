export default function Chip({ tone = 'grey', children }) {
  return <span className={`chip chip-${tone}`}>{children}</span>;
}
