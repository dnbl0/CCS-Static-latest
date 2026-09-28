// figma node: 65:4739 .input_resize_handle
export function InputResizeHandle(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      padding: "0.500px 0.500px 0.500px 0.500px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "var(--icon-brand)",
      ...props.style,
    }}>
      <svg width={7} viewBox="0 0 7 7" fill="none" style={{
        position: "relative",
        width: 7,
        borderWidth: "calc(var(--stroke-100) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <path d={"M 4.354 7.354 L 7.354 4.354 L 6.646 3.646 L 3.646 6.646 L 4.354 7.354 Z M 0.354 7.354 L 7.354 0.354 L 6.646 -0.354 L -0.354 6.646 L 0.354 7.354 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default InputResizeHandle;
