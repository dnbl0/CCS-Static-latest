import * as React from 'react';
export interface BreadcrumbItemProps {
  className?: string;
  style?: React.CSSProperties;
  order?: "first (home)" | "last" | "link" | "previous";
  state?: "default" | "hover" | "down" | "focus";
  label?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}
export declare const BreadcrumbItem: React.FC<BreadcrumbItemProps>;
export default BreadcrumbItem;
