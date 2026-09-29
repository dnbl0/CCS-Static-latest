import * as React from 'react';
export interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  style2?: "primary" | "secondary" | "tertiary" | "tertiary inverse";
  state?: "default" | "hover" | "down" | "focus" | "disabled";
  label2?: "on" | "off";
  iconLeft?: boolean;
  iconLeft2?: React.ReactNode;
  iconRight?: boolean;
  iconRight2?: React.ReactNode;
}
export declare const Button: React.FC<ButtonProps>;
export default Button;
