import * as React from 'react';
export interface CardIconProps {
  className?: string;
  style?: React.CSSProperties;
  card?: boolean;
  inverse?: boolean;
  alignment?: "left" | "centre";
  titleStyle?: "title03" | "title04" | "title05";
  interaction?: "card" | "cta";
  cTA?: boolean;
  icon?: React.ReactNode;
  cTASlot?: React.ReactNode;
  borderBottom?: boolean;
  title?: string;
  body?: boolean;
  body2?: string;
}
export declare const CardIcon: React.FC<CardIconProps>;
export default CardIcon;
