import React from 'react';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  siteTitle?: string;
  siteUrl?: string;
  logoUrl?: string;
  navTop?: React.ReactNode;
  navBottom?: React.ReactNode;
  onSearchClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Header(props: HeaderProps): React.JSX.Element;
export default Header;
