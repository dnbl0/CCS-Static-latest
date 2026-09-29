// figma node: 25:17 swap
export function Swap(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "rgb(0,0,0)",
      ...props.style,
    }}>
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
        position: "absolute",
        left: 4,
        top: 4,
        width: 16,
        height: 16,
      }}>
        <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default Swap;
