// figma node: 8529:76962 success
export function Success(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--icon-success)",
      ...props.style,
    }}>
      <svg width={20} height={20} viewBox="0 0 20 20" fill="none" style={{
        position: "absolute",
        left: 2,
        top: 2,
        width: 20,
        height: 20,
      }}>
        <path d={"M 8.6 14.6 L 15.65 7.55 L 14.25 6.15 L 8.6 11.8 L 5.75 8.95 L 4.35 10.35 L 8.6 14.6 Z M 10 20 C 8.617 20 7.317 19.737 6.1 19.212 C 4.883 18.688 3.825 17.975 2.925 17.075 C 2.025 16.175 1.313 15.117 0.788 13.9 C 0.262 12.683 0 11.383 0 10 C 0 8.617 0.262 7.317 0.788 6.1 C 1.313 4.883 2.025 3.825 2.925 2.925 C 3.825 2.025 4.883 1.313 6.1 0.788 C 7.317 0.262 8.617 0 10 0 C 11.383 0 12.683 0.262 13.9 0.788 C 15.117 1.313 16.175 2.025 17.075 2.925 C 17.975 3.825 18.688 4.883 19.212 6.1 C 19.737 7.317 20 8.617 20 10 C 20 11.383 19.737 12.683 19.212 13.9 C 18.688 15.117 17.975 16.175 17.075 17.075 C 16.175 17.975 15.117 18.688 13.9 19.212 C 12.683 19.737 11.383 20 10 20 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default Success;
