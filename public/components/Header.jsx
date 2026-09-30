import React from 'react';

// University of Melbourne Official Gen 3 Page Header Component
export function Header({
  siteTitle = "Cultural Collections Search",
  siteUrl = "/",
  logoUrl = "https://www.unimelb.edu.au",
  navTop,
  navBottom,
  onSearchClick,
  onMenuToggleClick,
  className = "",
  style = {},
  ...props
}) {
  return (
    <header
      className={`uom-page-header top-0 flex h-[var(--nav-height)] z-1000 items-center transition-height transition-colors transition-300 ease-in-out ${className}`}
      style={style}
      data-component="Header"
      {...props}
    >
      {/* University logo section */}
      <div className="uom-logo-section flex items-center gap-050 h-full basis-auto border-r border-r-brand-900 shrink-0">
        <a
          className="logo self-center flex items-center w-auto relative h-[var(--nav-height)] shrink-0 group outline-none"
          href={logoUrl}
          aria-label="The University of Melbourne homepage"
        >
          <div className="udds-focus-on-dark-inset size-full absolute inset-0"></div>
          <img
            className="w-auto h-full outline-none"
            alt="The University of Melbourne"
            src="/images/UoM_Logo_Vert_Housed.svg"
          />
        </a>
      </div>

      {/* Main content area with responsive flex layout */}
      <div className="uom-header-content shrink-1 flex-[33_1_fit-content] flex flex-col justify-end content-between h-full max-w-full overflow-x-visible scroll-smooth">
        {/* Top navigation tier (inline mode only) */}
        <div className="uom-nav-top-tier border-b border-b-brand-900 flex justify-end">
          {navTop}
          <button
            data-popover-type="search"
            type="button"
            className="udds-focus items-center justify-center ring-inset text-brand-inverse fill-white-100 flex h-full p-[0.625rem] bg-background-button-secondary active:bg-background-button-secondary-active hover:bg-background-button-secondary-hover color-text-brand hover:color-text-brand"
            onClick={onSearchClick}
          >
            <uom-ds-icon class="size-150" iconid="search" iconset="functional" isdecorative="" isfluid="" islabelhidden="" label="Search" sizevariant="prominent" data-testid="uom-ds-icon"></uom-ds-icon>
            <span className="sr-only">open search</span>
          </button>
        </div>

        {/* Bottom navigation tier with site name and primary nav */}
        <div className="uom-nav-bottom-tier flex h-full m-025 justify-between items-stretch gap-x-125 has-only-child:justify-end">
          {/* Site name/faculty link */}
          <a
            className="uom-site-title text-brand-inverse hover:text-link-hover-inverse udds-focus-on-dark"
            href={siteUrl}
          >
            {siteTitle}
          </a>

          {/* Primary navigation slot */}
          {navBottom ? (
            <div className="uom-nav-slot flex items-center">
              {navBottom}
            </div>
          ) : (
            <nav id="uom-primary-nav" className="uom-primary-nav" aria-label="Primary navigation">
              <a href="Collection Search v3.dc.html">Search all records</a>
              <a href="Browse Collections.dc.html">Browse collections</a>
              <a href="Help and Support.dc.html">Help</a>
              <a href="Contact Us.dc.html">Contact</a>
            </nav>
          )}

          {/* Mobile menu toggle, shown only under the mega-menu breakpoint */}
          <button
            type="button"
            className="uom-menu-toggle"
            aria-expanded="false"
            aria-controls="uom-primary-nav"
            aria-label="Toggle menu"
            onClick={onMenuToggleClick}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span className="uom-menu-label">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
