import * as React from 'react';
export interface PathfinderCardProps {
  className?: string;
  style?: React.CSSProperties;
  image?: boolean;
  state?: "default" | "hover" | "focus" | "default inverse" | "hover inverse" | "focus inverse";
  altBG?: boolean;
  body?: boolean;
  titleText?: string;
  bodyText?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}
export declare const PathfinderCard: React.FC<PathfinderCardProps>;
export default PathfinderCard;
