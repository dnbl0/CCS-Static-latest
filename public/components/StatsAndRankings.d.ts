import * as React from 'react';
export interface StatsAndRankingsProps {
  className?: string;
  style?: React.CSSProperties;
  fact2?: boolean;
  fact3?: boolean;
  fact4?: boolean;
  citation?: boolean;
  cTA?: boolean;
  citation2?: string;
  breakpoint?: "lg" | "md" | "sm" | "sm hero";
  inverse?: boolean;
}
export declare const StatsAndRankings: React.FC<StatsAndRankingsProps>;
export default StatsAndRankings;
