import * as React from 'react';
export interface CardNoMediaProps {
  className?: string;
  style?: React.CSSProperties;
  card?: boolean;
  inverse?: boolean;
  interaction?: "cta" | "card";
  titleStyle?: "title03" | "title04" | "title05";
  cTA?: boolean;
  cTASlot?: React.ReactNode;
  categoryTag?: boolean;
  borderBottom?: boolean;
  title?: string;
  event?: boolean;
  body?: string;
  body2?: boolean;
}
export declare const CardNoMedia: React.FC<CardNoMediaProps>;
export default CardNoMedia;
