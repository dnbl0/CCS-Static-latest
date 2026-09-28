import * as React from 'react';
export interface InputLabelProps {
  className?: string;
  style?: React.CSSProperties;
  inverse?: boolean;
  required?: boolean;
  hint?: boolean;
  label?: string;
  hint2?: string;
  /** Text content; defaults to "*". */
  text1?: string;
}
export declare const InputLabel: React.FC<InputLabelProps>;
export default InputLabel;
