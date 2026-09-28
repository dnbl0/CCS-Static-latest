// figma node: 8529:77634 flag_aboriginal
export function FlagAboriginal(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: 48,
      height: 24,
      overflow: "hidden",
      position: "relative",
      ...props.style,
    }}>
      <svg width={48} height={24} viewBox="0 0 48 24" fill="none" style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 48,
        height: 24,
        color: "rgb(204,0,0)",
      }}>
        <path d={"M 48 0 L 0 0 L 0 24 L 48 24 L 48 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      <svg width={48} height={12} viewBox="0 0 48 12" fill="none" style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 48,
        height: 12,
        color: "rgb(0,0,0)",
      }}>
        <path d={"M 48 0 L 0 0 L 0 12 L 48 12 L 48 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      <svg width={14.400} height={14.400} viewBox="0 0 14.400 14.400" fill="none" style={{
        position: "absolute",
        left: 16.8,
        top: 4.8,
        width: 14.4,
        height: 14.4,
        color: "rgb(255,255,0)",
      }}>
        <path d={"M 7.2 14.4 C 11.176 14.4 14.4 11.176 14.4 7.2 C 14.4 3.224 11.176 0 7.2 0 C 3.224 0 0 3.224 0 7.2 C 0 11.176 3.224 14.4 7.2 14.4 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default FlagAboriginal;
