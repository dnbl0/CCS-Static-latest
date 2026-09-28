// figma node: 8529:76970 warning
export function Warning(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--icon-warning)",
      ...props.style,
    }}>
      <svg width={22} height={19} viewBox="0 0 22 19" fill="none" style={{
        position: "absolute",
        left: 1,
        top: 2,
        width: 22,
        height: 19,
      }}>
        <path d={"M 0 19 L 11 0 L 22 19 L 0 19 Z M 11 16 C 11.283 16 11.521 15.904 11.713 15.713 C 11.904 15.521 12 15.283 12 15 C 12 14.717 11.904 14.479 11.713 14.288 C 11.521 14.096 11.283 14 11 14 C 10.717 14 10.479 14.096 10.288 14.288 C 10.096 14.479 10 14.717 10 15 C 10 15.283 10.096 15.521 10.288 15.713 C 10.479 15.904 10.717 16 11 16 Z M 10 13 L 12 13 L 12 8 L 10 8 L 10 13 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default Warning;
