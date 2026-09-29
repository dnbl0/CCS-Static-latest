// figma node: 8529:76997 error
export function Error(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--icon-error)",
      ...props.style,
    }}>
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none" style={{
        position: "absolute",
        left: 3,
        top: 3,
        width: 18,
        height: 18,
      }}>
        <path d={"M 5.25 18 L 0 12.75 L 0 5.25 L 5.25 0 L 12.75 0 L 18 5.25 L 18 12.75 L 12.75 18 L 5.25 18 Z M 6.15 13.25 L 9 10.4 L 11.85 13.25 L 13.25 11.85 L 10.4 9 L 13.25 6.15 L 11.85 4.75 L 9 7.6 L 6.15 4.75 L 4.75 6.15 L 7.6 9 L 4.75 11.85 L 6.15 13.25 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default Error;
