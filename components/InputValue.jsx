import { Caret } from './Caret.jsx';
import { Swap } from './Swap.jsx';

// figma node: 65:4603 .input_value (8 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "inverse=" + __venc(p.inverse) + '|' + "type=" + __venc(p.type);

export function InputValue(_p = {}) {
  const props = { ..._p, value: _p.value ?? "Value", iconLeft: _p.iconLeft ?? false, inverse: _p.inverse ?? false, iconRight: _p.iconRight ?? false, type: _p.type ?? "none" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 320,
      height: 48,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.iconLeft && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-null)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
      <div style={{ position: "relative", flexGrow: 1, alignSelf: "stretch" }} />
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 320,
      height: 48,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.iconLeft && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-null)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary)",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>{props.value}</span>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 320,
      height: 48,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.iconLeft && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-null)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1,
            height: 24,
          }}>{props.icon1 ?? <Caret caret={"on"} />}</div>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 320,
      height: 48,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.iconLeft && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-null)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>{props.value}</span>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 320,
      height: 48,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.iconLeft && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-null-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
      <div style={{ position: "relative", flexGrow: 1, alignSelf: "stretch" }} />
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 320,
      height: 48,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.iconLeft && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-null-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary-inverse)",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>{props.value}</span>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: 320,
      height: 48,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.iconLeft && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-null-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1,
          height: 24,
        }}>
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1,
            height: 24,
            backgroundColor: "var(--text-primary-inverse)",
          }} />
        </div>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: 320,
      height: 48,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.iconLeft && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-null-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>{props.value}</span>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __impls = {
    // figma: Inverse=False, Type=None
    "inverse=false|type=none": __body0,
    // figma: Inverse=False, Type=Placeholder
    "inverse=false|type=placeholder": __body1,
    // figma: Inverse=False, Type=Active
    "inverse=false|type=active": __body2,
    // figma: Inverse=False, Type=Completed
    "inverse=false|type=completed": __body3,
    // figma: Inverse=True, Type=None
    "inverse=true|type=none": __body4,
    // figma: Inverse=True, Type=Placeholder
    "inverse=true|type=placeholder": __body5,
    // figma: Inverse=True, Type=Active
    "inverse=true|type=active": __body6,
    // figma: Inverse=True, Type=Completed
    "inverse=true|type=completed": __body7,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default InputValue;
