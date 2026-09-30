import React from 'react';
import { BreadcrumbItem } from './BreadcrumbItem.jsx';

// figma node: 7382:8804 Breadcrumbs (2 variants)
// Aligned to UoM Gen 3 CMS Breadcrumbs: nav.page-breadcrumbs > ol.page-local-history > li[itemprop="itemListElement"]
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "breakpoint=" + __venc(p.breakpoint);

export function Breadcrumbs(_p = {}) {
  const {
    items,
    className = "",
    style = {},
    breakpoint = "lg / md",
    item2 = true,
    item3 = true,
    item4 = true,
    item5 = false,
    item6 = false,
    item7 = false,
    item8 = false,
    icon1,
    icon2,
    icon3,
    icon4,
    ...props
  } = _p;

  // If custom items array is provided
  if (items && Array.isArray(items)) {
    return (
      <nav className={`page-breadcrumbs ${className}`} style={style} aria-label="Breadcrumb">
        <ol className="page-local-history" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((crumb, idx) => {
            const isRoot = idx === 0;
            const isLast = idx === items.length - 1;
            return (
              <li
                key={idx}
                className={isRoot ? "root" : ""}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                aria-current={isLast ? "page" : undefined}
              >
                {crumb.href && !isLast ? (
                  <a href={crumb.href} itemProp="item" title={crumb.title || crumb.label}>
                    <span itemProp="name">{crumb.label}</span>
                  </a>
                ) : (
                  <span itemProp="name">{crumb.label}</span>
                )}
                <meta content={String(idx + 1)} itemProp="position" />
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  const __body0 = () => (
    <nav className={`page-breadcrumbs ${className}`} style={{
      width: "100%",
      backgroundColor: "var(--uom-ds-color-background-tertiary-inverse, var(--background-tertiary-inverse, #00354c))",
      color: "var(--uom-ds-color-text-link-inverse, #ffffff)",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "wrap",
      boxSizing: "border-box",
      position: "relative",
      ...style,
    }} aria-label="Breadcrumb">
      <ol className="page-local-history" itemScope itemType="https://schema.org/BreadcrumbList" style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "calc(var(--spacing-025, 4) * 1px)",
        listStyle: "none",
        margin: 0,
        padding: "12px 32px",
        maxWidth: 1440,
        marginLeft: "auto",
        marginRight: "auto",
        boxSizing: "border-box",
      }}>
        <li className="root" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          {icon1 ?? (
            <a href="/" itemProp="item" title="Home" style={{ color: "#fff", textDecoration: "none" }}>
              <span itemProp="name">Home</span>
            </a>
          )}
          <meta content="1" itemProp="position" />
        </li>
        {item8 && (
          <li className="" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {icon2 ?? <BreadcrumbItem order={"link"} state={"default"} label="CMS" />}
            <meta content="2" itemProp="position" />
          </li>
        )}
        {item7 && (
          <li className="" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {icon3 ?? <BreadcrumbItem order={"link"} state={"default"} />}
            <meta content="3" itemProp="position" />
          </li>
        )}
        {item6 && (
          <li className="" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {icon4 ?? <BreadcrumbItem order={"link"} state={"default"} />}
            <meta content="4" itemProp="position" />
          </li>
        )}
        {item5 && (
          <li className="" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <BreadcrumbItem order={"link"} state={"default"} />
            <meta content="5" itemProp="position" />
          </li>
        )}
        {item4 && (
          <li className="" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <BreadcrumbItem order={"link"} state={"default"} />
            <meta content="6" itemProp="position" />
          </li>
        )}
        {item3 && (
          <li className="" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <BreadcrumbItem order={"link"} state={"default"} label="CMS" />
            <meta content="2" itemProp="position" />
          </li>
        )}
        {item2 && (
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" aria-current="page">
            <BreadcrumbItem order={"last"} state={"default"} label="Breadcrumbs" />
            <meta content="3" itemProp="position" />
          </li>
        )}
      </ol>
    </nav>
  );

  const __body1 = () => (
    <nav className={`page-breadcrumbs ${className}`} style={{
      width: "100%",
      backgroundColor: "var(--uom-ds-color-background-tertiary-inverse, var(--background-tertiary-inverse, #00354c))",
      color: "var(--uom-ds-color-text-link-inverse, #ffffff)",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "wrap",
      boxSizing: "border-box",
      position: "relative",
      ...style,
    }} aria-label="Breadcrumb">
      <ol className="page-local-history bc-mobile" itemScope itemType="https://schema.org/BreadcrumbList" style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        listStyle: "none",
        margin: 0,
        padding: "12px 16px",
        boxSizing: "border-box",
      }}>
        {item2 && (
          <li className="root" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {icon1 ?? <BreadcrumbItem order={"previous"} state={"default"} label="Home" />}
            <meta content="1" itemProp="position" />
          </li>
        )}
      </ol>
    </nav>
  );

  const __impls = {
    // figma: Breakpoint=LG / MD
    "breakpoint=lg / md": __body0,
    // figma: Breakpoint=SM
    "breakpoint=sm": __body1,
  };

  return (__impls[__vkey({ breakpoint })] ?? __body0)();
}

export default Breadcrumbs;
