import { CloseSmall } from './CloseSmall.jsx';

// figma node: 297:3879 Tag (60 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "style2=" + __venc(p.style2) + '|' + "state=" + __venc(p.state) + '|' + "dIsmissable=" + __venc(p.dIsmissable) + '|' + "selected=" + __venc(p.selected);

export function Tag(_p = {}) {
  const props = { ..._p, label: _p.label ?? "Tag Label", style2: _p.style2 ?? "primary", state: _p.state ?? "default", dIsmissable: _p.dIsmissable ?? "off", selected: _p.selected ?? false };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-inverse-selected-default)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-inverse)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 98,
        height: 32,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-inverse-selected-default)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 98,
        height: 32,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-inverse)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 114,
        height: 32,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-inverse-down)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-inverse-selected-down)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-secondary-inverse-down)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-inverse)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-inverse-hover)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-inverse-selected-hover)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-secondary-inverse-hover)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-inverse)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body12 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body13 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-inverse-selected-default)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body14 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary-inverse)",
      borderRight: "1px solid var(--tag-stroke-secondary-inverse)",
      borderBottom: "1px solid var(--tag-stroke-secondary-inverse)",
      borderLeft: "1px solid var(--tag-stroke-secondary-inverse)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-inverse)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body15 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body16 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-selected-default)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body17 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-default)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body18 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 98,
        height: 32,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body19 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-selected-default)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 98,
        height: 32,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body20 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-default)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 114,
        height: 32,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body21 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-down)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body22 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-selected-down)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body23 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-secondary-down)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-default)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body24 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-hover)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body25 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-selected-hover)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body26 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-secondary-hover)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-default)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body27 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body28 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-secondary-selected-default)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body29 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "rgba(255,255,255,0)",
      borderTop: "1px solid var(--tag-stroke-secondary)",
      borderRight: "1px solid var(--tag-stroke-secondary)",
      borderBottom: "1px solid var(--tag-stroke-secondary)",
      borderLeft: "1px solid var(--tag-stroke-secondary)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-default)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body30 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-inverse-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body31 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-inverse-selected)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body32 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-primary-inverse-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-inverse)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body33 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-inverse-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 98,
        height: 32,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body34 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-inverse-selected)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 98,
        height: 32,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body35 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-primary-inverse-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-inverse)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 114,
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
      backgroundColor: "var(--tag-fill-primary-inverse-down)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body37 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-primary-inverse-down)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-inverse)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body38 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-inverse-hover)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body39 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-primary-inverse-hover)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-inverse)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body40 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-inverse-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body41 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-inverse-selected)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body42 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-primary-inverse-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-inverse)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-inverse)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body43 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body44 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-selected)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body45 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-primary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-disabled)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-default)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body46 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 98,
        height: 32,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body47 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-selected)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 98,
        height: 32,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body48 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-primary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-default)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 114,
        height: 32,
        borderTop: "2px solid var(--focus-focus)",
        borderRight: "2px solid var(--focus-focus)",
        borderBottom: "2px solid var(--focus-focus)",
        borderLeft: "2px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body49 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-down)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body50 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-primary-down)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-default)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body51 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-hover)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textDecoration: "underline",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body52 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-primary-hover)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-default)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __body53 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body54 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--tag-fill-primary-selected)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body55 = () => (
    <div className={props.className} style={{
      width: 106,
      backgroundColor: "var(--tag-fill-primary-default)",
      display: "flex",
      flexDirection: "row",
      padding: "0px 8px 0px 8px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      gap: "calc(var(--spacing-000) * 1px)",
      paddingLeft: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: 14,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        letterSpacing: "0.080em",
        color: "var(--tag-text-default)",
        textTransform: "uppercase",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--tag-icon-default)",
        }}>{props.icon1 ?? <CloseSmall />}</div>
    </div>
  );
  const __impls = {
    // figma: Style=Secondary inverse, State=Static, DIsmissable=off, Selected=no
    "style2=secondary inverse|state=static|dIsmissable=off|selected=false": __body0,
    // figma: Style=Secondary inverse, State=Static, DIsmissable=off, Selected=yes
    "style2=secondary inverse|state=static|dIsmissable=off|selected=true": __body1,
    // figma: Style=Secondary inverse, State=Static, DIsmissable=on, Selected=yes
    "style2=secondary inverse|state=static|dIsmissable=on|selected=true": __body2,
    // figma: Style=Secondary inverse, State=Focus, DIsmissable=off, Selected=no
    "style2=secondary inverse|state=focus|dIsmissable=off|selected=false": __body3,
    // figma: Style=Secondary inverse, State=Focus, DIsmissable=off, Selected=yes
    "style2=secondary inverse|state=focus|dIsmissable=off|selected=true": __body4,
    // figma: Style=Secondary inverse, State=Focus, DIsmissable=on, Selected=yes
    "style2=secondary inverse|state=focus|dIsmissable=on|selected=true": __body5,
    // figma: Style=Secondary inverse, State=Down, DIsmissable=off, Selected=no
    "style2=secondary inverse|state=down|dIsmissable=off|selected=false": __body6,
    // figma: Style=Secondary inverse, State=Down, DIsmissable=off, Selected=yes
    "style2=secondary inverse|state=down|dIsmissable=off|selected=true": __body7,
    // figma: Style=Secondary inverse, State=Down, DIsmissable=on, Selected=yes
    "style2=secondary inverse|state=down|dIsmissable=on|selected=true": __body8,
    // figma: Style=Secondary inverse, State=Hover, DIsmissable=off, Selected=no
    "style2=secondary inverse|state=hover|dIsmissable=off|selected=false": __body9,
    // figma: Style=Secondary inverse, State=Hover, DIsmissable=off, Selected=yes
    "style2=secondary inverse|state=hover|dIsmissable=off|selected=true": __body10,
    // figma: Style=Secondary inverse, State=Hover, DIsmissable=on, Selected=yes
    "style2=secondary inverse|state=hover|dIsmissable=on|selected=true": __body11,
    // figma: Style=Secondary inverse, State=Default, DIsmissable=off, Selected=no
    "style2=secondary inverse|state=default|dIsmissable=off|selected=false": __body12,
    // figma: Style=Secondary inverse, State=Default, DIsmissable=off, Selected=yes
    "style2=secondary inverse|state=default|dIsmissable=off|selected=true": __body13,
    // figma: Style=Secondary inverse, State=Default, DIsmissable=on, Selected=yes
    "style2=secondary inverse|state=default|dIsmissable=on|selected=true": __body14,
    // figma: Style=Secondary, State=Static, DIsmissable=off, Selected=no
    "style2=secondary|state=static|dIsmissable=off|selected=false": __body15,
    // figma: Style=Secondary, State=Static, DIsmissable=off, Selected=yes
    "style2=secondary|state=static|dIsmissable=off|selected=true": __body16,
    // figma: Style=Secondary, State=Static, DIsmissable=on, Selected=yes
    "style2=secondary|state=static|dIsmissable=on|selected=true": __body17,
    // figma: Style=Secondary, State=Focus, DIsmissable=off, Selected=no
    "style2=secondary|state=focus|dIsmissable=off|selected=false": __body18,
    // figma: Style=Secondary, State=Focus, DIsmissable=off, Selected=yes
    "style2=secondary|state=focus|dIsmissable=off|selected=true": __body19,
    // figma: Style=Secondary, State=Focus, DIsmissable=on, Selected=yes
    "style2=secondary|state=focus|dIsmissable=on|selected=true": __body20,
    // figma: Style=Secondary, State=Down, DIsmissable=off, Selected=no
    "style2=secondary|state=down|dIsmissable=off|selected=false": __body21,
    // figma: Style=Secondary, State=Down, DIsmissable=off, Selected=yes
    "style2=secondary|state=down|dIsmissable=off|selected=true": __body22,
    // figma: Style=Secondary, State=Down, DIsmissable=on, Selected=yes
    "style2=secondary|state=down|dIsmissable=on|selected=true": __body23,
    // figma: Style=Secondary, State=Hover, DIsmissable=off, Selected=no
    "style2=secondary|state=hover|dIsmissable=off|selected=false": __body24,
    // figma: Style=Secondary, State=Hover, DIsmissable=off, Selected=yes
    "style2=secondary|state=hover|dIsmissable=off|selected=true": __body25,
    // figma: Style=Secondary, State=Hover, DIsmissable=on, Selected=yes
    "style2=secondary|state=hover|dIsmissable=on|selected=true": __body26,
    // figma: Style=Secondary, State=Default, DIsmissable=off, Selected=no
    "style2=secondary|state=default|dIsmissable=off|selected=false": __body27,
    // figma: Style=Secondary, State=Default, DIsmissable=off, Selected=yes
    "style2=secondary|state=default|dIsmissable=off|selected=true": __body28,
    // figma: Style=Secondary, State=Default, DIsmissable=on, Selected=yes
    "style2=secondary|state=default|dIsmissable=on|selected=true": __body29,
    // figma: Style=Primary inverse, State=Static, DIsmissable=off, Selected=no
    "style2=primary inverse|state=static|dIsmissable=off|selected=false": __body30,
    // figma: Style=Primary inverse, State=Static, DIsmissable=off, Selected=yes
    "style2=primary inverse|state=static|dIsmissable=off|selected=true": __body31,
    // figma: Style=Primary inverse, State=Static, DIsmissable=on, Selected=yes
    "style2=primary inverse|state=static|dIsmissable=on|selected=true": __body32,
    // figma: Style=Primary inverse, State=Focus, DIsmissable=off, Selected=no
    "style2=primary inverse|state=focus|dIsmissable=off|selected=false": __body33,
    // figma: Style=Primary inverse, State=Focus, DIsmissable=off, Selected=yes
    "style2=primary inverse|state=focus|dIsmissable=off|selected=true": __body34,
    // figma: Style=Primary inverse, State=Focus, DIsmissable=on, Selected=yes
    "style2=primary inverse|state=focus|dIsmissable=on|selected=true": __body35,
    // figma: Style=Primary inverse, State=Down, DIsmissable=off, Selected=no
    "style2=primary inverse|state=down|dIsmissable=off|selected=false": __body36,
    // figma: Style=Primary inverse, State=Down, DIsmissable=off, Selected=yes
    "style2=primary inverse|state=down|dIsmissable=off|selected=true": __body36,
    // figma: Style=Primary inverse, State=Down, DIsmissable=on, Selected=yes
    "style2=primary inverse|state=down|dIsmissable=on|selected=true": __body37,
    // figma: Style=Primary inverse, State=Hover, DIsmissable=off, Selected=no
    "style2=primary inverse|state=hover|dIsmissable=off|selected=false": __body38,
    // figma: Style=Primary inverse, State=Hover, DIsmissable=off, Selected=yes
    "style2=primary inverse|state=hover|dIsmissable=off|selected=true": __body38,
    // figma: Style=Primary inverse, State=Hover, DIsmissable=on, Selected=yes
    "style2=primary inverse|state=hover|dIsmissable=on|selected=true": __body39,
    // figma: Style=Primary inverse, State=Default, DIsmissable=off, Selected=no
    "style2=primary inverse|state=default|dIsmissable=off|selected=false": __body40,
    // figma: Style=Primary inverse, State=Default, DIsmissable=off, Selected=yes
    "style2=primary inverse|state=default|dIsmissable=off|selected=true": __body41,
    // figma: Style=Primary inverse, State=Default, DIsmissable=on, Selected=yes
    "style2=primary inverse|state=default|dIsmissable=on|selected=true": __body42,
    // figma: Style=Primary, State=Static, DIsmissable=off, Selected=no
    "style2=primary|state=static|dIsmissable=off|selected=false": __body43,
    // figma: Style=Primary, State=Static, DIsmissable=off, Selected=yes
    "style2=primary|state=static|dIsmissable=off|selected=true": __body44,
    // figma: Style=Primary, State=Static, DIsmissable=on, Selected=yes
    "style2=primary|state=static|dIsmissable=on|selected=true": __body45,
    // figma: Style=Primary, State=Focus, DIsmissable=off, Selected=no
    "style2=primary|state=focus|dIsmissable=off|selected=false": __body46,
    // figma: Style=Primary, State=Focus, DIsmissable=off, Selected=yes
    "style2=primary|state=focus|dIsmissable=off|selected=true": __body47,
    // figma: Style=Primary, State=Focus, DIsmissable=on, Selected=yes
    "style2=primary|state=focus|dIsmissable=on|selected=true": __body48,
    // figma: Style=Primary, State=Down, DIsmissable=off, Selected=no
    "style2=primary|state=down|dIsmissable=off|selected=false": __body49,
    // figma: Style=Primary, State=Down, DIsmissable=off, Selected=yes
    "style2=primary|state=down|dIsmissable=off|selected=true": __body49,
    // figma: Style=Primary, State=Down, DIsmissable=on, Selected=yes
    "style2=primary|state=down|dIsmissable=on|selected=true": __body50,
    // figma: Style=Primary, State=Hover, DIsmissable=off, Selected=no
    "style2=primary|state=hover|dIsmissable=off|selected=false": __body51,
    // figma: Style=Primary, State=Hover, DIsmissable=off, Selected=yes
    "style2=primary|state=hover|dIsmissable=off|selected=true": __body51,
    // figma: Style=Primary, State=Hover, DIsmissable=on, Selected=yes
    "style2=primary|state=hover|dIsmissable=on|selected=true": __body52,
    // figma: Style=Primary, State=Default, DIsmissable=off, Selected=no
    "style2=primary|state=default|dIsmissable=off|selected=false": __body53,
    // figma: Style=Primary, State=Default, DIsmissable=off, Selected=yes
    "style2=primary|state=default|dIsmissable=off|selected=true": __body54,
    // figma: Style=Primary, State=Default, DIsmissable=on, Selected=yes
    "style2=primary|state=default|dIsmissable=on|selected=true": __body55,
  };
  return (__impls[__vkey(props)] ?? __body53)();
}
export default Tag;
