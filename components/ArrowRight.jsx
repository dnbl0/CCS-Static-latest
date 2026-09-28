// figma node: 7382:8203 arrow/right
export function ArrowRight(_p = {}) {
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
      <svg width={7.400} height={12} viewBox="0 0 7.400 12" fill="none" style={{
        position: "absolute",
        left: 8,
        top: 6,
        width: 7.4,
        height: 12,
      }}>
        <path d={"M 4.6 6 L 0 1.4 L 1.4 0 L 7.4 6 L 1.4 12 L 0 10.6 L 4.6 6 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default ArrowRight;
