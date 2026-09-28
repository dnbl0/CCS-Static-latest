import * as React from 'react';
export interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
  breakpoint?: "xl" | "lg" | "md" | "sm";
  /** Text content; defaults to "Acknowledgement of Country". */
  text1?: string;
  /** Text content; defaults to "We acknowledge Aboriginal and Torres Strait Islander people as the Traditional Owners of the unceded lands on which we work, learn and live. We pay respect to Elders past, present and future, and acknowledge the importance of Indigenous knowledge in the Academy.". */
  text2?: string;
  /** Text content; defaults to "Contact details". */
  text3?: string;
  /** Text content; defaults to "Address The University of Melbourne Grattan Street, Parkville  Victoria 3010 Australia". */
  text4?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon4?: React.ReactNode;
}
export declare const Footer: React.FC<FooterProps>;
export default Footer;
