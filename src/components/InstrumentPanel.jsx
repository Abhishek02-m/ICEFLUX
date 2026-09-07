// Wraps an AntarcticMap variant in the "instrument" frame styling
// (corner brackets, label row, caption) used throughout the prototype.
export default function InstrumentPanel({ title, sub, caption, style, footer, children }) {
  return (
    <div className="instrument" style={style}>
      <div className="bracket tl" /><div className="bracket tr" />
      <div className="bracket bl" /><div className="bracket br" />
      <div className="instrument-label">
        <span>{title}</span>
        {sub ? <span className="sub">{sub}</span> : null}
      </div>
      <div className="chart-wrap">{children}</div>
      {caption ? <p className="map-caption">{caption}</p> : null}
      {footer}
    </div>
  );
}
