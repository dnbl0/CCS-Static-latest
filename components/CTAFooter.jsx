// figma node: 7616:3101 CTA footer (6 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "breakpoint=" + __venc(p.breakpoint) + '|' + "inverse=" + __venc(p.inverse);

export function CTAFooter(_p = {}) {
  const props = { ..._p, breakpoint: _p.breakpoint ?? "lg", inverse: _p.inverse ?? false, description: _p.description ?? true, description2: _p.description2 ?? "The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.", cTA: _p.cTA ?? true };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 328,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-300) * 1px)",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        maxWidth: 800,
        maxHeight: null,
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
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
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
          }}>Button label</span>
        </div>
        <div style={{
          position: "relative",
          width: 24,
          height: 24,
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: 16,
            height: 16,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 1224,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-300) * 1px)",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        maxWidth: 800,
        maxHeight: null,
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        width: 151,
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
          }}>Button label</span>
        </div>
        <div style={{
          position: "relative",
          width: 24,
          height: 24,
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: 16,
            height: 16,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 736,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-300) * 1px)",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        maxWidth: 800,
        maxHeight: null,
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        width: 151,
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
          }}>Button label</span>
        </div>
        <div style={{
          position: "relative",
          width: 24,
          height: 24,
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: 16,
            height: 16,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 1224,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-300) * 1px)",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive-inverse)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        maxWidth: 800,
        maxHeight: null,
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        width: 151,
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
          }}>Button label</span>
        </div>
        <div style={{
          position: "relative",
          width: 24,
          height: 24,
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: 16,
            height: 16,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 328,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-300) * 1px)",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        maxWidth: 800,
        maxHeight: null,
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
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
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
          }}>Button label</span>
        </div>
        <div style={{
          position: "relative",
          width: 24,
          height: 24,
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: 16,
            height: 16,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 736,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-300) * 1px)",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          flexShrink: 0,
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--component-action-link-default-icon-size) * 1px)",
            height: "calc(var(--component-action-link-default-icon-size) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--icon-interactive)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
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
          }}>Link label</span>
        </div>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        maxWidth: 800,
        maxHeight: null,
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        width: 151,
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
        flexShrink: 0,
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--size-150) * 1px)",
          height: "calc(var(--size-150) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
          }}>Button label</span>
        </div>
        <div style={{
          position: "relative",
          width: 24,
          height: 24,
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: 16,
            height: 16,
            color: "var(--button-icon-default)",
          }}>
            <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
      </div>
      )}
    </div>
  );
  const __impls = {
    // figma: Breakpoint=SM, Inverse=True
    "breakpoint=sm|inverse=true": __body0,
    // figma: Breakpoint=LG, Inverse=False
    "breakpoint=lg|inverse=false": __body1,
    // figma: Breakpoint=MD, Inverse=True
    "breakpoint=md|inverse=true": __body2,
    // figma: Breakpoint=LG, Inverse=True
    "breakpoint=lg|inverse=true": __body3,
    // figma: Breakpoint=SM, Inverse=False
    "breakpoint=sm|inverse=false": __body4,
    // figma: Breakpoint=MD, Inverse=False
    "breakpoint=md|inverse=false": __body5,
  };
  return (__impls[__vkey(props)] ?? __body1)();
}
export default CTAFooter;
