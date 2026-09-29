import { Swap } from './Swap.jsx';

// figma node: 25:67 Button (40 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "style2=" + __venc(p.style2) + '|' + "state=" + __venc(p.state) + '|' + "label2=" + __venc(p.label2);

export function Button(_p = {}) {
  const props = { ..._p, label: _p.label ?? "Button label", style2: _p.style2 ?? "primary", state: _p.state ?? "default", label2: _p.label2 ?? "on", iconLeft: _p.iconLeft ?? false, iconRight: _p.iconRight ?? false };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "2px solid var(--button-stroke-disabled)",
      borderRight: "2px solid var(--button-stroke-disabled)",
      borderBottom: "2px solid var(--button-stroke-disabled)",
      borderLeft: "2px solid var(--button-stroke-disabled)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-disabled)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "2px solid var(--button-stroke-tertiary-inverse)",
      borderRight: "2px solid var(--button-stroke-tertiary-inverse)",
      borderBottom: "2px solid var(--button-stroke-tertiary-inverse)",
      borderLeft: "2px solid var(--button-stroke-tertiary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 56,
        height: 56,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-tertiary-inverse-down)",
      borderTop: "2px solid var(--button-stroke-tertiary-inverse)",
      borderRight: "2px solid var(--button-stroke-tertiary-inverse)",
      borderBottom: "2px solid var(--button-stroke-tertiary-inverse)",
      borderLeft: "2px solid var(--button-stroke-tertiary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-tertiary-inverse-hover)",
      borderTop: "2px solid var(--button-stroke-tertiary-inverse)",
      borderRight: "2px solid var(--button-stroke-tertiary-inverse)",
      borderBottom: "2px solid var(--button-stroke-tertiary-inverse)",
      borderLeft: "2px solid var(--button-stroke-tertiary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "2px solid var(--button-stroke-tertiary-inverse)",
      borderRight: "2px solid var(--button-stroke-tertiary-inverse)",
      borderBottom: "2px solid var(--button-stroke-tertiary-inverse)",
      borderLeft: "2px solid var(--button-stroke-tertiary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "2px solid var(--button-stroke-disabled)",
      borderRight: "2px solid var(--button-stroke-disabled)",
      borderBottom: "2px solid var(--button-stroke-disabled)",
      borderLeft: "2px solid var(--button-stroke-disabled)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-disabled)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-disabled)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-disabled)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "2px solid var(--button-stroke-tertiary-inverse)",
      borderRight: "2px solid var(--button-stroke-tertiary-inverse)",
      borderBottom: "2px solid var(--button-stroke-tertiary-inverse)",
      borderLeft: "2px solid var(--button-stroke-tertiary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-tertiary-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 135,
        height: 56,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-tertiary-inverse-down)",
      borderTop: "2px solid var(--button-stroke-tertiary-inverse)",
      borderRight: "2px solid var(--button-stroke-tertiary-inverse)",
      borderBottom: "2px solid var(--button-stroke-tertiary-inverse)",
      borderLeft: "2px solid var(--button-stroke-tertiary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-tertiary-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-tertiary-inverse-hover)",
      borderTop: "2px solid var(--button-stroke-tertiary-inverse)",
      borderRight: "2px solid var(--button-stroke-tertiary-inverse)",
      borderBottom: "2px solid var(--button-stroke-tertiary-inverse)",
      borderLeft: "2px solid var(--button-stroke-tertiary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-tertiary-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "2px solid var(--button-stroke-tertiary-inverse)",
      borderRight: "2px solid var(--button-stroke-tertiary-inverse)",
      borderBottom: "2px solid var(--button-stroke-tertiary-inverse)",
      borderLeft: "2px solid var(--button-stroke-tertiary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-tertiary-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary-inverse)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "2px solid var(--button-stroke-tertiary)",
      borderRight: "2px solid var(--button-stroke-tertiary)",
      borderBottom: "2px solid var(--button-stroke-tertiary)",
      borderLeft: "2px solid var(--button-stroke-tertiary)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 56,
        height: 56,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-tertiary-down)",
      borderTop: "2px solid var(--button-stroke-tertiary)",
      borderRight: "2px solid var(--button-stroke-tertiary)",
      borderBottom: "2px solid var(--button-stroke-tertiary)",
      borderLeft: "2px solid var(--button-stroke-tertiary)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body12 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-tertiary-hover)",
      borderTop: "2px solid var(--button-stroke-tertiary)",
      borderRight: "2px solid var(--button-stroke-tertiary)",
      borderBottom: "2px solid var(--button-stroke-tertiary)",
      borderLeft: "2px solid var(--button-stroke-tertiary)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body13 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "2px solid var(--button-stroke-tertiary)",
      borderRight: "2px solid var(--button-stroke-tertiary)",
      borderBottom: "2px solid var(--button-stroke-tertiary)",
      borderLeft: "2px solid var(--button-stroke-tertiary)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body14 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "2px solid var(--button-stroke-tertiary)",
      borderRight: "2px solid var(--button-stroke-tertiary)",
      borderBottom: "2px solid var(--button-stroke-tertiary)",
      borderLeft: "2px solid var(--button-stroke-tertiary)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-tertiary)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-tertiary)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 135,
        height: 56,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body15 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-tertiary-down)",
      borderTop: "2px solid var(--button-stroke-tertiary)",
      borderRight: "2px solid var(--button-stroke-tertiary)",
      borderBottom: "2px solid var(--button-stroke-tertiary)",
      borderLeft: "2px solid var(--button-stroke-tertiary)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-tertiary)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-tertiary)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body16 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-tertiary-hover)",
      borderTop: "2px solid var(--button-stroke-tertiary)",
      borderRight: "2px solid var(--button-stroke-tertiary)",
      borderBottom: "2px solid var(--button-stroke-tertiary)",
      borderLeft: "2px solid var(--button-stroke-tertiary)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-tertiary)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-tertiary)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body17 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "2px solid var(--button-stroke-tertiary)",
      borderRight: "2px solid var(--button-stroke-tertiary)",
      borderBottom: "2px solid var(--button-stroke-tertiary)",
      borderLeft: "2px solid var(--button-stroke-tertiary)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-tertiary)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-tertiary)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-tertiary)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body18 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-disabled)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-disabled)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body19 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-secondary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 56,
        height: 56,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body20 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-secondary-down)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body21 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-secondary-hover)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body22 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-secondary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body23 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-disabled)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-disabled)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-disabled)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-disabled)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body24 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-secondary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 135,
        height: 56,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body25 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-secondary-down)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body26 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-secondary-hover)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body27 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-secondary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body28 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-primary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 56,
        height: 56,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body29 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-primary-down)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body30 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-primary-hover)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body31 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-primary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-075) * 1px)",
      paddingTop: "calc(var(--spacing-075) * 1px)",
      paddingRight: "calc(var(--spacing-075) * 1px)",
      paddingBottom: "calc(var(--spacing-075) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
    </div>
  );
  const __body32 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-primary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 135,
        height: 56,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body33 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-primary-down)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body34 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-primary-hover)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __body35 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--button-fill-primary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
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
          color: "var(--button-icon-default)",
        }}>{props.iconLeft2 ?? <Swap />}</div>
      )}
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
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--button-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.label}</span>
      </div>
      {props.iconRight && (
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--button-icon-default)",
        }}>{props.iconRight2 ?? <Swap />}</div>
      )}
    </div>
  );
  const __impls = {
    // figma: Style=Tertiary inverse, State=Disabled, Label=Off
    "style2=tertiary inverse|state=disabled|label2=off": __body0,
    // figma: Style=Tertiary inverse, State=Focus, Label=Off
    "style2=tertiary inverse|state=focus|label2=off": __body1,
    // figma: Style=Tertiary inverse, State=Down, Label=Off
    "style2=tertiary inverse|state=down|label2=off": __body2,
    // figma: Style=Tertiary inverse, State=Hover, Label=Off
    "style2=tertiary inverse|state=hover|label2=off": __body3,
    // figma: Style=Tertiary inverse, State=Default, Label=Off
    "style2=tertiary inverse|state=default|label2=off": __body4,
    // figma: Style=Tertiary inverse, State=Disabled, Label=On
    "style2=tertiary inverse|state=disabled|label2=on": __body5,
    // figma: Style=Tertiary inverse, State=Focus, Label=On
    "style2=tertiary inverse|state=focus|label2=on": __body6,
    // figma: Style=Tertiary inverse, State=Down, Label=On
    "style2=tertiary inverse|state=down|label2=on": __body7,
    // figma: Style=Tertiary inverse, State=Hover, Label=On
    "style2=tertiary inverse|state=hover|label2=on": __body8,
    // figma: Style=Tertiary inverse, State=Default, Label=On
    "style2=tertiary inverse|state=default|label2=on": __body9,
    // figma: Style=Tertiary, State=Disabled, Label=Off
    "style2=tertiary|state=disabled|label2=off": __body0,
    // figma: Style=Tertiary, State=Focus, Label=Off
    "style2=tertiary|state=focus|label2=off": __body10,
    // figma: Style=Tertiary, State=Down, Label=Off
    "style2=tertiary|state=down|label2=off": __body11,
    // figma: Style=Tertiary, State=Hover, Label=Off
    "style2=tertiary|state=hover|label2=off": __body12,
    // figma: Style=Tertiary, State=Default, Label=Off
    "style2=tertiary|state=default|label2=off": __body13,
    // figma: Style=Tertiary, State=Disabled, Label=On
    "style2=tertiary|state=disabled|label2=on": __body5,
    // figma: Style=Tertiary, State=Focus, Label=On
    "style2=tertiary|state=focus|label2=on": __body14,
    // figma: Style=Tertiary, State=Down, Label=On
    "style2=tertiary|state=down|label2=on": __body15,
    // figma: Style=Tertiary, State=Hover, Label=On
    "style2=tertiary|state=hover|label2=on": __body16,
    // figma: Style=Tertiary, State=Default, Label=On
    "style2=tertiary|state=default|label2=on": __body17,
    // figma: Style=Secondary, State=Disabled, Label=Off
    "style2=secondary|state=disabled|label2=off": __body18,
    // figma: Style=Secondary, State=Focus, Label=Off
    "style2=secondary|state=focus|label2=off": __body19,
    // figma: Style=Secondary, State=Down, Label=Off
    "style2=secondary|state=down|label2=off": __body20,
    // figma: Style=Secondary, State=Hover, Label=Off
    "style2=secondary|state=hover|label2=off": __body21,
    // figma: Style=Secondary, State=Default, Label=Off
    "style2=secondary|state=default|label2=off": __body22,
    // figma: Style=Secondary, State=Disabled, Label=On
    "style2=secondary|state=disabled|label2=on": __body23,
    // figma: Style=Secondary, State=Focus, Label=On
    "style2=secondary|state=focus|label2=on": __body24,
    // figma: Style=Secondary, State=Down, Label=On
    "style2=secondary|state=down|label2=on": __body25,
    // figma: Style=Secondary, State=Hover, Label=On
    "style2=secondary|state=hover|label2=on": __body26,
    // figma: Style=Secondary, State=Default, Label=On
    "style2=secondary|state=default|label2=on": __body27,
    // figma: Style=Primary, State=Disabled, Label=Off
    "style2=primary|state=disabled|label2=off": __body18,
    // figma: Style=Primary, State=Focus, Label=Off
    "style2=primary|state=focus|label2=off": __body28,
    // figma: Style=Primary, State=Down, Label=Off
    "style2=primary|state=down|label2=off": __body29,
    // figma: Style=Primary, State=Hover, Label=Off
    "style2=primary|state=hover|label2=off": __body30,
    // figma: Style=Primary, State=Default, Label=Off
    "style2=primary|state=default|label2=off": __body31,
    // figma: Style=Primary, State=Disabled, Label=On
    "style2=primary|state=disabled|label2=on": __body23,
    // figma: Style=Primary, State=Focus, Label=On
    "style2=primary|state=focus|label2=on": __body32,
    // figma: Style=Primary, State=Down, Label=On
    "style2=primary|state=down|label2=on": __body33,
    // figma: Style=Primary, State=Hover, Label=On
    "style2=primary|state=hover|label2=on": __body34,
    // figma: Style=Primary, State=Default, Label=On
    "style2=primary|state=default|label2=on": __body35,
  };
  return (__impls[__vkey(props)] ?? __body35)();
}
export default Button;
