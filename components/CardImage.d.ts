import * as React from 'react';
export interface CardImageProps {
  className?: string;
  style?: React.CSSProperties;
  categoryTag?: boolean;
  card?: boolean;
  inverse?: boolean;
  interaction?: "card" | "cta";
  titleStyle?: "title03" | "title04" | "title05";
  cTA?: boolean;
  title?: string;
  cTASlot?: React.ReactNode;
  borderBottom?: boolean;
  event?: boolean;
  body?: string;
  body2?: boolean;
}
export declare const CardImage: React.FC<CardImageProps>;
export default CardImage;
