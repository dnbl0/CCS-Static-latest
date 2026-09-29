import * as React from 'react';
export interface InputValidationProps {
  className?: string;
  style?: React.CSSProperties;
  inverse?: boolean;
  validation?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}
export declare const InputValidation: React.FC<InputValidationProps>;
export default InputValidation;
