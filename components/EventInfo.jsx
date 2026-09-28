import { Calendar } from './Calendar.jsx';
import { Location } from './Location.jsx';
import { Price } from './Price.jsx';

// figma node: 7283:5312 .event_info (4 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "condensed=" + __venc(p.condensed) + '|' + "inverse=" + __venc(p.inverse);

export function EventInfo(_p = {}) {
  const props = { ..._p, condensed: _p.condensed ?? false, inverse: _p.inverse ?? true, price: _p.price ?? "$150-300", location: _p.location ?? "Martyn Myer Arena (G91), Building 873", dateTime: _p.dateTime ?? "6 - 12  June, 7:00PM - 9:00PM AEDT" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 418,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-050) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "2px 0px 2px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-012) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 24,
              height: 24,
              flexShrink: 0,
              color: "var(--icon-brand)",
            }}>{props.icon1 ?? <Calendar />}</div>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-brand)",
          flexGrow: 1,
        }}>{props.dateTime}</span>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-050) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "2px 0px 2px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-012) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 24,
              height: 24,
              flexShrink: 0,
              color: "var(--icon-brand)",
            }}>{props.icon2 ?? <Location />}</div>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-brand)",
          flexGrow: 1,
        }}>{props.location}</span>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-050) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "2px 0px 2px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-012) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 24,
              height: 24,
              flexShrink: 0,
              color: "var(--icon-brand)",
            }}>{props.icon3 ?? <Price />}</div>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-brand)",
          flexGrow: 1,
        }}>{props.price}</span>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 418,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-050) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "2px 0px 2px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-012) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 24,
              height: 24,
              flexShrink: 0,
              color: "var(--icon-brand-inverse)",
            }}>{props.icon1 ?? <Calendar />}</div>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-brand-inverse)",
          flexGrow: 1,
        }}>{props.dateTime}</span>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-050) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "2px 0px 2px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-012) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 24,
              height: 24,
              flexShrink: 0,
              color: "var(--icon-brand-inverse)",
            }}>{props.icon2 ?? <Location />}</div>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-brand-inverse)",
          flexGrow: 1,
        }}>{props.location}</span>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-050) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          padding: "2px 0px 2px 0px",
          alignItems: "center",
          flexWrap: "nowrap",
          boxSizing: "border-box",
          paddingTop: "calc(var(--spacing-012) * 1px)",
          flexShrink: 0,
        }}>
          <div style={{
              position: "relative",
              width: 24,
              height: 24,
              flexShrink: 0,
              color: "var(--icon-brand-inverse)",
            }}>{props.icon3 ?? <Price />}</div>
        </div>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-brand-inverse)",
          flexGrow: 1,
        }}>{props.price}</span>
      </div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 418,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-050) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-brand)",
          flexGrow: 1,
        }}>{props.dateTime}</span>
      </div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 418,
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        gap: "calc(var(--spacing-050) * 1px)",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <span style={{
          position: "relative",
          fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--text-brand-inverse)",
          flexGrow: 1,
        }}>{props.dateTime}</span>
      </div>
    </div>
  );
  const __impls = {
    // figma: Condensed=False, Inverse=False
    "condensed=false|inverse=false": __body0,
    // figma: Condensed=False, Inverse=True
    "condensed=false|inverse=true": __body1,
    // figma: Condensed=True, Inverse=False
    "condensed=true|inverse=false": __body2,
    // figma: Condensed=True, Inverse=True
    "condensed=true|inverse=true": __body3,
  };
  return (__impls[__vkey(props)] ?? __body1)();
}
export default EventInfo;
