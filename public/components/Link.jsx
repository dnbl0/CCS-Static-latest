import { Swap } from './Swap.jsx';

// figma node: 285:1402 Link (80 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "style2=" + __venc(p.style2) + '|' + "inverse=" + __venc(p.inverse) + '|' + "icon2=" + __venc(p.icon2) + '|' + "state=" + __venc(p.state);

export function Link(_p = {}) {
  const props = { ..._p, style2: _p.style2 ?? "default", label: _p.label ?? "Link label", inverse: _p.inverse ?? false, icon2: _p.icon2 ?? "none", state: _p.state ?? "default" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--text-tertiary-inverse)",
        }}>{props.icon ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--text-tertiary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 109,
        height: 72,
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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-down-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-hover-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--text-tertiary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--text-tertiary-inverse)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 145,
        height: 40,
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
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-down-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-hover-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--text-tertiary-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 145,
        height: 40,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body12 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body13 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body14 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body15 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body16 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 109,
        height: 40,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body17 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body18 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body19 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body20 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          height: 24,
          flexShrink: 0,
          color: "var(--text-tertiary-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body21 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          height: 24,
          flexShrink: 0,
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 84,
        height: 56,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body22 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          height: 24,
          flexShrink: 0,
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body23 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          height: 24,
          flexShrink: 0,
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body24 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          height: 24,
          flexShrink: 0,
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body25 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--text-tertiary-inverse)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body26 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 112,
        height: 32,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body27 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body28 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body29 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body30 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          color: "var(--text-tertiary-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body31 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 112,
        height: 32,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body32 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body33 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body34 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body35 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 84,
        height: 32,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body36 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--text-tertiary)",
        }}>{props.icon ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--text-tertiary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body37 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 109,
        height: 72,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body38 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-down)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body39 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-hover)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body40 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 32,
          height: 32,
          flexShrink: 0,
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body41 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--text-tertiary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--text-tertiary)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body42 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 145,
        height: 40,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body43 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-down)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body44 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-hover)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body45 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 24,
        whiteSpace: "nowrap",
        lineHeight: "32px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body46 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--text-tertiary)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body47 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 145,
        height: 40,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body48 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body49 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body50 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          width: 32,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body51 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body52 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 109,
        height: 40,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body53 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body54 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body55 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body56 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          height: 24,
          flexShrink: 0,
          color: "var(--text-tertiary)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body57 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          height: 24,
          flexShrink: 0,
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 84,
        height: 56,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body58 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          height: 24,
          flexShrink: 0,
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body59 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          height: 24,
          flexShrink: 0,
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body60 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          height: 24,
          flexShrink: 0,
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        textAlign: "center",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body61 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--text-tertiary)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body62 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 112,
        height: 32,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body63 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body64 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body65 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
    </div>
  );
  const __body66 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          color: "var(--text-tertiary)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-tertiary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body67 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 112,
        height: 32,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body68 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body69 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body70 = () => (
    <div className={props.className} style={{
      width: "fit-content",
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
          color: "var(--icon-interactive)",
        }}>{props.icon ?? <Swap />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body71 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 84,
        height: 32,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __impls = {
    // figma: Style=Prominent, Inverse=True, State=Disabled, Icon=Top
    "style2=prominent|inverse=true|icon2=top|state=disabled": __body0,
    // figma: Style=Prominent, Inverse=True, State=Focus, Icon=Top
    "style2=prominent|inverse=true|icon2=top|state=focus": __body1,
    // figma: Style=Prominent, Inverse=True, State=Down, Icon=Top
    "style2=prominent|inverse=true|icon2=top|state=down": __body2,
    // figma: Style=Prominent, Inverse=True, State=Hover, Icon=Top
    "style2=prominent|inverse=true|icon2=top|state=hover": __body3,
    // figma: Style=Prominent, Inverse=True, State=Default, Icon=Top
    "style2=prominent|inverse=true|icon2=top|state=default": __body4,
    // figma: Style=Prominent, Inverse=True, State=Disabled, Icon=Right
    "style2=prominent|inverse=true|icon2=right|state=disabled": __body5,
    // figma: Style=Prominent, Inverse=True, State=Focus, Icon=Right
    "style2=prominent|inverse=true|icon2=right|state=focus": __body6,
    // figma: Style=Prominent, Inverse=True, State=Down, Icon=Right
    "style2=prominent|inverse=true|icon2=right|state=down": __body7,
    // figma: Style=Prominent, Inverse=True, State=Hover, Icon=Right
    "style2=prominent|inverse=true|icon2=right|state=hover": __body8,
    // figma: Style=Prominent, Inverse=True, State=Default, Icon=Right
    "style2=prominent|inverse=true|icon2=right|state=default": __body9,
    // figma: Style=Prominent, Inverse=True, State=Disabled, Icon=Left
    "style2=prominent|inverse=true|icon2=left|state=disabled": __body10,
    // figma: Style=Prominent, Inverse=True, State=Focus, Icon=Left
    "style2=prominent|inverse=true|icon2=left|state=focus": __body11,
    // figma: Style=Prominent, Inverse=True, State=Down, Icon=Left
    "style2=prominent|inverse=true|icon2=left|state=down": __body12,
    // figma: Style=Prominent, Inverse=True, State=Hover, Icon=Left
    "style2=prominent|inverse=true|icon2=left|state=hover": __body13,
    // figma: Style=Prominent, Inverse=True, State=Default, Icon=Left
    "style2=prominent|inverse=true|icon2=left|state=default": __body14,
    // figma: Style=Prominent, Inverse=True, State=Disabled, Icon=None
    "style2=prominent|inverse=true|icon2=none|state=disabled": __body15,
    // figma: Style=Prominent, Inverse=True, State=Focus, Icon=None
    "style2=prominent|inverse=true|icon2=none|state=focus": __body16,
    // figma: Style=Prominent, Inverse=True, State=Down, Icon=None
    "style2=prominent|inverse=true|icon2=none|state=down": __body17,
    // figma: Style=Prominent, Inverse=True, State=Hover, Icon=None
    "style2=prominent|inverse=true|icon2=none|state=hover": __body18,
    // figma: Style=Prominent, Inverse=True, State=Default, Icon=None
    "style2=prominent|inverse=true|icon2=none|state=default": __body19,
    // figma: Style=Default, Inverse=True, State=Disabled, Icon=Top
    "style2=default|inverse=true|icon2=top|state=disabled": __body20,
    // figma: Style=Default, Inverse=True, State=Focus, Icon=Top
    "style2=default|inverse=true|icon2=top|state=focus": __body21,
    // figma: Style=Default, Inverse=True, State=Down, Icon=Top
    "style2=default|inverse=true|icon2=top|state=down": __body22,
    // figma: Style=Default, Inverse=True, State=Hover, Icon=Top
    "style2=default|inverse=true|icon2=top|state=hover": __body23,
    // figma: Style=Default, Inverse=True, State=Default, Icon=Top
    "style2=default|inverse=true|icon2=top|state=default": __body24,
    // figma: Style=Default, Inverse=True, State=Disabled, Icon=Right
    "style2=default|inverse=true|icon2=right|state=disabled": __body25,
    // figma: Style=Default, Inverse=True, State=Focus, Icon=Right
    "style2=default|inverse=true|icon2=right|state=focus": __body26,
    // figma: Style=Default, Inverse=True, State=Down, Icon=Right
    "style2=default|inverse=true|icon2=right|state=down": __body27,
    // figma: Style=Default, Inverse=True, State=Hover, Icon=Right
    "style2=default|inverse=true|icon2=right|state=hover": __body28,
    // figma: Style=Default, Inverse=True, State=Default, Icon=Right
    "style2=default|inverse=true|icon2=right|state=default": __body29,
    // figma: Style=Default, Inverse=True, State=Disabled, Icon=Left
    "style2=default|inverse=true|icon2=left|state=disabled": __body30,
    // figma: Style=Default, Inverse=True, State=Focus, Icon=Left
    "style2=default|inverse=true|icon2=left|state=focus": __body31,
    // figma: Style=Default, Inverse=True, State=Down, Icon=Left
    "style2=default|inverse=true|icon2=left|state=down": __body32,
    // figma: Style=Default, Inverse=True, State=Hover, Icon=Left
    "style2=default|inverse=true|icon2=left|state=hover": __body33,
    // figma: Style=Default, Inverse=True, State=Default, Icon=Left
    "style2=default|inverse=true|icon2=left|state=default": __body34,
    // figma: Style=Default, Inverse=True, State=Disabled, Icon=None
    "style2=default|inverse=true|icon2=none|state=disabled": __body15,
    // figma: Style=Default, Inverse=True, State=Focus, Icon=None
    "style2=default|inverse=true|icon2=none|state=focus": __body35,
    // figma: Style=Default, Inverse=True, State=Down, Icon=None
    "style2=default|inverse=true|icon2=none|state=down": __body17,
    // figma: Style=Default, Inverse=True, State=Hover, Icon=None
    "style2=default|inverse=true|icon2=none|state=hover": __body18,
    // figma: Style=Default, Inverse=True, State=Default, Icon=None
    "style2=default|inverse=true|icon2=none|state=default": __body19,
    // figma: Style=Prominent, Inverse=False, State=Disabled, Icon=Top
    "style2=prominent|inverse=false|icon2=top|state=disabled": __body36,
    // figma: Style=Prominent, Inverse=False, State=Focus, Icon=Top
    "style2=prominent|inverse=false|icon2=top|state=focus": __body37,
    // figma: Style=Prominent, Inverse=False, State=Down, Icon=Top
    "style2=prominent|inverse=false|icon2=top|state=down": __body38,
    // figma: Style=Prominent, Inverse=False, State=Hover, Icon=Top
    "style2=prominent|inverse=false|icon2=top|state=hover": __body39,
    // figma: Style=Prominent, Inverse=False, State=Default, Icon=Top
    "style2=prominent|inverse=false|icon2=top|state=default": __body40,
    // figma: Style=Prominent, Inverse=False, State=Disabled, Icon=Right
    "style2=prominent|inverse=false|icon2=right|state=disabled": __body41,
    // figma: Style=Prominent, Inverse=False, State=Focus, Icon=Right
    "style2=prominent|inverse=false|icon2=right|state=focus": __body42,
    // figma: Style=Prominent, Inverse=False, State=Down, Icon=Right
    "style2=prominent|inverse=false|icon2=right|state=down": __body43,
    // figma: Style=Prominent, Inverse=False, State=Hover, Icon=Right
    "style2=prominent|inverse=false|icon2=right|state=hover": __body44,
    // figma: Style=Prominent, Inverse=False, State=Default, Icon=Right
    "style2=prominent|inverse=false|icon2=right|state=default": __body45,
    // figma: Style=Prominent, Inverse=False, State=Disabled, Icon=Left
    "style2=prominent|inverse=false|icon2=left|state=disabled": __body46,
    // figma: Style=Prominent, Inverse=False, State=Focus, Icon=Left
    "style2=prominent|inverse=false|icon2=left|state=focus": __body47,
    // figma: Style=Prominent, Inverse=False, State=Down, Icon=Left
    "style2=prominent|inverse=false|icon2=left|state=down": __body48,
    // figma: Style=Prominent, Inverse=False, State=Hover, Icon=Left
    "style2=prominent|inverse=false|icon2=left|state=hover": __body49,
    // figma: Style=Prominent, Inverse=False, State=Default, Icon=Left
    "style2=prominent|inverse=false|icon2=left|state=default": __body50,
    // figma: Style=Prominent, Inverse=False, State=Disabled, Icon=None
    "style2=prominent|inverse=false|icon2=none|state=disabled": __body51,
    // figma: Style=Prominent, Inverse=False, State=Focus, Icon=None
    "style2=prominent|inverse=false|icon2=none|state=focus": __body52,
    // figma: Style=Prominent, Inverse=False, State=Down, Icon=None
    "style2=prominent|inverse=false|icon2=none|state=down": __body53,
    // figma: Style=Prominent, Inverse=False, State=Hover, Icon=None
    "style2=prominent|inverse=false|icon2=none|state=hover": __body54,
    // figma: Style=Prominent, Inverse=False, State=Default, Icon=None
    "style2=prominent|inverse=false|icon2=none|state=default": __body55,
    // figma: Style=Default, Inverse=False, State=Disabled, Icon=Top
    "style2=default|inverse=false|icon2=top|state=disabled": __body56,
    // figma: Style=Default, Inverse=False, State=Focus, Icon=Top
    "style2=default|inverse=false|icon2=top|state=focus": __body57,
    // figma: Style=Default, Inverse=False, State=Down, Icon=Top
    "style2=default|inverse=false|icon2=top|state=down": __body58,
    // figma: Style=Default, Inverse=False, State=Hover, Icon=Top
    "style2=default|inverse=false|icon2=top|state=hover": __body59,
    // figma: Style=Default, Inverse=False, State=Default, Icon=Top
    "style2=default|inverse=false|icon2=top|state=default": __body60,
    // figma: Style=Default, Inverse=False, State=Disabled, Icon=Right
    "style2=default|inverse=false|icon2=right|state=disabled": __body61,
    // figma: Style=Default, Inverse=False, State=Focus, Icon=Right
    "style2=default|inverse=false|icon2=right|state=focus": __body62,
    // figma: Style=Default, Inverse=False, State=Down, Icon=Right
    "style2=default|inverse=false|icon2=right|state=down": __body63,
    // figma: Style=Default, Inverse=False, State=Hover, Icon=Right
    "style2=default|inverse=false|icon2=right|state=hover": __body64,
    // figma: Style=Default, Inverse=False, State=Default, Icon=Right
    "style2=default|inverse=false|icon2=right|state=default": __body65,
    // figma: Style=Default, Inverse=False, State=Disabled, Icon=Left
    "style2=default|inverse=false|icon2=left|state=disabled": __body66,
    // figma: Style=Default, Inverse=False, State=Focus, Icon=Left
    "style2=default|inverse=false|icon2=left|state=focus": __body67,
    // figma: Style=Default, Inverse=False, State=Down, Icon=Left
    "style2=default|inverse=false|icon2=left|state=down": __body68,
    // figma: Style=Default, Inverse=False, State=Hover, Icon=Left
    "style2=default|inverse=false|icon2=left|state=hover": __body69,
    // figma: Style=Default, Inverse=False, State=Default, Icon=Left
    "style2=default|inverse=false|icon2=left|state=default": __body70,
    // figma: Style=Default, Inverse=False, State=Disabled, Icon=None
    "style2=default|inverse=false|icon2=none|state=disabled": __body51,
    // figma: Style=Default, Inverse=False, State=Focus, Icon=None
    "style2=default|inverse=false|icon2=none|state=focus": __body71,
    // figma: Style=Default, Inverse=False, State=Down, Icon=None
    "style2=default|inverse=false|icon2=none|state=down": __body53,
    // figma: Style=Default, Inverse=False, State=Hover, Icon=None
    "style2=default|inverse=false|icon2=none|state=hover": __body54,
    // figma: Style=Default, Inverse=False, State=Default, Icon=None
    "style2=default|inverse=false|icon2=none|state=default": __body55,
  };
  return (__impls[__vkey(props)] ?? __body55)();
}
export default Link;
