import { ArrowLeft } from './ArrowLeft.jsx';
import { ArrowRight } from './ArrowRight.jsx';
import { Home } from './Home.jsx';

// figma node: 7382:8460 .breadcrumb_item (13 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "order=" + __venc(p.order) + '|' + "state=" + __venc(p.state);

export function BreadcrumbItem(_p = {}) {
  const props = { ..._p, order: _p.order ?? "first (home)", state: _p.state ?? "default", label: _p.label ?? "Label" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: "calc(var(--component-action-breadcrumb-font-size) * 1px)",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon1 ?? <ArrowRight />}</div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon1 ?? <ArrowLeft />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: "calc(var(--component-action-breadcrumb-font-size) * 1px)",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 600,
        fontSize: "calc(var(--component-action-breadcrumb-font-size) * 1px)",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--link-text-default-inverse)",
        }}>{props.icon1 ?? <Home />}</div>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon2 ?? <ArrowRight />}</div>
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: "calc(var(--component-action-breadcrumb-font-size) * 1px)",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon1 ?? <ArrowRight />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 45,
        height: 32,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon1 ?? <ArrowLeft />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: "calc(var(--component-action-breadcrumb-font-size) * 1px)",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-default-inverse)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
        position: "absolute",
        left: 24,
        top: -4,
        width: 45,
        height: 32,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--link-text-default-inverse)",
        }}>{props.icon1 ?? <Home />}</div>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon2 ?? <ArrowRight />}</div>
      <div style={{
        position: "absolute",
        left: -4,
        top: -4,
        width: 32,
        height: 32,
        borderTop: "2px solid var(--focus-focus-inverse)",
        borderRight: "2px solid var(--focus-focus-inverse)",
        borderBottom: "2px solid var(--focus-focus-inverse)",
        borderLeft: "2px solid var(--focus-focus-inverse)",
      }} />
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: "calc(var(--component-action-breadcrumb-font-size) * 1px)",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon1 ?? <ArrowRight />}</div>
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon1 ?? <ArrowLeft />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: "calc(var(--component-action-breadcrumb-font-size) * 1px)",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-hover-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--link-text-hover-inverse)",
        }}>{props.icon1 ?? <Home />}</div>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon2 ?? <ArrowRight />}</div>
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: "calc(var(--component-action-breadcrumb-font-size) * 1px)",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon1 ?? <ArrowRight />}</div>
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon1 ?? <ArrowLeft />}</div>
      <span style={{
        position: "relative",
        fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
        fontWeight: 400,
        fontSize: "calc(var(--component-action-breadcrumb-font-size) * 1px)",
        whiteSpace: "nowrap",
        lineHeight: "24px",
        color: "var(--link-text-down-inverse)",
        textDecoration: "underline",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>{props.label}</span>
    </div>
  );
  const __body12 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "rgb(255,255,255)",
        }}>{props.icon1 ?? <Home />}</div>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "var(--icon-brand-inverse)",
        }}>{props.icon2 ?? <ArrowRight />}</div>
    </div>
  );
  const __impls = {
    // figma: Order=Link, State=Default
    "order=link|state=default": __body0,
    // figma: Order=Previous, State=Default
    "order=previous|state=default": __body1,
    // figma: Order=Last, State=Default
    "order=last|state=default": __body2,
    // figma: Order=First (home), State=Default
    "order=first (home)|state=default": __body3,
    // figma: Order=Link, State=Focus
    "order=link|state=focus": __body4,
    // figma: Order=Previous, State=Focus
    "order=previous|state=focus": __body5,
    // figma: Order=First (home), State=Focus
    "order=first (home)|state=focus": __body6,
    // figma: Order=Link, State=Hover
    "order=link|state=hover": __body7,
    // figma: Order=Previous, State=Hover
    "order=previous|state=hover": __body8,
    // figma: Order=First (home), State=Hover
    "order=first (home)|state=hover": __body9,
    // figma: Order=Link, State=Down
    "order=link|state=down": __body10,
    // figma: Order=Previous, State=Down
    "order=previous|state=down": __body11,
    // figma: Order=First (home), State=Down
    "order=first (home)|state=down": __body12,
  };
  return (__impls[__vkey(props)] ?? __body3)();
}
export default BreadcrumbItem;
