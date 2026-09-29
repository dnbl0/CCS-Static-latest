import * as React from 'react';
export interface CaretProps {
  className?: string;
  style?: React.CSSProperties;
  caret?: "on" | "off";
}
export declare const Caret: React.FC<CaretProps>;
export default Caret;
