// figma node: 65:4356 arrow/down
export function ArrowDown(_p = {}) {
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
      <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
        position: "absolute",
        left: 6,
        top: 8,
        width: 12,
        height: 7.4,
      }}>
        <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default ArrowDown;
