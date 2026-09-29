import { BreadcrumbItem } from './BreadcrumbItem.jsx';

// figma node: 7382:8804 Breadcrumbs (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "breakpoint=" + __venc(p.breakpoint);

export function Breadcrumbs(_p = {}) {
  const props = { ..._p, breakpoint: _p.breakpoint ?? "lg / md", item2: _p.item2 ?? true, item3: _p.item3 ?? true, item8: _p.item8 ?? false, item4: _p.item4 ?? true, item6: _p.item6 ?? false, item5: _p.item5 ?? false, item7: _p.item7 ?? false };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 1440,
      backgroundColor: "var(--background-tertiary-inverse)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      padding: "8px 16px 8px 16px",
      alignItems: "flex-start",
      flexWrap: "wrap",
      alignContent: "space-between",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-100) * 1px)",
      paddingTop: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-100) * 1px)",
      paddingBottom: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}>{props.icon1 ?? <BreadcrumbItem order={"first (home)"} state={"default"} />}</div>
      {props.item8 && (
      <div style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}>{props.icon2 ?? <BreadcrumbItem order={"link"} state={"default"} />}</div>
      )}
      {props.item7 && (
      <div style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}>{props.icon3 ?? <BreadcrumbItem order={"link"} state={"default"} />}</div>
      )}
      {props.item6 && (
      <div style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}>{props.icon4 ?? <BreadcrumbItem order={"link"} state={"default"} />}</div>
      )}
      {props.item5 && (
      <BreadcrumbItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        order={"link"}
        state={"default"}
      />
      )}
      {props.item4 && (
      <BreadcrumbItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        order={"link"}
        state={"default"}
      />
      )}
      {props.item3 && (
      <BreadcrumbItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        order={"link"}
        state={"default"}
      />
      )}
      {props.item2 && (
      <BreadcrumbItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        order={"link"}
        state={"default"}
      />
      )}
      <BreadcrumbItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}
        order={"last"}
        state={"default"}
      />
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 360,
      backgroundColor: "var(--background-tertiary-inverse)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-025) * 1px)",
      padding: "8px 16px 8px 16px",
      alignItems: "flex-start",
      flexWrap: "wrap",
      alignContent: "space-between",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--spacing-100) * 1px)",
      paddingTop: "calc(var(--spacing-050) * 1px)",
      paddingRight: "calc(var(--spacing-100) * 1px)",
      paddingBottom: "calc(var(--spacing-050) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.item2 && (
      <div style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
        }}>{props.icon1 ?? <BreadcrumbItem order={"previous"} state={"default"} />}</div>
      )}
    </div>
  );
  const __impls = {
    // figma: Breakpoint=LG / MD
    "breakpoint=lg / md": __body0,
    // figma: Breakpoint=SM
    "breakpoint=sm": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default Breadcrumbs;
