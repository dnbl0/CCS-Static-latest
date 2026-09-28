import { Error } from './Error.jsx';

// figma node: 8324:23427 .input_validation (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "inverse=" + __venc(p.inverse);

export function InputValidation(_p = {}) {
  const props = { ..._p, inverse: _p.inverse ?? false, validation: _p.validation ?? "Error message" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 320,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}>{props.icon1 ?? <Error />}</div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "1px 0px 1px 0px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingTop: "calc(var(--spacing-006) * 1px)",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "21px",
          color: "var(--text-error)",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>{props.validation}</span>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 320,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-error-inverse)",
        }}>{props.icon1 ?? <Error />}</div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "1px 0px 1px 0px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingTop: "calc(var(--spacing-006) * 1px)",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "21px",
          color: "var(--text-error-inverse)",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>{props.validation}</span>
      </div>
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
export default InputValidation;
