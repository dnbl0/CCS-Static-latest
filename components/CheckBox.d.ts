import * as React from 'react';
export interface CheckBoxProps {
  className?: string;
  style?: React.CSSProperties;
  selected?: "off" | "on";
}
export declare const CheckBox: React.FC<CheckBoxProps>;
export default CheckBox;
