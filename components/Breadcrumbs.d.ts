import * as React from 'react';
export interface BreadcrumbsProps {
  className?: string;
  style?: React.CSSProperties;
  breakpoint?: "lg / md" | "sm";
  item2?: boolean;
  item3?: boolean;
  item8?: boolean;
  item4?: boolean;
  item6?: boolean;
  item5?: boolean;
  item7?: boolean;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon4?: React.ReactNode;
}
export declare const Breadcrumbs: React.FC<BreadcrumbsProps>;
export default Breadcrumbs;
