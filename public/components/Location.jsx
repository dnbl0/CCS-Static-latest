// figma node: 7283:4614 location
export function Location(_p = {}) {
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
      <svg width={16} height={20} viewBox="0 0 16 20" fill="none" style={{
        position: "absolute",
        left: 4,
        top: 2,
        width: 16,
        height: 20,
      }}>
        <path d={"M 8 10 C 8.55 10 9.021 9.804 9.413 9.413 C 9.804 9.021 10 8.55 10 8 C 10 7.45 9.804 6.979 9.413 6.588 C 9.021 6.196 8.55 6 8 6 C 7.45 6 6.979 6.196 6.588 6.588 C 6.196 6.979 6 7.45 6 8 C 6 8.55 6.196 9.021 6.588 9.413 C 6.979 9.804 7.45 10 8 10 Z M 8 20 C 5.317 17.717 3.313 15.596 1.988 13.637 C 0.663 11.679 0 9.867 0 8.2 C 0 5.7 0.804 3.708 2.413 2.225 C 4.021 0.742 5.883 0 8 0 C 10.117 0 11.979 0.742 13.588 2.225 C 15.196 3.708 16 5.7 16 8.2 C 16 9.867 15.337 11.679 14.012 13.637 C 12.688 15.596 10.683 17.717 8 20 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default Location;
