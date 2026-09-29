import * as React from 'react';
export interface TagProps {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  style2?: "primary" | "secondary" | "primary inverse" | "secondary inverse";
  state?: "default" | "hover" | "down" | "focus" | "static";
  dIsmissable?: "off" | "on";
  selected?: boolean;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}
export declare const Tag: React.FC<TagProps>;
export default Tag;
