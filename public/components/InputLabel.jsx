// figma node: 8324:23433 .input_label (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "inverse=" + __venc(p.inverse);

export function InputLabel(_p = {}) {
  const props = { ..._p, inverse: _p.inverse ?? false, required: _p.required ?? false, hint: _p.hint ?? true, label: _p.label ?? "Label", hint2: _p.hint2 ?? "Hint text" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 320,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      gap: "calc(var(--spacing-000) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "27px",
          color: "var(--text-brand)",
          flexShrink: 0,
        }}>{props.label}</span>
        {props.required && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "27px",
          color: "var(--text-error)",
          flexShrink: 0,
        }}>{props.text1 ?? "*"}</span>
        )}
      </div>
      {props.hint && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "21px",
        color: "var(--text-secondary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.hint2}</span>
      )}
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 320,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      gap: "calc(var(--spacing-000) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "27px",
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
        }}>{props.label}</span>
        {props.required && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "27px",
          color: "var(--text-error)",
          flexShrink: 0,
        }}>{props.text1 ?? "*"}</span>
        )}
      </div>
      {props.hint && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "21px",
        color: "var(--text-secondary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.hint2}</span>
      )}
    </div>
  );
  const __impls = {
    // figma: Inverse=False
    "inverse=false": __body0,
    // figma: Inverse=True
    "inverse=true": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default InputLabel;
