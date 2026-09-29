import { ArrowCta2 } from './ArrowCta2.jsx';
import { Link } from './Link.jsx';

// figma node: 7034:4252 Link list (12 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "stacked=" + __venc(p.stacked) + '|' + "icon=" + __venc(p.icon) + '|' + "inverse=" + __venc(p.inverse);

export function LinkList(_p = {}) {
  const props = { ..._p, link6: _p.link6 ?? false, stacked: _p.stacked ?? true, icon: _p.icon ?? "none", inverse: _p.inverse ?? false, link7: _p.link7 ?? false, link8: _p.link8 ?? false, link5: _p.link5 ?? false, link4: _p.link4 ?? true, link3: _p.link3 ?? true };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 448,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-300) * 1px)",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      {props.link3 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
      {props.link4 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
      {props.link5 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
      {props.link6 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
      {props.link7 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
      {props.link8 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 160,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>Link label</span>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>Link label</span>
      </div>
      {props.link3 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>Link label</span>
      </div>
      )}
      {props.link4 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>Link label</span>
      </div>
      )}
      {props.link5 && (
      <div style={{
        position: "relative",
        height: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
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
      )}
      {props.link6 && (
      <div style={{
        position: "relative",
        height: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
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
      )}
      {props.link7 && (
      <div style={{
        position: "relative",
        height: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
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
      )}
      {props.link8 && (
      <div style={{
        position: "relative",
        height: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
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
      )}
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 560,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-300) * 1px)",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      {props.link3 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
      {props.link4 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
      {props.link5 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
      {props.link6 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
      {props.link7 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
      {props.link8 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 160,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexGrow: 1,
        }}>Link label</span>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexGrow: 1,
        }}>Link label</span>
      </div>
      {props.link3 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexGrow: 1,
        }}>Link label</span>
      </div>
      )}
      {props.link4 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexGrow: 1,
        }}>Link label</span>
      </div>
      )}
      {props.link5 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexShrink: 0,
        }}>Link label</span>
      </div>
      )}
      {props.link6 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexShrink: 0,
        }}>Link label</span>
      </div>
      )}
      {props.link7 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexShrink: 0,
        }}>Link label</span>
      </div>
      )}
      {props.link8 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--link-text-default-inverse)",
          flexShrink: 0,
        }}>Link label</span>
      </div>
      )}
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 448,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-300) * 1px)",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
      position: "relative",
      ...props.style,
    }}>
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      {props.link3 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link4 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link5 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link6 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link7 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link8 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 160,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      {props.link3 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link4 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link5 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link6 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link7 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link8 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={true}
        icon2={"none"}
        state={"default"}
      />
      )}
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: 448,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-300) * 1px)",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      {props.link3 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
      {props.link4 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
      {props.link5 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
      {props.link6 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
      {props.link7 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
      {props.link8 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
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
      )}
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: 160,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>Link label</span>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>Link label</span>
      </div>
      {props.link3 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>Link label</span>
      </div>
      )}
      {props.link4 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>Link label</span>
      </div>
      )}
      {props.link5 && (
      <div style={{
        position: "relative",
        height: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
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
      )}
      {props.link6 && (
      <div style={{
        position: "relative",
        height: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
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
      )}
      {props.link7 && (
      <div style={{
        position: "relative",
        height: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
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
      )}
      {props.link8 && (
      <div style={{
        position: "relative",
        height: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
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
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
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
      )}
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: 560,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-300) * 1px)",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      {props.link3 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
      {props.link4 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
      {props.link5 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
      {props.link6 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
      {props.link7 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
      {props.link8 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
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
        }}>Link label</span>
      </div>
      )}
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: 160,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexGrow: 1,
        }}>Link label</span>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexGrow: 1,
        }}>Link label</span>
      </div>
      {props.link3 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexGrow: 1,
        }}>Link label</span>
      </div>
      )}
      {props.link4 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexGrow: 1,
        }}>Link label</span>
      </div>
      )}
      {props.link5 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexShrink: 0,
        }}>Link label</span>
      </div>
      )}
      {props.link6 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexShrink: 0,
        }}>Link label</span>
      </div>
      )}
      {props.link7 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexShrink: 0,
        }}>Link label</span>
      </div>
      )}
      {props.link8 && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: "calc(var(--component-action-link-default-icon-size) * 1px)",
          height: "calc(var(--component-action-link-default-icon-size) * 1px)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
            position: "absolute",
            left: 4,
            top: 6,
            width: 16,
            height: 12,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          whiteSpace: "nowrap",
          lineHeight: "24px",
          color: "var(--link-text-default)",
          flexShrink: 0,
        }}>Link label</span>
      </div>
      )}
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: 448,
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-300) * 1px)",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
      position: "relative",
      ...props.style,
    }}>
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      {props.link3 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link4 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link5 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link6 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link7 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link8 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: 160,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      {props.link3 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link4 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link5 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link6 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link7 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
      {props.link8 && (
      <Link
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        icon={<ArrowCta2 />}
        style2={"default"}
        inverse={false}
        icon2={"none"}
        state={"default"}
      />
      )}
    </div>
  );
  const __impls = {
    // figma: Stacked=No, Icon=Top, Inverse=True
    "stacked=false|icon=top|inverse=true": __body0,
    // figma: Stacked=Yes, Icon=Top, Inverse=True
    "stacked=true|icon=top|inverse=true": __body1,
    // figma: Stacked=No, Icon=Left, Inverse=True
    "stacked=false|icon=left|inverse=true": __body2,
    // figma: Stacked=Yes, Icon=Left, Inverse=True
    "stacked=true|icon=left|inverse=true": __body3,
    // figma: Stacked=No, Icon=None, Inverse=True
    "stacked=false|icon=none|inverse=true": __body4,
    // figma: Stacked=Yes, Icon=None, Inverse=True
    "stacked=true|icon=none|inverse=true": __body5,
    // figma: Stacked=No, Icon=Top, Inverse=False
    "stacked=false|icon=top|inverse=false": __body6,
    // figma: Stacked=Yes, Icon=Top, Inverse=False
    "stacked=true|icon=top|inverse=false": __body7,
    // figma: Stacked=No, Icon=Left, Inverse=False
    "stacked=false|icon=left|inverse=false": __body8,
    // figma: Stacked=Yes, Icon=Left, Inverse=False
    "stacked=true|icon=left|inverse=false": __body9,
    // figma: Stacked=No, Icon=None, Inverse=False
    "stacked=false|icon=none|inverse=false": __body10,
    // figma: Stacked=Yes, Icon=None, Inverse=False
    "stacked=true|icon=none|inverse=false": __body11,
  };
  return (__impls[__vkey(props)] ?? __body11)();
}
export default LinkList;
