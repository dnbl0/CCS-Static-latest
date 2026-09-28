// figma node: 7283:4139 imagesmode
export function Imagesmode(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: 48,
      height: 48,
      overflow: "hidden",
      position: "relative",
      color: "rgb(0,0,0)",
      ...props.style,
    }}>
      <svg width={36} height={36} viewBox="0 0 36 36" fill="none" style={{
        position: "absolute",
        left: 6,
        top: 6,
        width: 36,
        height: 36,
      }}>
        <path d={"M 3 36 C 2.2 36 1.5 35.7 0.9 35.1 C 0.3 34.5 0 33.8 0 33 L 0 3 C 0 2.2 0.3 1.5 0.9 0.9 C 1.5 0.3 2.2 0 3 0 L 33 0 C 33.8 0 34.5 0.3 35.1 0.9 C 35.7 1.5 36 2.2 36 3 L 36 33 C 36 33.8 35.7 34.5 35.1 35.1 C 34.5 35.7 33.8 36 33 36 L 3 36 Z M 3 33 L 33 33 L 33 3 L 3 3 L 3 33 Z M 5.8 28.15 L 30.25 28.15 L 22.9 18.35 L 16.3 26.9 L 11.65 20.55 L 5.8 28.15 Z M 11.006 13.5 C 11.702 13.5 12.292 13.256 12.775 12.769 C 13.258 12.282 13.5 11.69 13.5 10.994 C 13.5 10.298 13.256 9.708 12.769 9.225 C 12.282 8.742 11.69 8.5 10.994 8.5 C 10.298 8.5 9.708 8.744 9.225 9.231 C 8.742 9.718 8.5 10.31 8.5 11.006 C 8.5 11.702 8.744 12.292 9.231 12.775 C 9.718 13.258 10.31 13.5 11.006 13.5 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default Imagesmode;
