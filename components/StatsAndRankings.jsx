import { Fact } from './Fact.jsx';

// figma node: 7581:10198 Stats and rankings (8 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "breakpoint=" + __venc(p.breakpoint) + '|' + "inverse=" + __venc(p.inverse);

export function StatsAndRankings(_p = {}) {
  const props = { ..._p, fact2: _p.fact2 ?? true, fact3: _p.fact3 ?? true, fact4: _p.fact4 ?? true, citation: _p.citation ?? true, cTA: _p.cTA ?? true, citation2: _p.citation2 ?? "Add information about the facts here.", breakpoint: _p.breakpoint ?? "lg", inverse: _p.inverse ?? false };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 1224,
      maxWidth: 1224,
      maxHeight: null,
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
        gap: "calc(var(--gutter) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"default"}
        />
        {props.fact2 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"default"}
        />
        )}
        {props.fact3 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"default"}
        />
        )}
        {props.fact4 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"default"}
        />
        )}
      </div>
      {props.citation && (
      <span style={{
        position: "relative",
        maxWidth: 800,
        maxHeight: null,
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-secondary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.citation2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
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
        }}>Link label</span>
      </div>
      )}
    </div>
  );
  const __body1 = () => (
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
        gap: "calc(var(--gutter) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"default"}
        />
        {props.fact2 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"default"}
        />
        )}
        {props.fact3 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"default"}
        />
        )}
        {props.fact4 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"default"}
        />
        )}
      </div>
      {props.citation && (
      <span style={{
        position: "relative",
        maxWidth: 800,
        maxHeight: null,
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-secondary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.citation2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
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
        }}>Link label</span>
      </div>
      )}
    </div>
  );
  const __body2 = () => (
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
        flexDirection: "column",
        gap: "calc(var(--gutter) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <Fact
          style={{
            position: "relative",
            height: 142,
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}
          type={"default"}
        />
        {props.fact2 && (
        <Fact
          style={{
            position: "relative",
            height: 142,
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}
          type={"default"}
        />
        )}
        {props.fact3 && (
        <Fact
          style={{
            position: "relative",
            height: 142,
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}
          type={"default"}
        />
        )}
        {props.fact4 && (
        <Fact
          style={{
            position: "relative",
            height: 142,
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}
          type={"default"}
        />
        )}
      </div>
      {props.citation && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-secondary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.citation2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        width: 91,
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
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
          <svg width={13.333} height={10} viewBox="0 0 13.333 10" fill="none" style={{
            position: "absolute",
            left: 3.333,
            top: 5,
            width: 13.333,
            height: 10,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 8.333 10 L 7.167 8.792 L 10.125 5.833 L 0 5.833 L 0 4.167 L 10.125 4.167 L 7.167 1.208 L 8.333 0 L 13.333 5 L 8.333 10 Z"} fill="currentColor" fillRule="nonzero" />
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
  const __body3 = () => (
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
        flexDirection: "column",
        gap: "calc(var(--gutter) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <Fact
          style={{
            position: "relative",
            height: 142,
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}
          type={"default"}
        />
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: "calc(var(--gutter) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <Fact
            style={{
              position: "relative",
              height: 142,
              flexGrow: 1,
              width: "auto",
            }}
            type={"default"}
          />
          {props.fact3 && (
          <Fact
            style={{
              position: "relative",
              height: 142,
              flexGrow: 1,
              width: "auto",
            }}
            type={"default"}
          />
          )}
        </div>
        {props.fact4 && (
        <Fact
          style={{
            position: "relative",
            height: 142,
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}
          type={"default"}
        />
        )}
      </div>
      {props.citation && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-secondary)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.citation2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        width: 91,
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
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
          <svg width={13.333} height={10} viewBox="0 0 13.333 10" fill="none" style={{
            position: "absolute",
            left: 3.333,
            top: 5,
            width: 13.333,
            height: 10,
            color: "var(--icon-interactive)",
          }}>
            <path d={"M 8.333 10 L 7.167 8.792 L 10.125 5.833 L 0 5.833 L 0 4.167 L 10.125 4.167 L 7.167 1.208 L 8.333 0 L 13.333 5 L 8.333 10 Z"} fill="currentColor" fillRule="nonzero" />
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
  const __body4 = () => (
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
        gap: "calc(var(--gutter) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"inverse"}
        />
        {props.fact2 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"inverse"}
        />
        )}
        {props.fact3 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"inverse"}
        />
        )}
        {props.fact4 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"inverse"}
        />
        )}
      </div>
      {props.citation && (
      <span style={{
        position: "relative",
        maxWidth: 800,
        maxHeight: null,
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-secondary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.citation2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
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
        }}>Link label</span>
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
        gap: "calc(var(--gutter) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"inverse"}
        />
        {props.fact2 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"inverse"}
        />
        )}
        {props.fact3 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"inverse"}
        />
        )}
        {props.fact4 && (
        <Fact
          style={{ position: "relative", flexGrow: 1, width: "auto" }}
          type={"inverse"}
        />
        )}
      </div>
      {props.citation && (
      <span style={{
        position: "relative",
        maxWidth: 800,
        maxHeight: null,
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-secondary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.citation2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
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
        }}>Link label</span>
      </div>
      )}
    </div>
  );
  const __body6 = () => (
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
        flexDirection: "column",
        gap: "calc(var(--gutter) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <Fact
          style={{
            position: "relative",
            height: 142,
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}
          type={"inverse"}
        />
        {props.fact2 && (
        <Fact
          style={{
            position: "relative",
            height: 142,
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}
          type={"inverse"}
        />
        )}
        {props.fact3 && (
        <Fact
          style={{
            position: "relative",
            height: 142,
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}
          type={"inverse"}
        />
        )}
        {props.fact4 && (
        <Fact
          style={{
            position: "relative",
            height: 142,
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}
          type={"inverse"}
        />
        )}
      </div>
      {props.citation && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-secondary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.citation2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        width: 91,
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
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
          <svg width={13.333} height={10} viewBox="0 0 13.333 10" fill="none" style={{
            position: "absolute",
            left: 3.333,
            top: 5,
            width: 13.333,
            height: 10,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 8.333 10 L 7.167 8.792 L 10.125 5.833 L 0 5.833 L 0 4.167 L 10.125 4.167 L 7.167 1.208 L 8.333 0 L 13.333 5 L 8.333 10 Z"} fill="currentColor" fillRule="nonzero" />
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
  const __body7 = () => (
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
        flexDirection: "column",
        gap: "calc(var(--gutter) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <Fact
          style={{
            position: "relative",
            height: 142,
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}
          type={"inverse"}
        />
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: "calc(var(--gutter) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <Fact
            style={{
              position: "relative",
              height: 142,
              flexGrow: 1,
              width: "auto",
            }}
            type={"inverse"}
          />
          {props.fact3 && (
          <Fact
            style={{
              position: "relative",
              height: 142,
              flexGrow: 1,
              width: "auto",
            }}
            type={"inverse"}
          />
          )}
        </div>
        {props.fact4 && (
        <div style={{
          position: "relative",
          borderTop: "1px solid var(--stroke-weak-inverse)",
          borderRight: "1px solid var(--stroke-weak-inverse)",
          borderBottom: "1px solid var(--stroke-weak-inverse)",
          borderLeft: "1px solid var(--stroke-weak-inverse)",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          padding: "16px 16px 16px 16px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingLeft: "calc(var(--spacing-100) * 1px)",
          paddingTop: "calc(var(--spacing-100) * 1px)",
          paddingRight: "calc(var(--spacing-100) * 1px)",
          paddingBottom: "calc(var(--spacing-100) * 1px)",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            width: 32,
            height: 32,
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <svg width={21.333} height={21.333} viewBox="0 0 21.333 21.333" fill="none" style={{
              position: "absolute",
              left: 5.333,
              top: 5.333,
              width: 21.333,
              height: 21.333,
              color: "var(--icon-brand-inverse)",
            }}>
              <path d={"M 0 21.333 L 0 18.667 L 3.667 18.667 L 3.133 18.2 C 1.978 17.178 1.167 16.011 0.7 14.7 C 0.233 13.389 0 12.067 0 10.733 C 0 8.267 0.739 6.072 2.217 4.15 C 3.694 2.228 5.622 0.956 8 0.333 L 8 3.133 C 6.4 3.711 5.111 4.694 4.133 6.083 C 3.156 7.472 2.667 9.022 2.667 10.733 C 2.667 11.733 2.856 12.706 3.233 13.65 C 3.611 14.594 4.2 15.467 5 16.267 L 5.333 16.6 L 5.333 13.333 L 8 13.333 L 8 21.333 L 0 21.333 Z M 13.333 21 L 13.333 18.2 C 14.933 17.622 16.222 16.639 17.2 15.25 C 18.178 13.861 18.667 12.311 18.667 10.6 C 18.667 9.6 18.478 8.628 18.1 7.683 C 17.722 6.739 17.133 5.867 16.333 5.067 L 16 4.733 L 16 8 L 13.333 8 L 13.333 0 L 21.333 0 L 21.333 2.667 L 17.667 2.667 L 18.2 3.133 C 19.289 4.222 20.083 5.406 20.583 6.683 C 21.083 7.961 21.333 9.267 21.333 10.6 C 21.333 13.067 20.594 15.261 19.117 17.183 C 17.639 19.106 15.711 20.378 13.333 21 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-050) * 1px)",
            alignItems: "center",
            flexWrap: "nowrap",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
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
            }}>0000</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              textAlign: "center",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>IMPRESSIVE STAT</span>
          </div>
        </div>
        )}
      </div>
      {props.citation && (
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 1.5,
        color: "var(--text-secondary-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.citation2}</span>
      )}
      {props.cTA && (
      <div style={{
        position: "relative",
        width: 91,
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-025) * 1px)",
        alignItems: "flex-start",
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
          <svg width={13.333} height={10} viewBox="0 0 13.333 10" fill="none" style={{
            position: "absolute",
            left: 3.333,
            top: 5,
            width: 13.333,
            height: 10,
            color: "var(--icon-interactive-inverse)",
          }}>
            <path d={"M 8.333 10 L 7.167 8.792 L 10.125 5.833 L 0 5.833 L 0 4.167 L 10.125 4.167 L 7.167 1.208 L 8.333 0 L 13.333 5 L 8.333 10 Z"} fill="currentColor" fillRule="nonzero" />
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
  const __impls = {
    // figma: Breakpoint=LG, Inverse=False
    "breakpoint=lg|inverse=false": __body0,
    // figma: Breakpoint=MD, Inverse=False
    "breakpoint=md|inverse=false": __body1,
    // figma: Breakpoint=SM, Inverse=False
    "breakpoint=sm|inverse=false": __body2,
    // figma: Breakpoint=SM Hero, Inverse=False
    "breakpoint=sm hero|inverse=false": __body3,
    // figma: Breakpoint=LG, Inverse=True
    "breakpoint=lg|inverse=true": __body4,
    // figma: Breakpoint=MD, Inverse=True
    "breakpoint=md|inverse=true": __body5,
    // figma: Breakpoint=SM, Inverse=True
    "breakpoint=sm|inverse=true": __body6,
    // figma: Breakpoint=SM Hero, Inverse=True
    "breakpoint=sm hero|inverse=true": __body7,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default StatsAndRankings;
