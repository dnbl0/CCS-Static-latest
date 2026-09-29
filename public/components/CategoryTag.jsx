import { Swap } from './Swap.jsx';

// figma node: 7283:5303 .category_tag
export function CategoryTag(_p = {}) {
  const props = { ..._p, label: _p.label ?? "Tag Label" };
  return (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--brand-1100)",
      display: "flex",
      flexDirection: "row",
      padding: "4px 4px 4px 4px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-025) * 1px)",
      paddingTop: "calc(var(--spacing-025) * 1px)",
      paddingRight: "calc(var(--spacing-025) * 1px)",
      paddingBottom: "calc(var(--spacing-025) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "0px 4px 0px 4px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-025) * 1px)",
        paddingRight: "calc(var(--spacing-025) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          letterSpacing: "0.080em",
          color: "var(--text-brand-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
    </div>
  );
}
export default CategoryTag;
