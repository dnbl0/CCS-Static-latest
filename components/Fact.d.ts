import * as React from 'react';
export interface FactProps {
  className?: string;
  style?: React.CSSProperties;
  type?: "default" | "inverse";
  icon?: boolean;
  icon2?: React.ReactNode;
  figure?: string;
  description?: string;
}
export declare const Fact: React.FC<FactProps>;
export default Fact;
