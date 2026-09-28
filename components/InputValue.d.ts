import * as React from 'react';
export interface InputValueProps {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  iconLeft?: boolean;
  inverse?: boolean;
  iconLeft2?: React.ReactNode;
  iconRight?: boolean;
  type?: "none" | "placeholder" | "active" | "completed";
  iconRight2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}
export declare const InputValue: React.FC<InputValueProps>;
export default InputValue;
