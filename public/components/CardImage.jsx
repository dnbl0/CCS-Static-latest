import { CategoryTag } from './CategoryTag.jsx';
import { EventInfo } from './EventInfo.jsx';
import { Slot2 } from './Slot2.jsx';

// figma node: 7283:4799 Card image (24 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "card=" + __venc(p.card) + '|' + "inverse=" + __venc(p.inverse) + '|' + "interaction=" + __venc(p.interaction) + '|' + "titleStyle=" + __venc(p.titleStyle);

export function CardImage(_p = {}) {
  const props = { ..._p, categoryTag: _p.categoryTag ?? false, card: _p.card ?? true, inverse: _p.inverse ?? false, interaction: _p.interaction ?? "card", titleStyle: _p.titleStyle ?? "title03", cTA: _p.cTA ?? true, title: _p.title ?? "Card title, keep it short and impactful", borderBottom: _p.borderBottom ?? false, event: _p.event ?? false, body: _p.body ?? "As soon as I have got flying to perfection, I have got a scheme about a steam engine.", body2: _p.body2 ?? true };
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{ position: "absolute", left: 1, top: 1 }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
  const __body13 = () => (
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{ position: "absolute", left: 1, top: 1 }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
  const __body14 = () => (
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{ position: "absolute", left: 1, top: 1 }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body15 = () => (
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{ position: "absolute", left: 1, top: 1 }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body16 = () => (
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
  const __body17 = () => (
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
  const __body18 = () => (
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body19 = () => (
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body20 = () => (
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
  const __body21 = () => (
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
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
  const __body22 = () => (
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={false}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __body23 = () => (
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
      <div className="fig-asset-3a550f638de7dac0" style={{
        position: "relative",
        minHeight: 32,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 220.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }} />
        {props.categoryTag && (
        <CategoryTag style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: 188,
          }} />
        )}
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
          {props.event && (
          <EventInfo
            style={{
              position: "relative",
              flexShrink: 0,
              alignSelf: "stretch",
              width: "auto",
            }}
            condensed={false}
            inverse={true}
          />
          )}
          {props.body2 && (
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.body}</span>
          )}
        </div>
      </div>
    </div>
  );
  const __impls = {
    // figma: Card=No, Inverse=False, Interaction=CTA, Title style=Title05
    "card=false|inverse=false|interaction=cta|titleStyle=title05": __body0,
    // figma: Card=No, Inverse=True, Interaction=CTA, Title style=Title05
    "card=false|inverse=true|interaction=cta|titleStyle=title05": __body1,
    // figma: Card=No, Inverse=False, Interaction=Card, Title style=Title05
    "card=false|inverse=false|interaction=card|titleStyle=title05": __body2,
    // figma: Card=No, Inverse=True, Interaction=Card, Title style=Title05
    "card=false|inverse=true|interaction=card|titleStyle=title05": __body3,
    // figma: Card=No, Inverse=False, Interaction=CTA, Title style=Title04
    "card=false|inverse=false|interaction=cta|titleStyle=title04": __body4,
    // figma: Card=No, Inverse=True, Interaction=CTA, Title style=Title04
    "card=false|inverse=true|interaction=cta|titleStyle=title04": __body5,
    // figma: Card=No, Inverse=False, Interaction=Card, Title style=Title04
    "card=false|inverse=false|interaction=card|titleStyle=title04": __body6,
    // figma: Card=No, Inverse=True, Interaction=Card, Title style=Title04
    "card=false|inverse=true|interaction=card|titleStyle=title04": __body7,
    // figma: Card=No, Inverse=False, Interaction=CTA, Title style=Title03
    "card=false|inverse=false|interaction=cta|titleStyle=title03": __body8,
    // figma: Card=No, Inverse=True, Interaction=CTA, Title style=Title03
    "card=false|inverse=true|interaction=cta|titleStyle=title03": __body9,
    // figma: Card=No, Inverse=False, Interaction=Card, Title style=Title03
    "card=false|inverse=false|interaction=card|titleStyle=title03": __body10,
    // figma: Card=No, Inverse=True, Interaction=Card, Title style=Title03
    "card=false|inverse=true|interaction=card|titleStyle=title03": __body11,
    // figma: Card=Yes, Inverse=False, Interaction=CTA, Title style=Title05
    "card=true|inverse=false|interaction=cta|titleStyle=title05": __body12,
    // figma: Card=Yes, Inverse=True, Interaction=CTA, Title style=Title05
    "card=true|inverse=true|interaction=cta|titleStyle=title05": __body13,
    // figma: Card=Yes, Inverse=False, Interaction=Card, Title style=Title05
    "card=true|inverse=false|interaction=card|titleStyle=title05": __body14,
    // figma: Card=Yes, Inverse=True, Interaction=Card, Title style=Title05
    "card=true|inverse=true|interaction=card|titleStyle=title05": __body15,
    // figma: Card=Yes, Inverse=False, Interaction=CTA, Title style=Title04
    "card=true|inverse=false|interaction=cta|titleStyle=title04": __body16,
    // figma: Card=Yes, Inverse=True, Interaction=CTA, Title style=Title04
    "card=true|inverse=true|interaction=cta|titleStyle=title04": __body17,
    // figma: Card=Yes, Inverse=False, Interaction=Card, Title style=Title04
    "card=true|inverse=false|interaction=card|titleStyle=title04": __body18,
    // figma: Card=Yes, Inverse=True, Interaction=Card, Title style=Title04
    "card=true|inverse=true|interaction=card|titleStyle=title04": __body19,
    // figma: Card=Yes, Inverse=False, Interaction=CTA, Title style=Title03
    "card=true|inverse=false|interaction=cta|titleStyle=title03": __body20,
    // figma: Card=Yes, Inverse=True, Interaction=CTA, Title style=Title03
    "card=true|inverse=true|interaction=cta|titleStyle=title03": __body21,
    // figma: Card=Yes, Inverse=False, Interaction=Card, Title style=Title03
    "card=true|inverse=false|interaction=card|titleStyle=title03": __body22,
    // figma: Card=Yes, Inverse=True, Interaction=Card, Title style=Title03
    "card=true|inverse=true|interaction=card|titleStyle=title03": __body23,
  };
  return (__impls[__vkey(props)] ?? __body22)();
}
export default CardImage;
