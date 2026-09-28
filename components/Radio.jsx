// figma node: 74:9133 Radio (28 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "inverse=" + __venc(p.inverse) + '|' + "selected=" + __venc(p.selected) + '|' + "state=" + __venc(p.state) + '|' + "error=" + __venc(p.error);

export function Radio(_p = {}) {
  const props = { ..._p, inverse: _p.inverse ?? false, selected: _p.selected ?? false, state: _p.state ?? "default", error: _p.error ?? false, label: _p.label ?? true, label2: _p.label2 ?? "Input label" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default)",
          borderTop: "2px solid var(--input-stroke-default)",
          borderRight: "2px solid var(--input-stroke-default)",
          borderBottom: "2px solid var(--input-stroke-default)",
          borderLeft: "2px solid var(--input-stroke-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default-inverse)",
          borderTop: "2px solid var(--input-stroke-default-inverse)",
          borderRight: "2px solid var(--input-stroke-default-inverse)",
          borderBottom: "2px solid var(--input-stroke-default-inverse)",
          borderLeft: "2px solid var(--input-stroke-default-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-disabled)",
          borderTop: "2px solid var(--input-stroke-disabled)",
          borderRight: "2px solid var(--input-stroke-disabled)",
          borderBottom: "2px solid var(--input-stroke-disabled)",
          borderLeft: "2px solid var(--input-stroke-disabled)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-null)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-disabled-inverse)",
          borderTop: "2px solid var(--input-stroke-disabled-inverse)",
          borderRight: "2px solid var(--input-stroke-disabled-inverse)",
          borderBottom: "2px solid var(--input-stroke-disabled-inverse)",
          borderLeft: "2px solid var(--input-stroke-disabled-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-null-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default)",
          borderTop: "2px solid var(--input-stroke-error)",
          borderRight: "2px solid var(--input-stroke-error)",
          borderBottom: "2px solid var(--input-stroke-error)",
          borderLeft: "2px solid var(--input-stroke-error)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default-inverse)",
          borderTop: "2px solid var(--input-stroke-error-inverse)",
          borderRight: "2px solid var(--input-stroke-error-inverse)",
          borderBottom: "2px solid var(--input-stroke-error-inverse)",
          borderLeft: "2px solid var(--input-stroke-error-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default)",
          borderTop: "2px solid var(--input-stroke-default)",
          borderRight: "2px solid var(--input-stroke-default)",
          borderBottom: "2px solid var(--input-stroke-default)",
          borderLeft: "2px solid var(--input-stroke-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator)",
          }} />
        </div>
        <div style={{
          position: "absolute",
          left: -2,
          top: -2,
          width: 28,
          height: 28,
          borderRadius: 9999,
          borderTop: "2px solid var(--focus-focus)",
          borderRight: "2px solid var(--focus-focus)",
          borderBottom: "2px solid var(--focus-focus)",
          borderLeft: "2px solid var(--focus-focus)",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default-inverse)",
          borderTop: "2px solid var(--input-stroke-default-inverse)",
          borderRight: "2px solid var(--input-stroke-default-inverse)",
          borderBottom: "2px solid var(--input-stroke-default-inverse)",
          borderLeft: "2px solid var(--input-stroke-default-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator-inverse)",
          }} />
        </div>
        <div style={{
          position: "absolute",
          left: -2,
          top: -2,
          width: 28,
          height: 28,
          borderRadius: 9999,
          borderTop: "2px solid var(--focus-focus-inverse)",
          borderRight: "2px solid var(--focus-focus-inverse)",
          borderBottom: "2px solid var(--focus-focus-inverse)",
          borderLeft: "2px solid var(--focus-focus-inverse)",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-hover)",
          borderTop: "2px solid var(--input-stroke-default)",
          borderRight: "2px solid var(--input-stroke-default)",
          borderBottom: "2px solid var(--input-stroke-default)",
          borderLeft: "2px solid var(--input-stroke-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-hover-inverse)",
          borderTop: "2px solid var(--input-stroke-default-inverse)",
          borderRight: "2px solid var(--input-stroke-default-inverse)",
          borderBottom: "2px solid var(--input-stroke-default-inverse)",
          borderLeft: "2px solid var(--input-stroke-default-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default)",
          borderTop: "2px solid var(--input-stroke-default)",
          borderRight: "2px solid var(--input-stroke-default)",
          borderBottom: "2px solid var(--input-stroke-default)",
          borderLeft: "2px solid var(--input-stroke-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator)",
          }} />
        </div>
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default-inverse)",
          borderTop: "2px solid var(--input-stroke-default-inverse)",
          borderRight: "2px solid var(--input-stroke-default-inverse)",
          borderBottom: "2px solid var(--input-stroke-default-inverse)",
          borderLeft: "2px solid var(--input-stroke-default-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator-inverse)",
          }} />
        </div>
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body12 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-hover)",
          borderTop: "2px solid var(--input-stroke-error)",
          borderRight: "2px solid var(--input-stroke-error)",
          borderBottom: "2px solid var(--input-stroke-error)",
          borderLeft: "2px solid var(--input-stroke-error)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body13 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-hover-inverse)",
          borderTop: "2px solid var(--input-stroke-error-inverse)",
          borderRight: "2px solid var(--input-stroke-error-inverse)",
          borderBottom: "2px solid var(--input-stroke-error-inverse)",
          borderLeft: "2px solid var(--input-stroke-error-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body14 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default)",
          borderTop: "2px solid var(--input-stroke-error)",
          borderRight: "2px solid var(--input-stroke-error)",
          borderBottom: "2px solid var(--input-stroke-error)",
          borderLeft: "2px solid var(--input-stroke-error)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator)",
          }} />
        </div>
        <div style={{
          position: "absolute",
          left: -2,
          top: -2,
          width: 28,
          height: 28,
          borderRadius: 9999,
          borderTop: "2px solid var(--focus-focus)",
          borderRight: "2px solid var(--focus-focus)",
          borderBottom: "2px solid var(--focus-focus)",
          borderLeft: "2px solid var(--focus-focus)",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body15 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default-inverse)",
          borderTop: "2px solid var(--input-stroke-error-inverse)",
          borderRight: "2px solid var(--input-stroke-error-inverse)",
          borderBottom: "2px solid var(--input-stroke-error-inverse)",
          borderLeft: "2px solid var(--input-stroke-error-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator-inverse)",
          }} />
        </div>
        <div style={{
          position: "absolute",
          left: -2,
          top: -2,
          width: 28,
          height: 28,
          borderRadius: 9999,
          borderTop: "2px solid var(--focus-focus-inverse)",
          borderRight: "2px solid var(--focus-focus-inverse)",
          borderBottom: "2px solid var(--focus-focus-inverse)",
          borderLeft: "2px solid var(--focus-focus-inverse)",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body16 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default)",
          borderTop: "2px solid var(--input-stroke-error)",
          borderRight: "2px solid var(--input-stroke-error)",
          borderBottom: "2px solid var(--input-stroke-error)",
          borderLeft: "2px solid var(--input-stroke-error)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator)",
          }} />
        </div>
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body17 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default-inverse)",
          borderTop: "2px solid var(--input-stroke-error-inverse)",
          borderRight: "2px solid var(--input-stroke-error-inverse)",
          borderBottom: "2px solid var(--input-stroke-error-inverse)",
          borderLeft: "2px solid var(--input-stroke-error-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator-inverse)",
          }} />
        </div>
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body18 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default)",
          borderTop: "2px solid var(--input-stroke-default)",
          borderRight: "2px solid var(--input-stroke-default)",
          borderBottom: "2px solid var(--input-stroke-default)",
          borderLeft: "2px solid var(--input-stroke-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        <div style={{
          position: "absolute",
          left: -2,
          top: -2,
          width: 28,
          height: 28,
          borderRadius: 9999,
          borderTop: "2px solid var(--focus-focus)",
          borderRight: "2px solid var(--focus-focus)",
          borderBottom: "2px solid var(--focus-focus)",
          borderLeft: "2px solid var(--focus-focus)",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body19 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default-inverse)",
          borderTop: "2px solid var(--input-stroke-default-inverse)",
          borderRight: "2px solid var(--input-stroke-default-inverse)",
          borderBottom: "2px solid var(--input-stroke-default-inverse)",
          borderLeft: "2px solid var(--input-stroke-default-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        <div style={{
          position: "absolute",
          left: -2,
          top: -2,
          width: 28,
          height: 28,
          borderRadius: 9999,
          borderTop: "2px solid var(--focus-focus-inverse)",
          borderRight: "2px solid var(--focus-focus-inverse)",
          borderBottom: "2px solid var(--focus-focus-inverse)",
          borderLeft: "2px solid var(--focus-focus-inverse)",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body20 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-hover)",
          borderTop: "2px solid var(--input-stroke-default)",
          borderRight: "2px solid var(--input-stroke-default)",
          borderBottom: "2px solid var(--input-stroke-default)",
          borderLeft: "2px solid var(--input-stroke-default)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator)",
          }} />
        </div>
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body21 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-hover-inverse)",
          borderTop: "2px solid var(--input-stroke-default-inverse)",
          borderRight: "2px solid var(--input-stroke-default-inverse)",
          borderBottom: "2px solid var(--input-stroke-default-inverse)",
          borderLeft: "2px solid var(--input-stroke-default-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator-inverse)",
          }} />
        </div>
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body22 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default)",
          borderTop: "2px solid var(--input-stroke-error)",
          borderRight: "2px solid var(--input-stroke-error)",
          borderBottom: "2px solid var(--input-stroke-error)",
          borderLeft: "2px solid var(--input-stroke-error)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        <div style={{
          position: "absolute",
          left: -2,
          top: -2,
          width: 28,
          height: 28,
          borderRadius: 9999,
          borderTop: "2px solid var(--focus-focus)",
          borderRight: "2px solid var(--focus-focus)",
          borderBottom: "2px solid var(--focus-focus)",
          borderLeft: "2px solid var(--focus-focus)",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body23 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-default-inverse)",
          borderTop: "2px solid var(--input-stroke-error-inverse)",
          borderRight: "2px solid var(--input-stroke-error-inverse)",
          borderBottom: "2px solid var(--input-stroke-error-inverse)",
          borderLeft: "2px solid var(--input-stroke-error-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        <div style={{
          position: "absolute",
          left: -2,
          top: -2,
          width: 28,
          height: 28,
          borderRadius: 9999,
          borderTop: "2px solid var(--focus-focus-inverse)",
          borderRight: "2px solid var(--focus-focus-inverse)",
          borderBottom: "2px solid var(--focus-focus-inverse)",
          borderLeft: "2px solid var(--focus-focus-inverse)",
        }} />
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body24 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-disabled)",
          borderTop: "2px solid var(--input-stroke-disabled)",
          borderRight: "2px solid var(--input-stroke-disabled)",
          borderBottom: "2px solid var(--input-stroke-disabled)",
          borderLeft: "2px solid var(--input-stroke-disabled)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--icon-null)",
          }} />
        </div>
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-null)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body25 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-disabled-inverse)",
          borderTop: "2px solid var(--input-stroke-disabled-inverse)",
          borderRight: "2px solid var(--input-stroke-disabled-inverse)",
          borderBottom: "2px solid var(--input-stroke-disabled-inverse)",
          borderLeft: "2px solid var(--input-stroke-disabled-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--icon-null-inverse)",
          }} />
        </div>
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-null-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body26 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-hover)",
          borderTop: "2px solid var(--input-stroke-error)",
          borderRight: "2px solid var(--input-stroke-error)",
          borderBottom: "2px solid var(--input-stroke-error)",
          borderLeft: "2px solid var(--input-stroke-error)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator)",
          }} />
        </div>
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __body27 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "2px 2px 2px 2px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-012) * 1px)",
        paddingTop: "calc(var(--spacing-012) * 1px)",
        paddingRight: "calc(var(--spacing-012) * 1px)",
        paddingBottom: "calc(var(--spacing-012) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          width: 20,
          overflow: "hidden",
          borderRadius: 9999,
          backgroundColor: "var(--input-fill-hover-inverse)",
          borderTop: "2px solid var(--input-stroke-error-inverse)",
          borderRight: "2px solid var(--input-stroke-error-inverse)",
          borderBottom: "2px solid var(--input-stroke-error-inverse)",
          borderLeft: "2px solid var(--input-stroke-error-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "absolute",
            left: 4,
            top: 4,
            width: "calc(var(--size-075-2) * 1px)",
            height: "calc(var(--size-075-2) * 1px)",
            borderRadius: "50%",
            backgroundColor: "var(--input-icon-indicator-inverse)",
          }} />
        </div>
      </div>
      {props.label && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label2}</span>
      )}
    </div>
  );
  const __impls = {
    // figma: Inverse=False, Selected=False, State=Default, Error=False
    "inverse=false|selected=false|state=default|error=false": __body0,
    // figma: Inverse=True, Selected=False, State=Default, Error=False
    "inverse=true|selected=false|state=default|error=false": __body1,
    // figma: Inverse=False, Selected=False, State=Disabled, Error=False
    "inverse=false|selected=false|state=disabled|error=false": __body2,
    // figma: Inverse=True, Selected=False, State=Disabled, Error=False
    "inverse=true|selected=false|state=disabled|error=false": __body3,
    // figma: Inverse=False, Selected=False, State=Default, Error=True
    "inverse=false|selected=false|state=default|error=true": __body4,
    // figma: Inverse=True, Selected=False, State=Default, Error=True
    "inverse=true|selected=false|state=default|error=true": __body5,
    // figma: Inverse=False, Selected=True, State=Focus, Error=False
    "inverse=false|selected=true|state=focus|error=false": __body6,
    // figma: Inverse=True, Selected=True, State=Focus, Error=False
    "inverse=true|selected=true|state=focus|error=false": __body7,
    // figma: Inverse=False, Selected=False, State=Hover, Error=False
    "inverse=false|selected=false|state=hover|error=false": __body8,
    // figma: Inverse=True, Selected=False, State=Hover, Error=False
    "inverse=true|selected=false|state=hover|error=false": __body9,
    // figma: Inverse=False, Selected=True, State=Default, Error=False
    "inverse=false|selected=true|state=default|error=false": __body10,
    // figma: Inverse=True, Selected=True, State=Default, Error=False
    "inverse=true|selected=true|state=default|error=false": __body11,
    // figma: Inverse=False, Selected=False, State=Hover, Error=True
    "inverse=false|selected=false|state=hover|error=true": __body12,
    // figma: Inverse=True, Selected=False, State=Hover, Error=True
    "inverse=true|selected=false|state=hover|error=true": __body13,
    // figma: Inverse=False, Selected=True, State=Focus, Error=True
    "inverse=false|selected=true|state=focus|error=true": __body14,
    // figma: Inverse=True, Selected=True, State=Focus, Error=True
    "inverse=true|selected=true|state=focus|error=true": __body15,
    // figma: Inverse=False, Selected=True, State=Default, Error=True
    "inverse=false|selected=true|state=default|error=true": __body16,
    // figma: Inverse=True, Selected=True, State=Default, Error=True
    "inverse=true|selected=true|state=default|error=true": __body17,
    // figma: Inverse=False, Selected=False, State=Focus, Error=False
    "inverse=false|selected=false|state=focus|error=false": __body18,
    // figma: Inverse=True, Selected=False, State=Focus, Error=False
    "inverse=true|selected=false|state=focus|error=false": __body19,
    // figma: Inverse=False, Selected=True, State=Hover, Error=False
    "inverse=false|selected=true|state=hover|error=false": __body20,
    // figma: Inverse=True, Selected=True, State=Hover, Error=False
    "inverse=true|selected=true|state=hover|error=false": __body21,
    // figma: Inverse=False, Selected=False, State=Focus, Error=True
    "inverse=false|selected=false|state=focus|error=true": __body22,
    // figma: Inverse=True, Selected=False, State=Focus, Error=True
    "inverse=true|selected=false|state=focus|error=true": __body23,
    // figma: Inverse=False, Selected=True, State=Disabled, Error=False
    "inverse=false|selected=true|state=disabled|error=false": __body24,
    // figma: Inverse=True, Selected=True, State=Disabled, Error=False
    "inverse=true|selected=true|state=disabled|error=false": __body25,
    // figma: Inverse=False, Selected=True, State=Hover, Error=True
    "inverse=false|selected=true|state=hover|error=true": __body26,
    // figma: Inverse=True, Selected=True, State=Hover, Error=True
    "inverse=true|selected=true|state=hover|error=true": __body27,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default Radio;
