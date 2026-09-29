import { Swap } from './Swap.jsx';

// figma node: 780:6155 .fact (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "type=" + __venc(p.type);

export function Fact(_p = {}) {
  const props = { ..._p, type: _p.type ?? "default", icon: _p.icon ?? true, figure: _p.figure ?? "0000", description: _p.description ?? "IMPRESSIVE STAT" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 288,
      borderTop: "1px solid var(--stroke-weak)",
      borderRight: "1px solid var(--stroke-weak)",
      borderBottom: "1px solid var(--stroke-weak)",
      borderLeft: "1px solid var(--stroke-weak)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-100) * 1px)",
      padding: "16px 16px 16px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-100) * 1px)",
      paddingTop: "calc(var(--spacing-100) * 1px)",
      paddingRight: "calc(var(--spacing-100) * 1px)",
      paddingBottom: "calc(var(--spacing-100) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.icon && (
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--icon-brand)",
        }}>{props.icon2 ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-050) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 40,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.figure}</span>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.5,
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.description}</span>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 288,
      borderTop: "1px solid var(--stroke-weak-inverse)",
      borderRight: "1px solid var(--stroke-weak-inverse)",
      borderBottom: "1px solid var(--stroke-weak-inverse)",
      borderLeft: "1px solid var(--stroke-weak-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-100) * 1px)",
      padding: "16px 16px 16px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-100) * 1px)",
      paddingTop: "calc(var(--spacing-100) * 1px)",
      paddingRight: "calc(var(--spacing-100) * 1px)",
      paddingBottom: "calc(var(--spacing-100) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.icon && (
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--icon-brand-inverse)",
        }}>{props.icon2 ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-050) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 40,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.figure}</span>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.5,
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.description}</span>
      </div>
    </div>
  );
  const __impls = {
    // figma: Type=Default
    "type=default": __body0,
    // figma: Type=Inverse
    "type=inverse": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default Fact;
