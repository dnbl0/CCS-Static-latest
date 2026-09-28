import * as React from 'react';
export interface Slot2Props {
  className?: string;
  style?: React.CSSProperties;
  type?: "default" | "small";
  /** Text content; defaults to "Slot Component". */
  text1?: string;
  /** Text content; defaults to "This is a placeholder component. Swap it with any component using the instance swapper, or delete if not needed.". */
  text2?: string;
}
export declare const Slot2: React.FC<Slot2Props>;
export default Slot2;
