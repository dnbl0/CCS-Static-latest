import { ArrowCta2 } from './ArrowCta2.jsx';

// figma node: 1401:1796 .Pathfinder card (12 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "state=" + __venc(p.state) + '|' + "altBG=" + __venc(p.altBG);

export function PathfinderCard(_p = {}) {
  const props = { ..._p, image: _p.image ?? true, state: _p.state ?? "default", altBG: _p.altBG ?? false, body: _p.body ?? true, titleText: _p.titleText ?? "Title", bodyText: _p.bodyText ?? "The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value." };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-primary-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={320} height={320} viewBox="0 0 320 320" fill="none" style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 320,
          height: 320,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 320 0 L 320 320 L 0 320 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive-inverse)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-default-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-primary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={320} height={320} viewBox="0 0 320 320" fill="none" style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 320,
          height: 320,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 320 0 L 320 320 L 0 320 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-secondary-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={320} height={320} viewBox="0 0 320 320" fill="none" style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 320,
          height: 320,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 320 0 L 320 320 L 0 320 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive-inverse)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-default-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-secondary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={320} height={320} viewBox="0 0 320 320" fill="none" style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 320,
          height: 320,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 320 0 L 320 320 L 0 320 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-primary-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={344} height={344} viewBox="0 0 344 344" fill="none" style={{
          position: "absolute",
          left: -12,
          top: -12,
          width: 344,
          height: 344,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 344 0 L 344 344 L 0 344 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive-inverse)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-hover-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
      <div style={{
        position: "absolute",
        left: 2,
        top: 2,
        width: 316,
        height: 603,
        borderTop: "3px solid var(--focus-focus-inverse)",
        borderRight: "3px solid var(--focus-focus-inverse)",
        borderBottom: "3px solid var(--focus-focus-inverse)",
        borderLeft: "3px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-primary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={344} height={344} viewBox="0 0 344 344" fill="none" style={{
          position: "absolute",
          left: -12,
          top: -12,
          width: 344,
          height: 344,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 344 0 L 344 344 L 0 344 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-hover)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
      <div style={{
        position: "absolute",
        left: 2,
        top: 2,
        width: 316,
        height: 603,
        borderTop: "3px solid var(--focus-focus)",
        borderRight: "3px solid var(--focus-focus)",
        borderBottom: "3px solid var(--focus-focus)",
        borderLeft: "3px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-secondary-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={344} height={344} viewBox="0 0 344 344" fill="none" style={{
          position: "absolute",
          left: -12,
          top: -12,
          width: 344,
          height: 344,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 344 0 L 344 344 L 0 344 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive-inverse)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-hover-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
      <div style={{
        position: "absolute",
        left: 2,
        top: 2,
        width: 316,
        height: 603,
        borderTop: "3px solid var(--focus-focus-inverse)",
        borderRight: "3px solid var(--focus-focus-inverse)",
        borderBottom: "3px solid var(--focus-focus-inverse)",
        borderLeft: "3px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-secondary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={344} height={344} viewBox="0 0 344 344" fill="none" style={{
          position: "absolute",
          left: -12,
          top: -12,
          width: 344,
          height: 344,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 344 0 L 344 344 L 0 344 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-hover)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
      <div style={{
        position: "absolute",
        left: 2,
        top: 2,
        width: 316,
        height: 603,
        borderTop: "3px solid var(--focus-focus)",
        borderRight: "3px solid var(--focus-focus)",
        borderBottom: "3px solid var(--focus-focus)",
        borderLeft: "3px solid var(--focus-focus)",
      }} />
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-primary-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={344} height={344} viewBox="0 0 344 344" fill="none" style={{
          position: "absolute",
          left: -12,
          top: -12,
          width: 344,
          height: 344,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 344 0 L 344 344 L 0 344 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive-inverse)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-hover-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-primary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={344} height={344} viewBox="0 0 344 344" fill="none" style={{
          position: "absolute",
          left: -12,
          top: -12,
          width: 344,
          height: 344,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 344 0 L 344 344 L 0 344 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-hover)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-secondary-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={344} height={344} viewBox="0 0 344 344" fill="none" style={{
          position: "absolute",
          left: -12,
          top: -12,
          width: 344,
          height: 344,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 344 0 L 344 344 L 0 344 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive-inverse)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-hover-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: 320,
      backgroundColor: "var(--background-secondary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.image && (
      <div style={{
        position: "relative",
        height: 320,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={344} height={344} viewBox="0 0 344 344" fill="none" style={{
          position: "absolute",
          left: -12,
          top: -12,
          width: 344,
          height: 344,
          overflow: "hidden",
        }}>
          <path d={"M 0 0 L 344 0 L 344 344 L 0 344 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      )}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        padding: "48px 24px 48px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--gutter) * 1px)",
        paddingTop: "calc(var(--spacing-pathfinder) * 1px)",
        paddingRight: "calc(var(--gutter) * 1px)",
        paddingBottom: "calc(var(--spacing-pathfinder) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "4px 0px 4px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-025) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "var(--icon-interactive)",
            }}>{props.icon1 ?? <ArrowCta2 style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <span style={{
            position: "relative",
            fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: "40px",
            letterSpacing: "-0.010em",
            color: "var(--link-text-hover)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.titleText}</span>
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
          }}>{props.bodyText}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __impls = {
    // figma: State=Default inverse, Alt BG=False
    "state=default inverse|altBG=false": __body0,
    // figma: State=Default, Alt BG=False
    "state=default|altBG=false": __body1,
    // figma: State=Default inverse, Alt BG=True
    "state=default inverse|altBG=true": __body2,
    // figma: State=Default, Alt BG=True
    "state=default|altBG=true": __body3,
    // figma: State=Focus inverse, Alt BG=False
    "state=focus inverse|altBG=false": __body4,
    // figma: State=Focus, Alt BG=False
    "state=focus|altBG=false": __body5,
    // figma: State=Focus inverse, Alt BG=True
    "state=focus inverse|altBG=true": __body6,
    // figma: State=Focus, Alt BG=True
    "state=focus|altBG=true": __body7,
    // figma: State=Hover inverse, Alt BG=False
    "state=hover inverse|altBG=false": __body8,
    // figma: State=Hover, Alt BG=False
    "state=hover|altBG=false": __body9,
    // figma: State=Hover inverse, Alt BG=True
    "state=hover inverse|altBG=true": __body10,
    // figma: State=Hover, Alt BG=True
    "state=hover|altBG=true": __body11,
  };
  return (__impls[__vkey(props)] ?? __body1)();
}
export default PathfinderCard;
