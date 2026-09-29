import * as React from 'react';
export interface LinkProps {
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  style2?: "default" | "prominent";
  label?: string;
  inverse?: boolean;
  icon2?: "none" | "left" | "right" | "top";
  state?: "default" | "hover" | "down" | "focus" | "disabled";
}
export declare const Link: React.FC<LinkProps>;
export default Link;
