import { Imagesmode } from './Imagesmode.jsx';
import { Slot2 } from './Slot2.jsx';

// figma node: 7283:4635 Card icon (48 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "card=" + __venc(p.card) + '|' + "inverse=" + __venc(p.inverse) + '|' + "alignment=" + __venc(p.alignment) + '|' + "titleStyle=" + __venc(p.titleStyle) + '|' + "interaction=" + __venc(p.interaction);

export function CardIcon(_p = {}) {
  const props = { ..._p, card: _p.card ?? true, inverse: _p.inverse ?? false, alignment: _p.alignment ?? "left", titleStyle: _p.titleStyle ?? "title03", interaction: _p.interaction ?? "card", cTA: _p.cTA ?? true, borderBottom: _p.borderBottom ?? false, title: _p.title ?? "Card title, keep it short and impactful", body: _p.body ?? true, body2: _p.body2 ?? "As soon as I have got flying to perfection, I have got a scheme about a steam engine." };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 24,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 24,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body12 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body13 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body14 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 24,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body15 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 24,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body16 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body17 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body18 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 32,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body19 = () => (
    <div className={props.className} style={{
      width: 392,
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
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 32,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body20 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body21 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body22 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 32,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body23 = () => (
    <div className={props.className} style={{
      width: 392,
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
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        alignItems: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 32,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
      {props.borderBottom && (
      <svg height={1} viewBox="0 0 392 1" fill="none" style={{
        position: "relative",
        height: "calc(var(--stroke-100) * 1px)",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
        color: "var(--stroke-weaker)",
      }}>
        <path d={"M 0 0 L 392 0 L 392 1 L 0 1 L 0 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
      )}
    </div>
  );
  const __body24 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body25 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body26 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
    </div>
  );
  const __body27 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
    </div>
  );
  const __body28 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body29 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body30 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body31 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body32 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body33 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body34 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 24,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
    </div>
  );
  const __body35 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 24,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
    </div>
  );
  const __body36 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body37 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body38 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 24,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body39 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 24,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body40 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 32,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body41 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body42 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 32,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
    </div>
  );
  const __body43 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 32,
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
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
        </div>
      </div>
    </div>
  );
  const __body44 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body45 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
        {props.cTA && (
        <div style={{
            position: "relative",
            flexShrink: 0,
            alignSelf: "stretch",
            width: "auto",
          }}>{props.cTASlot ?? <Slot2 type={"small"} />}</div>
        )}
      </div>
    </div>
  );
  const __body46 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1)",
      borderTop: "1px solid var(--stroke-weaker)",
      borderRight: "1px solid var(--stroke-weaker)",
      borderBottom: "1px solid var(--stroke-weaker)",
      borderLeft: "1px solid var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 32,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body47 = () => (
    <div className={props.className} style={{
      width: 392,
      overflow: "hidden",
      backgroundColor: "var(--background-elevation-1-inverse)",
      borderTop: "1px solid var(--stroke-weaker-inverse)",
      borderRight: "1px solid var(--stroke-weaker-inverse)",
      borderBottom: "1px solid var(--stroke-weaker-inverse)",
      borderLeft: "1px solid var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "24px 24px 24px 24px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-000) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
            position: "relative",
            width: 48,
            height: 48,
            flexShrink: 0,
            color: "var(--icon-brand-inverse)",
          }}>{props.icon ?? <Imagesmode />}</div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "24px 24px 24px 24px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--spacing-card) * 1px)",
        paddingTop: "calc(var(--spacing-150) * 1px)",
        paddingRight: "calc(var(--spacing-card) * 1px)",
        paddingBottom: "calc(var(--spacing-150) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
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
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 32,
            textAlign: "center",
            lineHeight: 1.2000000476837158,
            color: "var(--link-text-default-inverse)",
            textDecoration: "underline",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.title}</span>
          {props.body && (
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
          }}>{props.body2}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __impls = {
    // figma: Card=No, Inverse=False, Alignment=Left, Title style=Title05, Interaction=CTA
    "card=false|inverse=false|alignment=left|titleStyle=title05|interaction=cta": __body0,
    // figma: Card=No, Inverse=True, Alignment=Left, Title style=Title05, Interaction=CTA
    "card=false|inverse=true|alignment=left|titleStyle=title05|interaction=cta": __body1,
    // figma: Card=No, Inverse=False, Alignment=Left, Title style=Title05, Interaction=Card
    "card=false|inverse=false|alignment=left|titleStyle=title05|interaction=card": __body2,
    // figma: Card=No, Inverse=True, Alignment=Left, Title style=Title05, Interaction=Card
    "card=false|inverse=true|alignment=left|titleStyle=title05|interaction=card": __body3,
    // figma: Card=No, Inverse=False, Alignment=Centre, Title style=Title05, Interaction=CTA
    "card=false|inverse=false|alignment=centre|titleStyle=title05|interaction=cta": __body4,
    // figma: Card=No, Inverse=True, Alignment=Centre, Title style=Title05, Interaction=CTA
    "card=false|inverse=true|alignment=centre|titleStyle=title05|interaction=cta": __body5,
    // figma: Card=No, Inverse=False, Alignment=Centre, Title style=Title05, Interaction=Card
    "card=false|inverse=false|alignment=centre|titleStyle=title05|interaction=card": __body6,
    // figma: Card=No, Inverse=True, Alignment=Centre, Title style=Title05, Interaction=Card
    "card=false|inverse=true|alignment=centre|titleStyle=title05|interaction=card": __body7,
    // figma: Card=No, Inverse=False, Alignment=Left, Title style=Title04, Interaction=CTA
    "card=false|inverse=false|alignment=left|titleStyle=title04|interaction=cta": __body8,
    // figma: Card=No, Inverse=True, Alignment=Left, Title style=Title04, Interaction=CTA
    "card=false|inverse=true|alignment=left|titleStyle=title04|interaction=cta": __body9,
    // figma: Card=No, Inverse=False, Alignment=Left, Title style=Title04, Interaction=Card
    "card=false|inverse=false|alignment=left|titleStyle=title04|interaction=card": __body10,
    // figma: Card=No, Inverse=True, Alignment=Left, Title style=Title04, Interaction=Card
    "card=false|inverse=true|alignment=left|titleStyle=title04|interaction=card": __body11,
    // figma: Card=No, Inverse=False, Alignment=Centre, Title style=Title04, Interaction=CTA
    "card=false|inverse=false|alignment=centre|titleStyle=title04|interaction=cta": __body12,
    // figma: Card=No, Inverse=True, Alignment=Centre, Title style=Title04, Interaction=CTA
    "card=false|inverse=true|alignment=centre|titleStyle=title04|interaction=cta": __body13,
    // figma: Card=No, Inverse=False, Alignment=Centre, Title style=Title04, Interaction=Card
    "card=false|inverse=false|alignment=centre|titleStyle=title04|interaction=card": __body14,
    // figma: Card=No, Inverse=True, Alignment=Centre, Title style=Title04, Interaction=Card
    "card=false|inverse=true|alignment=centre|titleStyle=title04|interaction=card": __body15,
    // figma: Card=No, Inverse=False, Alignment=Left, Title style=Title03, Interaction=CTA
    "card=false|inverse=false|alignment=left|titleStyle=title03|interaction=cta": __body16,
    // figma: Card=No, Inverse=True, Alignment=Left, Title style=Title03, Interaction=CTA
    "card=false|inverse=true|alignment=left|titleStyle=title03|interaction=cta": __body17,
    // figma: Card=No, Inverse=False, Alignment=Left, Title style=Title03, Interaction=Card
    "card=false|inverse=false|alignment=left|titleStyle=title03|interaction=card": __body18,
    // figma: Card=No, Inverse=True, Alignment=Left, Title style=Title03, Interaction=Card
    "card=false|inverse=true|alignment=left|titleStyle=title03|interaction=card": __body19,
    // figma: Card=No, Inverse=False, Alignment=Centre, Title style=Title03, Interaction=CTA
    "card=false|inverse=false|alignment=centre|titleStyle=title03|interaction=cta": __body20,
    // figma: Card=No, Inverse=True, Alignment=Centre, Title style=Title03, Interaction=CTA
    "card=false|inverse=true|alignment=centre|titleStyle=title03|interaction=cta": __body21,
    // figma: Card=No, Inverse=False, Alignment=Centre, Title style=Title03, Interaction=Card
    "card=false|inverse=false|alignment=centre|titleStyle=title03|interaction=card": __body22,
    // figma: Card=No, Inverse=True, Alignment=Centre, Title style=Title03, Interaction=Card
    "card=false|inverse=true|alignment=centre|titleStyle=title03|interaction=card": __body23,
    // figma: Card=Yes, Inverse=False, Alignment=Left, Title style=Title05, Interaction=CTA
    "card=true|inverse=false|alignment=left|titleStyle=title05|interaction=cta": __body24,
    // figma: Card=Yes, Inverse=True, Alignment=Left, Title style=Title05, Interaction=CTA
    "card=true|inverse=true|alignment=left|titleStyle=title05|interaction=cta": __body25,
    // figma: Card=Yes, Inverse=False, Alignment=Left, Title style=Title05, Interaction=Card
    "card=true|inverse=false|alignment=left|titleStyle=title05|interaction=card": __body26,
    // figma: Card=Yes, Inverse=True, Alignment=Left, Title style=Title05, Interaction=Card
    "card=true|inverse=true|alignment=left|titleStyle=title05|interaction=card": __body27,
    // figma: Card=Yes, Inverse=False, Alignment=Centre, Title style=Title05, Interaction=CTA
    "card=true|inverse=false|alignment=centre|titleStyle=title05|interaction=cta": __body28,
    // figma: Card=Yes, Inverse=True, Alignment=Centre, Title style=Title05, Interaction=CTA
    "card=true|inverse=true|alignment=centre|titleStyle=title05|interaction=cta": __body29,
    // figma: Card=Yes, Inverse=False, Alignment=Centre, Title style=Title05, Interaction=Card
    "card=true|inverse=false|alignment=centre|titleStyle=title05|interaction=card": __body30,
    // figma: Card=Yes, Inverse=True, Alignment=Centre, Title style=Title05, Interaction=Card
    "card=true|inverse=true|alignment=centre|titleStyle=title05|interaction=card": __body31,
    // figma: Card=Yes, Inverse=False, Alignment=Left, Title style=Title04, Interaction=CTA
    "card=true|inverse=false|alignment=left|titleStyle=title04|interaction=cta": __body32,
    // figma: Card=Yes, Inverse=True, Alignment=Left, Title style=Title04, Interaction=CTA
    "card=true|inverse=true|alignment=left|titleStyle=title04|interaction=cta": __body33,
    // figma: Card=Yes, Inverse=False, Alignment=Left, Title style=Title04, Interaction=Card
    "card=true|inverse=false|alignment=left|titleStyle=title04|interaction=card": __body34,
    // figma: Card=Yes, Inverse=True, Alignment=Left, Title style=Title04, Interaction=Card
    "card=true|inverse=true|alignment=left|titleStyle=title04|interaction=card": __body35,
    // figma: Card=Yes, Inverse=False, Alignment=Centre, Title style=Title04, Interaction=CTA
    "card=true|inverse=false|alignment=centre|titleStyle=title04|interaction=cta": __body36,
    // figma: Card=Yes, Inverse=True, Alignment=Centre, Title style=Title04, Interaction=CTA
    "card=true|inverse=true|alignment=centre|titleStyle=title04|interaction=cta": __body37,
    // figma: Card=Yes, Inverse=False, Alignment=Centre, Title style=Title04, Interaction=Card
    "card=true|inverse=false|alignment=centre|titleStyle=title04|interaction=card": __body38,
    // figma: Card=Yes, Inverse=True, Alignment=Centre, Title style=Title04, Interaction=Card
    "card=true|inverse=true|alignment=centre|titleStyle=title04|interaction=card": __body39,
    // figma: Card=Yes, Inverse=False, Alignment=Left, Title style=Title03, Interaction=CTA
    "card=true|inverse=false|alignment=left|titleStyle=title03|interaction=cta": __body40,
    // figma: Card=Yes, Inverse=True, Alignment=Left, Title style=Title03, Interaction=CTA
    "card=true|inverse=true|alignment=left|titleStyle=title03|interaction=cta": __body41,
    // figma: Card=Yes, Inverse=False, Alignment=Left, Title style=Title03, Interaction=Card
    "card=true|inverse=false|alignment=left|titleStyle=title03|interaction=card": __body42,
    // figma: Card=Yes, Inverse=True, Alignment=Left, Title style=Title03, Interaction=Card
    "card=true|inverse=true|alignment=left|titleStyle=title03|interaction=card": __body43,
    // figma: Card=Yes, Inverse=False, Alignment=Centre, Title style=Title03, Interaction=CTA
    "card=true|inverse=false|alignment=centre|titleStyle=title03|interaction=cta": __body44,
    // figma: Card=Yes, Inverse=True, Alignment=Centre, Title style=Title03, Interaction=CTA
    "card=true|inverse=true|alignment=centre|titleStyle=title03|interaction=cta": __body45,
    // figma: Card=Yes, Inverse=False, Alignment=Centre, Title style=Title03, Interaction=Card
    "card=true|inverse=false|alignment=centre|titleStyle=title03|interaction=card": __body46,
    // figma: Card=Yes, Inverse=True, Alignment=Centre, Title style=Title03, Interaction=Card
    "card=true|inverse=true|alignment=centre|titleStyle=title03|interaction=card": __body47,
  };
  return (__impls[__vkey(props)] ?? __body42)();
}
export default CardIcon;
