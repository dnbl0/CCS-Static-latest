import * as React from 'react';
export interface AccordionItemProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  expanded?: boolean;
  state?: "default" | "hover" | "focus" | "default inverse" | "hover inverse" | "focus inverse";
  content?: string;
  body?: boolean;
  body2?: string;
  contentSlot?: boolean;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}
export declare const AccordionItem: React.FC<AccordionItemProps>;
export default AccordionItem;
