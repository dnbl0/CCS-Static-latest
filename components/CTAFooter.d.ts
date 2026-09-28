import * as React from 'react';
export interface CTAFooterProps {
  className?: string;
  style?: React.CSSProperties;
  breakpoint?: "lg" | "md" | "sm";
  inverse?: boolean;
  description?: boolean;
  description2?: string;
  cTA?: boolean;
}
export declare const CTAFooter: React.FC<CTAFooterProps>;
export default CTAFooter;
