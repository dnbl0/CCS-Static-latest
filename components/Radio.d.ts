import * as React from 'react';
export interface RadioProps {
  className?: string;
  style?: React.CSSProperties;
  inverse?: boolean;
  selected?: boolean;
  state?: "default" | "hover" | "focus" | "disabled";
  error?: boolean;
  label?: boolean;
  label2?: string;
}
export declare const Radio: React.FC<RadioProps>;
export default Radio;
