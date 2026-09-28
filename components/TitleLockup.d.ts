import * as React from 'react';
export interface TitleLockupProps {
  className?: string;
  style?: React.CSSProperties;
  overline?: boolean;
  inverse?: boolean;
  titleStyle?: "display" | "title 1" | "title 2" | "title 3" | "title 4" | "title 5";
  alignment?: "centre" | "left";
  title?: string;
  overline2?: string;
  description?: boolean;
  description2?: string;
}
export declare const TitleLockup: React.FC<TitleLockupProps>;
export default TitleLockup;
