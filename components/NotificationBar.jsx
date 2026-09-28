import { Error } from './Error.jsx';
import { Info } from './Info.jsx';
import { Success } from './Success.jsx';
import { Warning } from './Warning.jsx';

// figma node: 7745:2479 Notification bar (12 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "breakpoint=" + __venc(p.breakpoint) + '|' + "status=" + __venc(p.status);

export function NotificationBar(_p = {}) {
  const props = { ..._p, breakpoint: _p.breakpoint ?? "lg", status: _p.status ?? "info", dismissable: _p.dismissable ?? true, title: _p.title ?? "Notification title, keep it short and informative", description: _p.description ?? true, description2: _p.description2 ?? "As soon as I have got flying to perfection, I have got a scheme about a steam engine." };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 1288,
      backgroundColor: "var(--background-error)",
      borderTop: "1px solid var(--stroke-error)",
      borderRight: "1px solid var(--stroke-error)",
      borderBottom: "1px solid var(--stroke-error)",
      borderLeft: "1px solid var(--stroke-error)",
      display: "flex",
      flexDirection: "row",
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
      <div style={{
        position: "relative",
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
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Error />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 768,
      backgroundColor: "var(--background-error)",
      borderTop: "1px solid var(--stroke-error)",
      borderRight: "1px solid var(--stroke-error)",
      borderBottom: "1px solid var(--stroke-error)",
      borderLeft: "1px solid var(--stroke-error)",
      display: "flex",
      flexDirection: "row",
      padding: "4px 4px 4px 4px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-025) * 1px)",
      paddingTop: "calc(var(--spacing-025) * 1px)",
      paddingRight: "calc(var(--spacing-025) * 1px)",
      paddingBottom: "calc(var(--spacing-025) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
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
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Error />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 768,
      backgroundColor: "var(--background-info)",
      borderTop: "1px solid var(--stroke-info)",
      borderRight: "1px solid var(--stroke-info)",
      borderBottom: "1px solid var(--stroke-info)",
      borderLeft: "1px solid var(--stroke-info)",
      display: "flex",
      flexDirection: "row",
      padding: "4px 4px 4px 4px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-025) * 1px)",
      paddingTop: "calc(var(--spacing-025) * 1px)",
      paddingRight: "calc(var(--spacing-025) * 1px)",
      paddingBottom: "calc(var(--spacing-025) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
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
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Info />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 1288,
      backgroundColor: "var(--background-info)",
      borderTop: "1px solid var(--stroke-info)",
      borderRight: "1px solid var(--stroke-info)",
      borderBottom: "1px solid var(--stroke-info)",
      borderLeft: "1px solid var(--stroke-info)",
      display: "flex",
      flexDirection: "row",
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
      <div style={{
        position: "relative",
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
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Info />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 1288,
      backgroundColor: "var(--background-warning)",
      borderTop: "1px solid var(--stroke-warning)",
      borderRight: "1px solid var(--stroke-warning)",
      borderBottom: "1px solid var(--stroke-warning)",
      borderLeft: "1px solid var(--stroke-warning)",
      display: "flex",
      flexDirection: "row",
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
      <div style={{
        position: "relative",
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
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Warning />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 768,
      backgroundColor: "var(--background-warning)",
      borderTop: "1px solid var(--stroke-warning)",
      borderRight: "1px solid var(--stroke-warning)",
      borderBottom: "1px solid var(--stroke-warning)",
      borderLeft: "1px solid var(--stroke-warning)",
      display: "flex",
      flexDirection: "row",
      padding: "4px 4px 4px 4px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-025) * 1px)",
      paddingTop: "calc(var(--spacing-025) * 1px)",
      paddingRight: "calc(var(--spacing-025) * 1px)",
      paddingBottom: "calc(var(--spacing-025) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
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
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Warning />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: 1288,
      backgroundColor: "var(--background-success)",
      borderTop: "1px solid var(--stroke-success)",
      borderRight: "1px solid var(--stroke-success)",
      borderBottom: "1px solid var(--stroke-success)",
      borderLeft: "1px solid var(--stroke-success)",
      display: "flex",
      flexDirection: "row",
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
      <div style={{
        position: "relative",
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
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Success />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      backgroundColor: "var(--background-success)",
      borderTop: "1px solid var(--stroke-success)",
      borderRight: "1px solid var(--stroke-success)",
      borderBottom: "1px solid var(--stroke-success)",
      borderLeft: "1px solid var(--stroke-success)",
      display: "flex",
      flexDirection: "row",
      padding: "4px 4px 4px 4px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-025) * 1px)",
      paddingTop: "calc(var(--spacing-025) * 1px)",
      paddingRight: "calc(var(--spacing-025) * 1px)",
      paddingBottom: "calc(var(--spacing-025) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        width: 712,
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
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Success />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: 360,
      backgroundColor: "var(--background-error)",
      borderTop: "1px solid var(--stroke-error)",
      borderRight: "1px solid var(--stroke-error)",
      borderBottom: "1px solid var(--stroke-error)",
      borderLeft: "1px solid var(--stroke-error)",
      display: "flex",
      flexDirection: "row",
      padding: "4px 4px 4px 4px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-025) * 1px)",
      paddingTop: "calc(var(--spacing-025) * 1px)",
      paddingRight: "calc(var(--spacing-025) * 1px)",
      paddingBottom: "calc(var(--spacing-025) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
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
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Error />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: 360,
      backgroundColor: "var(--background-info)",
      borderTop: "1px solid var(--stroke-info)",
      borderRight: "1px solid var(--stroke-info)",
      borderBottom: "1px solid var(--stroke-info)",
      borderLeft: "1px solid var(--stroke-info)",
      display: "flex",
      flexDirection: "row",
      padding: "4px 4px 4px 4px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-025) * 1px)",
      paddingTop: "calc(var(--spacing-025) * 1px)",
      paddingRight: "calc(var(--spacing-025) * 1px)",
      paddingBottom: "calc(var(--spacing-025) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
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
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Info />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: 360,
      backgroundColor: "var(--background-warning)",
      borderTop: "1px solid var(--stroke-warning)",
      borderRight: "1px solid var(--stroke-warning)",
      borderBottom: "1px solid var(--stroke-warning)",
      borderLeft: "1px solid var(--stroke-warning)",
      display: "flex",
      flexDirection: "row",
      padding: "4px 4px 4px 4px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-025) * 1px)",
      paddingTop: "calc(var(--spacing-025) * 1px)",
      paddingRight: "calc(var(--spacing-025) * 1px)",
      paddingBottom: "calc(var(--spacing-025) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
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
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Warning />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: 360,
      backgroundColor: "var(--background-success)",
      borderTop: "1px solid var(--stroke-success)",
      borderRight: "1px solid var(--stroke-success)",
      borderBottom: "1px solid var(--stroke-success)",
      borderLeft: "1px solid var(--stroke-success)",
      display: "flex",
      flexDirection: "row",
      padding: "4px 4px 4px 4px",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-025) * 1px)",
      paddingTop: "calc(var(--spacing-025) * 1px)",
      paddingRight: "calc(var(--spacing-025) * 1px)",
      paddingBottom: "calc(var(--spacing-025) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
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
        flexGrow: 1,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 24,
            height: 24,
            flexShrink: 0,
          }}>{props.icon1 ?? <Success />}</div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-050) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.description && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.description2}</span>
          )}
        </div>
      </div>
      {props.dismissable && (
      <div style={{
        position: "relative",
        backgroundColor: "rgba(255,255,255,0)",
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{
            position: "absolute",
            left: 5,
            top: 5,
            width: 14,
            height: 14,
            color: "var(--button-icon-tertiary)",
          }}>
            <path d={"M 1.4 14 L 0 12.6 L 5.6 7 L 0 1.4 L 1.4 0 L 7 5.6 L 12.6 0 L 14 1.4 L 8.4 7 L 14 12.6 L 12.6 14 L 7 8.4 L 1.4 14 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __impls = {
    // figma: Breakpoint=LG, Status=Error
    "breakpoint=lg|status=error": __body0,
    // figma: Breakpoint=MD, Status=Error
    "breakpoint=md|status=error": __body1,
    // figma: Breakpoint=MD, Status=Info
    "breakpoint=md|status=info": __body2,
    // figma: Breakpoint=LG, Status=Info
    "breakpoint=lg|status=info": __body3,
    // figma: Breakpoint=LG, Status=Warning
    "breakpoint=lg|status=warning": __body4,
    // figma: Breakpoint=MD, Status=Warning
    "breakpoint=md|status=warning": __body5,
    // figma: Breakpoint=LG, Status=Success
    "breakpoint=lg|status=success": __body6,
    // figma: Breakpoint=MD, Status=Success
    "breakpoint=md|status=success": __body7,
    // figma: Breakpoint=SM, Status=Error
    "breakpoint=sm|status=error": __body8,
    // figma: Breakpoint=SM, Status=Info
    "breakpoint=sm|status=info": __body9,
    // figma: Breakpoint=SM, Status=Warning
    "breakpoint=sm|status=warning": __body10,
    // figma: Breakpoint=SM, Status=Success
    "breakpoint=sm|status=success": __body11,
  };
  return (__impls[__vkey(props)] ?? __body3)();
}
export default NotificationBar;
