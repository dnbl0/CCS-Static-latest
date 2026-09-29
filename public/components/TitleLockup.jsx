// figma node: 7528:6750 .title lockup (24 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "inverse=" + __venc(p.inverse) + '|' + "titleStyle=" + __venc(p.titleStyle) + '|' + "alignment=" + __venc(p.alignment);

export function TitleLockup(_p = {}) {
  const props = { ..._p, overline: _p.overline ?? true, inverse: _p.inverse ?? false, titleStyle: _p.titleStyle ?? "display", alignment: _p.alignment ?? "centre", title: _p.title ?? "Section title", overline2: _p.overline2 ?? "Overline", description: _p.description ?? true, description2: _p.description2 ?? "The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value." };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: 1.5,
          color: "var(--text-secondary)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 40,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 40,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 40,
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
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
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 40,
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        lineHeight: 1.5,
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 40,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 32,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.2000000476837158,
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
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
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.2000000476837158,
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        lineHeight: 1.5,
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 32,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 24,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 24,
          lineHeight: 1.2000000476837158,
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
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
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 24,
          lineHeight: 1.2000000476837158,
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        lineHeight: 1.5,
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
    </div>
  );
  const __body12 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 24,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body13 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 20,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body14 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
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
      </div>
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
  );
  const __body15 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 20,
          lineHeight: 1.2000000476837158,
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        lineHeight: 1.5,
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
    </div>
  );
  const __body16 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 40,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body17 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 48,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body18 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 48,
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
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
  );
  const __body19 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 400,
          fontSize: 48,
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        lineHeight: 1.5,
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
    </div>
  );
  const __body20 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 300,
          fontSize: 48,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "-0.010em",
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body21 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-150) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          textAlign: "center",
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 300,
          fontSize: 64,
          textAlign: "center",
          lineHeight: 1,
          letterSpacing: "-0.010em",
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
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
    </div>
  );
  const __body22 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 300,
          fontSize: 64,
          lineHeight: 1,
          letterSpacing: "-0.010em",
          color: "var(--text-brand)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
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
  );
  const __body23 = () => (
    <div className={props.className} style={{
      width: 800,
      maxWidth: 800,
      maxHeight: null,
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
        gap: "calc(var(--spacing-100) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        {props.overline && (
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.2000000476837158,
          letterSpacing: "0.080em",
          color: "var(--text-secondary-inverse)",
          textTransform: "uppercase",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.overline2}</span>
        )}
        <span style={{
          position: "relative",
          fontFamily: "Fraunces, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 300,
          fontSize: 64,
          lineHeight: 1,
          letterSpacing: "-0.010em",
          color: "var(--text-brand-inverse)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>{props.title}</span>
      </div>
      {props.description && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 18,
        lineHeight: 1.5,
        color: "var(--text-primary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.description2}</span>
      )}
    </div>
  );
  const __impls = {
    // figma: Inverse=False, Title style=Title 2, Alignment=Centre
    "inverse=false|titleStyle=title 2|alignment=centre": __body0,
    // figma: Inverse=True, Title style=Title 2, Alignment=Centre
    "inverse=true|titleStyle=title 2|alignment=centre": __body1,
    // figma: Inverse=False, Title style=Title 2, Alignment=Left
    "inverse=false|titleStyle=title 2|alignment=left": __body2,
    // figma: Inverse=True, Title style=Title 2, Alignment=Left
    "inverse=true|titleStyle=title 2|alignment=left": __body3,
    // figma: Inverse=False, Title style=Title 3, Alignment=Centre
    "inverse=false|titleStyle=title 3|alignment=centre": __body4,
    // figma: Inverse=True, Title style=Title 3, Alignment=Centre
    "inverse=true|titleStyle=title 3|alignment=centre": __body5,
    // figma: Inverse=False, Title style=Title 3, Alignment=Left
    "inverse=false|titleStyle=title 3|alignment=left": __body6,
    // figma: Inverse=True, Title style=Title 3, Alignment=Left
    "inverse=true|titleStyle=title 3|alignment=left": __body7,
    // figma: Inverse=False, Title style=Title 4, Alignment=Centre
    "inverse=false|titleStyle=title 4|alignment=centre": __body8,
    // figma: Inverse=True, Title style=Title 4, Alignment=Centre
    "inverse=true|titleStyle=title 4|alignment=centre": __body9,
    // figma: Inverse=False, Title style=Title 4, Alignment=Left
    "inverse=false|titleStyle=title 4|alignment=left": __body10,
    // figma: Inverse=True, Title style=Title 4, Alignment=Left
    "inverse=true|titleStyle=title 4|alignment=left": __body11,
    // figma: Inverse=False, Title style=Title 5, Alignment=Centre
    "inverse=false|titleStyle=title 5|alignment=centre": __body12,
    // figma: Inverse=True, Title style=Title 5, Alignment=Centre
    "inverse=true|titleStyle=title 5|alignment=centre": __body13,
    // figma: Inverse=False, Title style=Title 5, Alignment=Left
    "inverse=false|titleStyle=title 5|alignment=left": __body14,
    // figma: Inverse=True, Title style=Title 5, Alignment=Left
    "inverse=true|titleStyle=title 5|alignment=left": __body15,
    // figma: Inverse=False, Title style=Title 1, Alignment=Centre
    "inverse=false|titleStyle=title 1|alignment=centre": __body16,
    // figma: Inverse=True, Title style=Title 1, Alignment=Centre
    "inverse=true|titleStyle=title 1|alignment=centre": __body17,
    // figma: Inverse=False, Title style=Title 1, Alignment=Left
    "inverse=false|titleStyle=title 1|alignment=left": __body18,
    // figma: Inverse=True, Title style=Title 1, Alignment=Left
    "inverse=true|titleStyle=title 1|alignment=left": __body19,
    // figma: Inverse=False, Title style=Display, Alignment=Centre
    "inverse=false|titleStyle=display|alignment=centre": __body20,
    // figma: Inverse=True, Title style=Display, Alignment=Centre
    "inverse=true|titleStyle=display|alignment=centre": __body21,
    // figma: Inverse=False, Title style=Display, Alignment=Left
    "inverse=false|titleStyle=display|alignment=left": __body22,
    // figma: Inverse=True, Title style=Display, Alignment=Left
    "inverse=true|titleStyle=display|alignment=left": __body23,
  };
  return (__impls[__vkey(props)] ?? __body20)();
}
export default TitleLockup;
