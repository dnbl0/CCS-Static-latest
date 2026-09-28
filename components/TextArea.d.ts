import * as React from 'react';
export interface TextAreaProps {
  className?: string;
  style?: React.CSSProperties;
  label?: boolean;
  inverse?: boolean;
  state?: "default" | "hover" | "active" | "disabled";
  error?: boolean;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}
export declare const TextArea: React.FC<TextAreaProps>;
export default TextArea;
