import * as React from 'react';
export interface ButtonGhostProps {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  style2?: "tertiary" | "tertiary inverse";
  state?: "default" | "hover" | "down" | "focus" | "disabled";
  label2?: "on" | "off";
  iconLeft?: boolean;
  iconLeft2?: React.ReactNode;
  iconRight?: boolean;
  iconRight2?: React.ReactNode;
}
export declare const ButtonGhost: React.FC<ButtonGhostProps>;
export default ButtonGhost;
