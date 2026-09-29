import * as React from 'react';
export interface SelectProps {
  className?: string;
  style?: React.CSSProperties;
  label?: boolean;
  state?: "default" | "hover" | "active" | "disabled";
  error?: boolean;
  inverse?: boolean;
}
export declare const Select: React.FC<SelectProps>;
export default Select;
