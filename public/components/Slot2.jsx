// figma node: 12694:4913 slot (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "type=" + __venc(p.type);

export function Slot2(_p = {}) {
  const props = { ..._p, type: _p.type ?? "default" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 430,
      backgroundColor: "rgb(238,224,255)",
      borderTop: "1px solid rgb(151,71,255)",
      borderRight: "1px solid rgb(151,71,255)",
      borderBottom: "1px solid rgb(151,71,255)",
      borderLeft: "1px solid rgb(151,71,255)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      padding: "16px 16px 16px 16px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-100) * 1px)",
      paddingTop: "calc(var(--spacing-100) * 1px)",
      paddingRight: "calc(var(--spacing-100) * 1px)",
      paddingBottom: "calc(var(--spacing-100) * 1px)",
      position: "relative",
      color: "rgb(75,0,173)",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        width: 24,
        height: 24,
        overflow: "hidden",
        flexShrink: 0,
      }}>
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
          position: "absolute",
          left: 4,
          top: 4,
          width: 16,
          height: 16,
        }}>
          <path d={"M 0.175 16 L 0.175 14.5 L 3.425 14.5 L 3.05 14.2 C 1.983 13.35 1.208 12.425 0.725 11.425 C 0.242 10.425 0 9.308 0 8.075 C 0 6.308 0.521 4.721 1.563 3.313 C 2.604 1.904 3.975 0.933 5.675 0.4 L 5.675 1.95 C 4.425 2.433 3.417 3.238 2.65 4.363 C 1.883 5.488 1.5 6.725 1.5 8.075 C 1.5 9.125 1.696 10.038 2.088 10.813 C 2.479 11.588 3.008 12.258 3.675 12.825 L 4.425 13.35 L 4.425 10.25 L 5.925 10.25 L 5.925 16 L 0.175 16 Z M 10.35 15.625 L 10.35 14.05 C 11.617 13.567 12.625 12.763 13.375 11.638 C 14.125 10.513 14.5 9.275 14.5 7.925 C 14.5 7.125 14.304 6.313 13.913 5.488 C 13.521 4.663 13.008 3.933 12.375 3.3 L 11.65 2.65 L 11.65 5.75 L 10.15 5.75 L 10.15 0 L 15.9 0 L 15.9 1.5 L 12.625 1.5 L 13 1.85 C 14 2.783 14.75 3.783 15.25 4.85 C 15.75 5.917 16 6.942 16 7.925 C 16 9.692 15.483 11.283 14.45 12.7 C 13.417 14.117 12.05 15.092 10.35 15.625 Z"} fill="currentColor" fillRule="evenodd" />
        </svg>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.5,
          color: "rgb(75,0,173)",
          flexShrink: 0,
          alignSelf: "stretch",
          whiteSpace: "nowrap",
        }}>{props.text1 ?? "Slot Component"}</span>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.5,
          color: "rgb(75,0,173)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.text2 ?? "This is a placeholder component. Swap it with any component using the instance swapper, or delete if not needed."}</span>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 430,
      backgroundColor: "rgb(238,224,255)",
      borderTop: "1px solid rgb(151,71,255)",
      borderRight: "1px solid rgb(151,71,255)",
      borderBottom: "1px solid rgb(151,71,255)",
      borderLeft: "1px solid rgb(151,71,255)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-012) * 1px)",
      padding: "4px 8px 4px 8px",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingTop: "calc(var(--spacing-025) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      paddingBottom: "calc(var(--spacing-025) * 1px)",
      position: "relative",
      color: "rgb(75,0,173)",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        width: 24,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
          position: "absolute",
          left: 4,
          top: 4,
          width: 16,
          height: 16,
        }}>
          <path d={"M 0.175 16 L 0.175 14.5 L 3.425 14.5 L 3.05 14.2 C 1.983 13.35 1.208 12.425 0.725 11.425 C 0.242 10.425 0 9.308 0 8.075 C 0 6.308 0.521 4.721 1.563 3.313 C 2.604 1.904 3.975 0.933 5.675 0.4 L 5.675 1.95 C 4.425 2.433 3.417 3.238 2.65 4.363 C 1.883 5.488 1.5 6.725 1.5 8.075 C 1.5 9.125 1.696 10.038 2.088 10.813 C 2.479 11.588 3.008 12.258 3.675 12.825 L 4.425 13.35 L 4.425 10.25 L 5.925 10.25 L 5.925 16 L 0.175 16 Z M 10.35 15.625 L 10.35 14.05 C 11.617 13.567 12.625 12.763 13.375 11.638 C 14.125 10.513 14.5 9.275 14.5 7.925 C 14.5 7.125 14.304 6.313 13.913 5.488 C 13.521 4.663 13.008 3.933 12.375 3.3 L 11.65 2.65 L 11.65 5.75 L 10.15 5.75 L 10.15 0 L 15.9 0 L 15.9 1.5 L 12.625 1.5 L 13 1.85 C 14 2.783 14.75 3.783 15.25 4.85 C 15.75 5.917 16 6.942 16 7.925 C 16 9.692 15.483 11.283 14.45 12.7 C 13.417 14.117 12.05 15.092 10.35 15.625 Z"} fill="currentColor" fillRule="evenodd" />
        </svg>
      </div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        lineHeight: 1.5,
        color: "rgb(75,0,173)",
        flexShrink: 0,
      }}>{props.text1 ?? "Slot Component"}</span>
    </div>
  );
  const __impls = {
    // figma: Type=Default
    "type=default": __body0,
    // figma: Type=Small
    "type=small": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default Slot2;
