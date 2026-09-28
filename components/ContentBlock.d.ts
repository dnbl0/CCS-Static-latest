import * as React from 'react';
export interface ContentBlockProps {
  className?: string;
  style?: React.CSSProperties;
  titleLockup?: boolean;
  slot?: React.ReactNode;
  breakpoint?: "xl" | "lg" | "md" | "sm";
  inverse?: boolean;
  background?: "primary" | "secondary" | "tertiary";
}
export declare const ContentBlock: React.FC<ContentBlockProps>;
export default ContentBlock;
