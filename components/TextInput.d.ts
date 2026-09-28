import * as React from 'react';
export interface TextInputProps {
  className?: string;
  style?: React.CSSProperties;
  label?: boolean;
  inverse?: boolean;
  state?: "default" | "hover" | "active" | "disabled";
  error?: boolean;
}
export declare const TextInput: React.FC<TextInputProps>;
export default TextInput;
