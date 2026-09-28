// figma node: 7382:8205 home
export function Home(_p = {}) {
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
      <svg width={16} height={18} viewBox="0 0 16 18" fill="none" style={{
        position: "absolute",
        left: 4,
        top: 3,
        width: 16,
        height: 18,
      }}>
        <path d={"M 0 18 L 0 6 L 8 0 L 16 6 L 16 18 L 10 18 L 10 11 L 6 11 L 6 18 L 0 18 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default Home;
