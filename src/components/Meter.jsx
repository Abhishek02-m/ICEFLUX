export default function Meter({ pct, tone, style, barStyle }) {
  return (
    <div className={`meter${tone ? ` ${tone}` : ''}`} style={style}>
      <i style={{ width: `${pct}%`, ...barStyle }} />
    </div>
  );
}
