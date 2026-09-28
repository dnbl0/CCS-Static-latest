// figma node: 13152:1794 arrow_cta
export function ArrowCta2(_p = {}) {
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
      <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
        position: "absolute",
        left: 4,
        top: 6,
        width: 16,
        height: 12,
      }}>
        <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
      </svg>
    </div>
  );
}
export default ArrowCta2;
