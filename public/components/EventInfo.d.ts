import * as React from 'react';
export interface EventInfoProps {
  className?: string;
  style?: React.CSSProperties;
  condensed?: boolean;
  inverse?: boolean;
  price?: string;
  location?: string;
  dateTime?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
}
export declare const EventInfo: React.FC<EventInfoProps>;
export default EventInfo;
