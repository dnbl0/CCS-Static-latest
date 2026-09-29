import { ArrowDown } from './ArrowDown.jsx';

// figma node: 1545:6262 .accordion_item (12 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "expanded=" + __venc(p.expanded) + '|' + "state=" + __venc(p.state);

export function AccordionItem(_p = {}) {
  const props = { ..._p, title: _p.title ?? "Accordion header", expanded: _p.expanded ?? false, state: _p.state ?? "default", content: _p.content ?? "", body: _p.body ?? true, body2: _p.body2 ?? "The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.", contentSlot: _p.contentSlot ?? false };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 400,
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
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
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>{props.title}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon1 ?? <ArrowDown />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 408,
        height: 64,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      isolation: "isolate",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderTop: "1px solid var(--stroke-weaker-inverse)",
        borderRight: "1px solid var(--stroke-weaker-inverse)",
        borderBottom: "1px solid var(--stroke-weaker-inverse)",
        borderLeft: "1px solid var(--stroke-weaker-inverse)",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 2,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexGrow: 1,
        }}>{props.title}</span>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            transform: "matrix(-1,0,0,-1,0,0)",
            flexShrink: 0,
            color: "var(--icon-interactive-inverse)",
          }}>{props.icon1 ?? <ArrowDown />}</div>
        <div style={{
          position: "absolute",
          left: -4,
          top: -4,
          width: 408,
          height: 64,
          borderTop: "2px solid var(--focus-focus-inverse)",
          borderRight: "2px solid var(--focus-focus-inverse)",
          borderBottom: "2px solid var(--focus-focus-inverse)",
          borderLeft: "2px solid var(--focus-focus-inverse)",
        }} />
      </div>
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderTop: "1px solid var(--stroke-weaker-inverse)",
        borderRight: "1px solid var(--stroke-weaker-inverse)",
        borderBottom: "1px solid var(--stroke-weaker-inverse)",
        borderLeft: "1px solid var(--stroke-weaker-inverse)",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 1,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.body && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-primary-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.body2}</span>
        )}
        {props.contentSlot && (
        <div style={{
          position: "relative",
          height: 105,
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        )}
      </div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 400,
      backgroundColor: "var(--button-fill-tertiary-inverse-hover)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
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
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        textDecoration: "underline",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>{props.title}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon1 ?? <ArrowDown />}</div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      isolation: "isolate",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        backgroundColor: "var(--button-fill-tertiary-inverse-hover)",
        borderTop: "1px solid var(--stroke-weaker-inverse)",
        borderRight: "1px solid var(--stroke-weaker-inverse)",
        borderBottom: "1px solid var(--stroke-weaker-inverse)",
        borderLeft: "1px solid var(--stroke-weaker-inverse)",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 2,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          textDecoration: "underline",
          flexGrow: 1,
        }}>{props.title}</span>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            transform: "matrix(-1,0,0,-1,0,0)",
            flexShrink: 0,
            color: "var(--icon-interactive-inverse)",
          }}>{props.icon1 ?? <ArrowDown />}</div>
      </div>
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderTop: "1px solid var(--stroke-weaker-inverse)",
        borderRight: "1px solid var(--stroke-weaker-inverse)",
        borderBottom: "1px solid var(--stroke-weaker-inverse)",
        borderLeft: "1px solid var(--stroke-weaker-inverse)",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 1,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.body && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-primary-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.body2}</span>
        )}
        {props.contentSlot && (
        <div style={{
          position: "relative",
          height: 105,
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        )}
      </div>
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 400,
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
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
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>{props.title}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive-inverse)",
        }}>{props.icon1 ?? <ArrowDown />}</div>
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      isolation: "isolate",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderTop: "1px solid var(--stroke-weaker-inverse)",
        borderRight: "1px solid var(--stroke-weaker-inverse)",
        borderBottom: "1px solid var(--stroke-weaker-inverse)",
        borderLeft: "1px solid var(--stroke-weaker-inverse)",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 2,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexGrow: 1,
        }}>{props.title}</span>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            transform: "matrix(-1,0,0,-1,0,0)",
            flexShrink: 0,
            color: "var(--icon-interactive-inverse)",
          }}>{props.icon1 ?? <ArrowDown />}</div>
      </div>
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0.05)",
        borderTop: "1px solid var(--stroke-weaker-inverse)",
        borderRight: "1px solid var(--stroke-weaker-inverse)",
        borderBottom: "1px solid var(--stroke-weaker-inverse)",
        borderLeft: "1px solid var(--stroke-weaker-inverse)",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 1,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.body && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-primary-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.body2}</span>
        )}
        {props.contentSlot && (
        <div style={{
          position: "relative",
          height: 105,
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        )}
      </div>
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: 400,
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
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
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "24px",
        color: "var(--link-text-default)",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>{props.title}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon1 ?? <ArrowDown />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 408,
        height: 64,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      isolation: "isolate",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.05)",
        borderTop: "1px solid var(--stroke-weaker)",
        borderRight: "1px solid var(--stroke-weaker)",
        borderBottom: "1px solid var(--stroke-weaker)",
        borderLeft: "1px solid var(--stroke-weaker)",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 2,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexGrow: 1,
        }}>{props.title}</span>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            transform: "matrix(-1,0,0,-1,0,0)",
            flexShrink: 0,
            color: "var(--icon-interactive)",
          }}>{props.icon1 ?? <ArrowDown />}</div>
        <div style={{
          position: "absolute",
          left: -4,
          top: -4,
          width: 408,
          height: 64,
          borderTop: "2px solid var(--focus-focus)",
          borderRight: "2px solid var(--focus-focus)",
          borderBottom: "2px solid var(--focus-focus)",
          borderLeft: "2px solid var(--focus-focus)",
        }} />
      </div>
      <div style={{
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.05)",
        borderTop: "1px solid var(--stroke-weaker)",
        borderRight: "1px solid var(--stroke-weaker)",
        borderBottom: "1px solid var(--stroke-weaker)",
        borderLeft: "1px solid var(--stroke-weaker)",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 1,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.body && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-primary)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.body2}</span>
        )}
        {props.contentSlot && (
        <div style={{
          position: "relative",
          height: 105,
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        )}
      </div>
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: 400,
      backgroundColor: "var(--button-fill-tertiary-hover)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
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
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "24px",
        color: "var(--link-text-default)",
        textDecoration: "underline",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>{props.title}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon1 ?? <ArrowDown />}</div>
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      isolation: "isolate",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        backgroundColor: "var(--button-fill-tertiary-hover)",
        borderTop: "1px solid var(--stroke-weaker)",
        borderRight: "1px solid var(--stroke-weaker)",
        borderBottom: "1px solid var(--stroke-weaker)",
        borderLeft: "1px solid var(--stroke-weaker)",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 2,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default)",
          textDecoration: "underline",
          flexGrow: 1,
        }}>{props.title}</span>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            transform: "matrix(-1,0,0,-1,0,0)",
            flexShrink: 0,
            color: "var(--icon-interactive)",
          }}>{props.icon1 ?? <ArrowDown />}</div>
      </div>
      <div style={{
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.05)",
        borderTop: "1px solid var(--stroke-weaker)",
        borderRight: "1px solid var(--stroke-weaker)",
        borderBottom: "1px solid var(--stroke-weaker)",
        borderLeft: "1px solid var(--stroke-weaker)",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 1,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.body && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-primary)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.body2}</span>
        )}
        {props.contentSlot && (
        <div style={{
          position: "relative",
          height: 105,
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        )}
      </div>
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: 400,
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
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
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "24px",
        color: "var(--link-text-default)",
        flexGrow: 1,
        alignSelf: "stretch",
      }}>{props.title}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-interactive)",
        }}>{props.icon1 ?? <ArrowDown />}</div>
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      isolation: "isolate",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.05)",
        borderTop: "1px solid var(--stroke-weaker)",
        borderRight: "1px solid var(--stroke-weaker)",
        borderBottom: "1px solid var(--stroke-weaker)",
        borderLeft: "1px solid var(--stroke-weaker)",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 2,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexGrow: 1,
        }}>{props.title}</span>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            transform: "matrix(-1,0,0,-1,0,0)",
            flexShrink: 0,
            color: "var(--icon-interactive)",
          }}>{props.icon1 ?? <ArrowDown />}</div>
      </div>
      <div style={{
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.05)",
        borderTop: "1px solid var(--stroke-weaker)",
        borderRight: "1px solid var(--stroke-weaker)",
        borderBottom: "1px solid var(--stroke-weaker)",
        borderLeft: "1px solid var(--stroke-weaker)",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        padding: "16px 16px 16px 16px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-100) * 1px)",
        paddingTop: "calc(var(--spacing-100) * 1px)",
        paddingRight: "calc(var(--spacing-100) * 1px)",
        paddingBottom: "calc(var(--spacing-100) * 1px)",
        zIndex: 1,
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.body && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-primary)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.body2}</span>
        )}
        {props.contentSlot && (
        <div style={{
          position: "relative",
          height: 105,
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        )}
      </div>
    </div>
  );
  const __impls = {
    // figma: Expanded=False, State=Focus inverse
    "expanded=false|state=focus inverse": __body0,
    // figma: Expanded=True, State=Focus inverse
    "expanded=true|state=focus inverse": __body1,
    // figma: Expanded=False, State=Hover inverse
    "expanded=false|state=hover inverse": __body2,
    // figma: Expanded=True, State=Hover inverse
    "expanded=true|state=hover inverse": __body3,
    // figma: Expanded=False, State=Default inverse
    "expanded=false|state=default inverse": __body4,
    // figma: Expanded=True, State=Default inverse
    "expanded=true|state=default inverse": __body5,
    // figma: Expanded=False, State=Focus
    "expanded=false|state=focus": __body6,
    // figma: Expanded=True, State=Focus
    "expanded=true|state=focus": __body7,
    // figma: Expanded=False, State=Hover
    "expanded=false|state=hover": __body8,
    // figma: Expanded=True, State=Hover
    "expanded=true|state=hover": __body9,
    // figma: Expanded=False, State=Default
    "expanded=false|state=default": __body10,
    // figma: Expanded=True, State=Default
    "expanded=true|state=default": __body11,
  };
  return (__impls[__vkey(props)] ?? __body10)();
}
export default AccordionItem;
