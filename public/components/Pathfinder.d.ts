import * as React from 'react';
export interface PathfinderProps {
  className?: string;
  style?: React.CSSProperties;
  card1?: boolean;
  breakpoint?: "lg" | "md" | "sm";
  card2?: boolean;
  inverse?: boolean;
  card4?: boolean;
  card3?: boolean;
}
export declare const Pathfinder: React.FC<PathfinderProps>;
export default Pathfinder;
