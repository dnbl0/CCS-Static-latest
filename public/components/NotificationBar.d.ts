import * as React from 'react';
export interface NotificationBarProps {
  className?: string;
  style?: React.CSSProperties;
  breakpoint?: "lg" | "md" | "sm";
  status?: "info" | "error" | "warning" | "success";
  dismissable?: boolean;
  title?: string;
  description?: boolean;
  description2?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}
export declare const NotificationBar: React.FC<NotificationBarProps>;
export default NotificationBar;
