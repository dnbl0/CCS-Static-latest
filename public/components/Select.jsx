import { InputLabel } from './InputLabel.jsx';
import { InputValidation } from './InputValidation.jsx';
import { InputValue } from './InputValue.jsx';

// figma node: 65:4482 Select (14 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "state=" + __venc(p.state) + '|' + "error=" + __venc(p.error) + '|' + "inverse=" + __venc(p.inverse);

export function Select(_p = {}) {
  const props = { ..._p, label: _p.label ?? true, state: _p.state ?? "default", error: _p.error ?? true, inverse: _p.inverse ?? false };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-default)",
        borderTop: "1px solid var(--input-stroke-default)",
        borderRight: "1px solid var(--input-stroke-default)",
        borderBottom: "1px solid var(--input-stroke-default)",
        borderLeft: "1px solid var(--input-stroke-default)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-default)",
          borderRight: "1px solid var(--input-stroke-default)",
          borderBottom: "1px solid var(--input-stroke-default)",
          borderLeft: "1px solid var(--input-stroke-default)",
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
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-default-inverse)",
        borderTop: "1px solid var(--input-stroke-default-inverse)",
        borderRight: "1px solid var(--input-stroke-default-inverse)",
        borderBottom: "1px solid var(--input-stroke-default-inverse)",
        borderLeft: "1px solid var(--input-stroke-default-inverse)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-default-inverse)",
          borderRight: "1px solid var(--input-stroke-default-inverse)",
          borderBottom: "1px solid var(--input-stroke-default-inverse)",
          borderLeft: "1px solid var(--input-stroke-default-inverse)",
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
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary-inverse)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-hover)",
        borderTop: "1px solid var(--input-stroke-default)",
        borderRight: "1px solid var(--input-stroke-default)",
        borderBottom: "1px solid var(--input-stroke-default)",
        borderLeft: "1px solid var(--input-stroke-default)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-default)",
          borderRight: "1px solid var(--input-stroke-default)",
          borderBottom: "1px solid var(--input-stroke-default)",
          borderLeft: "1px solid var(--input-stroke-default)",
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
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-hover-inverse)",
        borderTop: "1px solid var(--input-stroke-default-inverse)",
        borderRight: "1px solid var(--input-stroke-default-inverse)",
        borderBottom: "1px solid var(--input-stroke-default-inverse)",
        borderLeft: "1px solid var(--input-stroke-default-inverse)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-default-inverse)",
          borderRight: "1px solid var(--input-stroke-default-inverse)",
          borderBottom: "1px solid var(--input-stroke-default-inverse)",
          borderLeft: "1px solid var(--input-stroke-default-inverse)",
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
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary-inverse)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-default)",
        borderTop: "2px solid var(--input-stroke-default)",
        borderRight: "2px solid var(--input-stroke-default)",
        borderBottom: "2px solid var(--input-stroke-default)",
        borderLeft: "2px solid var(--input-stroke-default)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-default)",
          borderRight: "1px solid var(--input-stroke-default)",
          borderBottom: "1px solid var(--input-stroke-default)",
          borderLeft: "1px solid var(--input-stroke-default)",
          display: "flex",
          flexDirection: "row",
          padding: "12px 12px 12px 12px",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
        <div style={{
          position: "absolute",
          left: -4,
          top: -4,
          width: 296,
          height: 56,
          borderTop: "2px solid var(--focus-focus)",
          borderRight: "2px solid var(--focus-focus)",
          borderBottom: "2px solid var(--focus-focus)",
          borderLeft: "2px solid var(--focus-focus)",
        }} />
      </div>
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-default-inverse)",
        borderTop: "2px solid var(--input-stroke-default-inverse)",
        borderRight: "2px solid var(--input-stroke-default-inverse)",
        borderBottom: "2px solid var(--input-stroke-default-inverse)",
        borderLeft: "2px solid var(--input-stroke-default-inverse)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-default-inverse)",
          borderRight: "1px solid var(--input-stroke-default-inverse)",
          borderBottom: "1px solid var(--input-stroke-default-inverse)",
          borderLeft: "1px solid var(--input-stroke-default-inverse)",
          display: "flex",
          flexDirection: "row",
          padding: "12px 12px 12px 12px",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary-inverse)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
        <div style={{
          position: "absolute",
          left: -4,
          top: -4,
          width: 296,
          height: 56,
          borderTop: "2px solid var(--focus-focus-inverse)",
          borderRight: "2px solid var(--focus-focus-inverse)",
          borderBottom: "2px solid var(--focus-focus-inverse)",
          borderLeft: "2px solid var(--focus-focus-inverse)",
        }} />
      </div>
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-default)",
        borderTop: "2px solid var(--input-stroke-error)",
        borderRight: "2px solid var(--input-stroke-error)",
        borderBottom: "2px solid var(--input-stroke-error)",
        borderLeft: "2px solid var(--input-stroke-error)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-error)",
          borderRight: "1px solid var(--input-stroke-error)",
          borderBottom: "1px solid var(--input-stroke-error)",
          borderLeft: "1px solid var(--input-stroke-error)",
          display: "flex",
          flexDirection: "row",
          padding: "12px 12px 12px 12px",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
      <InputValidation
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
      />
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-default-inverse)",
        borderTop: "2px solid var(--input-stroke-error-inverse)",
        borderRight: "2px solid var(--input-stroke-error-inverse)",
        borderBottom: "2px solid var(--input-stroke-error-inverse)",
        borderLeft: "2px solid var(--input-stroke-error-inverse)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-error-inverse)",
          borderRight: "1px solid var(--input-stroke-error-inverse)",
          borderBottom: "1px solid var(--input-stroke-error-inverse)",
          borderLeft: "1px solid var(--input-stroke-error-inverse)",
          display: "flex",
          flexDirection: "row",
          padding: "12px 12px 12px 12px",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary-inverse)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
      <InputValidation
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
      />
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-hover)",
        borderTop: "2px solid var(--input-stroke-error)",
        borderRight: "2px solid var(--input-stroke-error)",
        borderBottom: "2px solid var(--input-stroke-error)",
        borderLeft: "2px solid var(--input-stroke-error)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-error)",
          borderRight: "1px solid var(--input-stroke-error)",
          borderBottom: "1px solid var(--input-stroke-error)",
          borderLeft: "1px solid var(--input-stroke-error)",
          display: "flex",
          flexDirection: "row",
          padding: "12px 12px 12px 12px",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
      <InputValidation
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
      />
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-hover-inverse)",
        borderTop: "2px solid var(--input-stroke-error-inverse)",
        borderRight: "2px solid var(--input-stroke-error-inverse)",
        borderBottom: "2px solid var(--input-stroke-error-inverse)",
        borderLeft: "2px solid var(--input-stroke-error-inverse)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-error-inverse)",
          borderRight: "1px solid var(--input-stroke-error-inverse)",
          borderBottom: "1px solid var(--input-stroke-error-inverse)",
          borderLeft: "1px solid var(--input-stroke-error-inverse)",
          display: "flex",
          flexDirection: "row",
          padding: "12px 12px 12px 12px",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary-inverse)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
      <InputValidation
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
      />
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-default)",
        borderTop: "2px solid var(--input-stroke-error)",
        borderRight: "2px solid var(--input-stroke-error)",
        borderBottom: "2px solid var(--input-stroke-error)",
        borderLeft: "2px solid var(--input-stroke-error)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-error)",
          borderRight: "1px solid var(--input-stroke-error)",
          borderBottom: "1px solid var(--input-stroke-error)",
          borderLeft: "1px solid var(--input-stroke-error)",
          display: "flex",
          flexDirection: "row",
          padding: "12px 12px 12px 12px",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
        <div style={{
          position: "absolute",
          left: -4,
          top: -4,
          width: 296,
          height: 56,
          borderTop: "2px solid var(--focus-focus)",
          borderRight: "2px solid var(--focus-focus)",
          borderBottom: "2px solid var(--focus-focus)",
          borderLeft: "2px solid var(--focus-focus)",
        }} />
      </div>
      <InputValidation
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
      />
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-default-inverse)",
        borderTop: "2px solid var(--input-stroke-error-inverse)",
        borderRight: "2px solid var(--input-stroke-error-inverse)",
        borderBottom: "2px solid var(--input-stroke-error-inverse)",
        borderLeft: "2px solid var(--input-stroke-error-inverse)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <InputValue
          style={{
            position: "relative",
            flexGrow: 1,
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
          }}
          inverse={false}
          type={"none"}
        />
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-error-inverse)",
          borderRight: "1px solid var(--input-stroke-error-inverse)",
          borderBottom: "1px solid var(--input-stroke-error-inverse)",
          borderLeft: "1px solid var(--input-stroke-error-inverse)",
          display: "flex",
          flexDirection: "row",
          padding: "12px 12px 12px 12px",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-tertiary-inverse)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
        <div style={{
          position: "absolute",
          left: -4,
          top: -4,
          width: 296,
          height: 56,
          borderTop: "2px solid var(--focus-focus-inverse)",
          borderRight: "2px solid var(--focus-focus-inverse)",
          borderBottom: "2px solid var(--focus-focus-inverse)",
          borderLeft: "2px solid var(--focus-focus-inverse)",
        }} />
      </div>
      <InputValidation
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
      />
    </div>
  );
  const __body12 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-disabled)",
        borderTop: "1px solid var(--input-stroke-disabled)",
        borderRight: "1px solid var(--input-stroke-disabled)",
        borderBottom: "1px solid var(--input-stroke-disabled)",
        borderLeft: "1px solid var(--input-stroke-disabled)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--button-icon-disabled)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
          <div style={{ position: "relative", flexGrow: 1, alignSelf: "stretch" }} />
          <div style={{
            position: "relative",
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--button-icon-disabled)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-disabled)",
          borderRight: "1px solid var(--input-stroke-disabled)",
          borderBottom: "1px solid var(--input-stroke-disabled)",
          borderLeft: "1px solid var(--input-stroke-disabled)",
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
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-disabled)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
  const __body13 = () => (
    <div className={props.className} style={{
      width: 288,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-050) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.label && (
      <InputLabel
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
      />
      )}
      <div style={{
        position: "relative",
        height: "calc(var(--size-300) * 1px)",
        backgroundColor: "var(--input-fill-disabled-inverse)",
        borderTop: "1px solid var(--input-stroke-disabled-inverse)",
        borderRight: "1px solid var(--input-stroke-disabled-inverse)",
        borderBottom: "1px solid var(--input-stroke-disabled-inverse)",
        borderLeft: "1px solid var(--input-stroke-disabled-inverse)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--button-icon-disabled)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
          <div style={{ position: "relative", flexGrow: 1, alignSelf: "stretch" }} />
          <div style={{
            position: "relative",
            width: "calc(var(--size-150) * 1px)",
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{
              position: "absolute",
              left: 4,
              top: 4,
              width: 16,
              height: 16,
              color: "var(--button-icon-disabled)",
            }}>
              <path d={"M 0 16 L 0 14 L 2.75 14 L 2.35 13.65 C 1.483 12.883 0.875 12.008 0.525 11.025 C 0.175 10.042 0 9.05 0 8.05 C 0 6.2 0.554 4.554 1.663 3.112 C 2.771 1.671 4.217 0.717 6 0.25 L 6 2.35 C 4.8 2.783 3.833 3.521 3.1 4.563 C 2.367 5.604 2 6.767 2 8.05 C 2 8.8 2.142 9.529 2.425 10.238 C 2.708 10.946 3.15 11.6 3.75 12.2 L 4 12.45 L 4 10 L 6 10 L 6 16 L 0 16 Z M 10 15.75 L 10 13.65 C 11.2 13.217 12.167 12.479 12.9 11.438 C 13.633 10.396 14 9.233 14 7.95 C 14 7.2 13.858 6.471 13.575 5.763 C 13.292 5.054 12.85 4.4 12.25 3.8 L 12 3.55 L 12 6 L 10 6 L 10 0 L 16 0 L 16 2 L 13.25 2 L 13.65 2.35 C 14.467 3.167 15.063 4.054 15.438 5.013 C 15.813 5.971 16 6.95 16 7.95 C 16 9.8 15.446 11.446 14.338 12.887 C 13.229 14.329 11.783 15.283 10 15.75 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
        <div style={{
          position: "relative",
          backgroundColor: "rgba(255,255,255,0)",
          borderTop: "1px solid var(--input-stroke-disabled-inverse)",
          borderRight: "1px solid var(--input-stroke-disabled-inverse)",
          borderBottom: "1px solid var(--input-stroke-disabled-inverse)",
          borderLeft: "1px solid var(--input-stroke-disabled-inverse)",
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
            overflow: "hidden",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <svg width={12} height={7.400} viewBox="0 0 12 7.400" fill="none" style={{
              position: "absolute",
              left: 6,
              top: 8,
              width: 12,
              height: 7.4,
              color: "var(--button-icon-disabled)",
            }}>
              <path d={"M 6 7.4 L 0 1.4 L 1.4 0 L 6 4.6 L 10.6 0 L 12 1.4 L 6 7.4 Z"} fill="currentColor" fillRule="nonzero" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
  const __impls = {
    // figma: State=Default, Error=False, Inverse=False
    "state=default|error=false|inverse=false": __body0,
    // figma: State=Default, Error=False, Inverse=True
    "state=default|error=false|inverse=true": __body1,
    // figma: State=Hover, Error=False, Inverse=False
    "state=hover|error=false|inverse=false": __body2,
    // figma: State=Hover, Error=False, Inverse=True
    "state=hover|error=false|inverse=true": __body3,
    // figma: State=Active, Error=False, Inverse=False
    "state=active|error=false|inverse=false": __body4,
    // figma: State=Active, Error=False, Inverse=True
    "state=active|error=false|inverse=true": __body5,
    // figma: State=Default, Error=True, Inverse=False
    "state=default|error=true|inverse=false": __body6,
    // figma: State=Default, Error=True, Inverse=True
    "state=default|error=true|inverse=true": __body7,
    // figma: State=Hover, Error=True, Inverse=False
    "state=hover|error=true|inverse=false": __body8,
    // figma: State=Hover, Error=True, Inverse=True
    "state=hover|error=true|inverse=true": __body9,
    // figma: State=Active, Error=True, Inverse=False
    "state=active|error=true|inverse=false": __body10,
    // figma: State=Active, Error=True, Inverse=True
    "state=active|error=true|inverse=true": __body11,
    // figma: State=Disabled, Error=False, Inverse=False
    "state=disabled|error=false|inverse=false": __body12,
    // figma: State=Disabled, Error=False, Inverse=True
    "state=disabled|error=false|inverse=true": __body13,
  };
  return (__impls[__vkey(props)] ?? __body6)();
}
export default Select;
