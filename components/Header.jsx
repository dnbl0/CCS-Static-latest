import React from 'react';

// University of Melbourne Official Gen 3 Page Header Component
export function Header({
  siteTitle = "Cultural Collections Search",
  siteUrl = "/",
  logoUrl = "https://www.unimelb.edu.au",
  navTop,
  navBottom,
  onSearchClick,
  className = "",
  style = {},
  ...props
}) {
  return (
    <header
      className={`uom-page-header top-0 flex h-[var(--nav-height)] bg-primary z-1000 items-center transition-height transition-colors transition-300 ease-in-out ${className}`}
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
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%20400%20400'%3e%3cpath%20fill='%23000F46'%20d='M0%200h400v400H0z'/%3e%3cpath%20fill='%23fff'%20d='m281.271%2080.792-26.229-34.063c-3.834%202.396-9.875%204.75-15.959%204.75-6.083%200-10.458-.562-15.583-1.583-6.354-1.271-13.562-2.688-25-2.688s-18.646%201.438-25%202.688c-5.146%201.02-9.5%201.583-15.583%201.583-6.084%200-12.125-2.354-15.959-4.75l-26.27%2034.063c3.25%203.125%209.166%2010.166%209.166%2020.166%200%206.813-1%2012.979-2.146%2020.125-1.562%209.604-3.312%2020.5-3.312%2036.709%200%2027.791%2017.729%2051.75%2046.25%2062.5%2020.646%207.77%2029.271%2013.5%2032.833%2016.646%203.563-3.167%2012.188-8.876%2032.834-16.646%2028.541-10.75%2046.25-34.688%2046.25-62.5%200-16.209-1.771-27.105-3.313-36.709-1.167-7.146-2.146-13.312-2.146-20.125%200-10%205.917-17.062%209.167-20.166Z'/%3e%3cpath%20fill='%23000F46'%20d='m255.042%2046.73%2026.229%2034.062c-3.25%203.125-9.167%2010.166-9.167%2020.166%200%206.813%201%2012.98%202.146%2020.125%201.563%209.605%203.313%2020.5%203.313%2036.709%200%2027.791-17.73%2051.75-46.25%2062.5-20.646%207.771-29.271%2013.5-32.834%2016.646-3.562-3.167-12.187-8.875-32.833-16.646-28.542-10.75-46.25-34.688-46.25-62.5%200-16.209%201.771-27.104%203.312-36.709%201.167-7.145%202.146-13.312%202.146-20.125%200-9.979-5.916-17.041-9.166-20.166l26.229-34.063c3.833%202.396%209.875%204.75%2015.958%204.75s10.458-.562%2015.583-1.583c6.355-1.271%2013.563-2.688%2025-2.688%2011.438%200%2018.646%201.438%2025%202.688%205.146%201.02%209.5%201.583%2015.584%201.583%206.125%200%2012.146-2.354%2016-4.75Zm.479-2.73-1.583.98c-3.438%202.145-9.146%204.437-14.875%204.437-6.188%200-10.396-.584-15.188-1.542-6.458-1.27-13.75-2.73-25.396-2.73s-18.958%201.46-25.396%202.73c-4.791.958-9%201.542-15.187%201.542-5.729%200-11.438-2.292-14.875-4.438L141.438%2044l-1.125%201.48-26.23%2034.062L112.958%2081l1.313%201.27c3.187%203.063%208.542%209.563%208.542%2018.688%200%206.646-.98%2012.729-2.125%2019.792-1.563%209.688-3.355%2020.667-3.355%2037.042%200%2028.666%2018.23%2053.354%2047.584%2064.416%2020.958%207.896%2029.166%2013.584%2032.208%2016.271l1.354%201.209%201.354-1.209c3.021-2.687%2011.23-8.375%2032.209-16.271%2029.354-11.062%2047.583-35.729%2047.583-64.416%200-16.375-1.771-27.354-3.354-37.042-1.146-7.063-2.125-13.167-2.125-19.792%200-9.125%205.354-15.625%208.542-18.687L284%2081l-1.125-1.458-26.208-34.063L255.521%2044Z'/%3e%3cpath%20fill='%23000F46'%20d='M266.792%20100.625c0-9%203.896-15.938%207.541-20.458l-20.791-26.98c-3.917%202.084-8.792%203.271-14.459%203.271-6.604%200-11.458-.645-16.625-1.687-6.125-1.209-13.083-2.584-24-2.584-10.916%200-17.875%201.376-24%202.584-5.166%201.02-10.02%201.687-16.625%201.687-5.666%200-10.541-1.187-14.458-3.27l-20.792%2026.979c3.646%204.52%207.542%2011.458%207.542%2020.458%200%207.229-1.021%2013.604-2.229%2020.979-1.521%209.417-3.25%2020.084-3.25%2035.854%200%2025.521%2016.396%2047.563%2042.812%2057.521%2016.396%206.167%2025.73%2011.229%2031%2014.896%205.271-3.667%2014.605-8.729%2031-14.896%2026.417-9.937%2042.813-31.979%2042.813-57.521%200-15.791-1.729-26.458-3.25-35.854-1.208-7.375-2.229-13.75-2.229-20.979Z'/%3e%3cpath%20fill='%23fff'%20d='M49.292%20300.75h303.021v1.729H49.292v-1.729ZM87.167%20262h-.834l-2.875-.083c-.166%200-.687%200-.687.458%200%20.229.187.396.437.396l.938.083c.77.167%201%20.479%201.062%201.438l.063%206.166v.605L73.167%20271l.041-.562.063-6.167c.062-.979.27-1.333.896-1.438l.666-.083c.25%200%20.459-.167.459-.396%200-.291-.23-.458-.688-.458l-2.333.062h-.854l-2.855-.083c-.458%200-.687.146-.687.458%200%20.23.188.396.438.396l.916.084c.792.166%201.021.479%201.063%201.437l.062%206.188v5.041c0%202.688%200%205-.146%206.188-.125.854-.25%201.312-.666%201.396l-.813.104c-.312%200-.458.187-.458.396%200%20.437.5.437.687.437l2.334-.062h.812l3.188.083c.604%200%20.666-.313.666-.438%200-.187-.145-.395-.437-.395l-1.271-.105c-.667-.104-.833-.541-.938-1.395-.145-1.188-.145-3.5-.145-6.188v-3l12.125.042-.063%202.958c0%202.688%200%205-.146%206.188-.104.833-.25%201.312-.666%201.395l-.813.105c-.312%200-.458.208-.458.395%200%20.438.5.438.687.438l2.355-.063h.791l3.209.084c.624%200%20.687-.313.687-.438%200-.187-.146-.396-.458-.396l-1.271-.104c-.688-.104-.854-.541-.938-1.396-.145-1.187-.145-3.5-.145-6.187v-5.042l.062-6.166c.063-.98.27-1.334.875-1.438l.667-.083c.27%200%20.458-.167.458-.396%200-.458-.5-.458-.688-.458l-2.27.062Z'/%3e%3c/svg%3e"
          />
        </a>
      </div>

      {/* Main content area with responsive flex layout */}
      <div className="uom-header-content shrink-1 flex-[33_1_fit-content] flex flex-col justify-end content-between h-full max-w-full overflow-x-visible scroll-smooth">
        {/* Top navigation tier (inline mode only) */}
        <div className="uom-nav-top-tier border-b border-b-brand-900 bg-secondary flex justify-end">
          {navTop}
          <button
            data-popover-type="search"
            type="button"
            className="uom-search-btn udds-focus items-center justify-center ring-inset text-brand-inverse fill-white-100 flex h-full p-[0.625rem] bg-background-button-secondary active:bg-background-button-secondary-active hover:bg-background-button-secondary-hover color-text-brand hover:color-text-brand hover:[&_svg]:fill-icon"
            onClick={onSearchClick}
            aria-label="Open search"
          >
            <svg
              className="size-150 w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span className="sr-only">open search</span>
          </button>
        </div>

        {/* Bottom navigation tier with site name and primary nav */}
        <div className="uom-nav-bottom-tier flex h-full m-025 justify-between items-stretch gap-x-125 has-only-child:justify-end">
          {/* Site name/faculty link */}
          <a
            className="uom-site-title text-brand-inverse font-200 text-[0.875rem] leading-[1] font-600 mr-125 fw-600 text-wrap whitespace-normal hover:underline hover:text-link-hover-inverse udds-focus-on-dark line-clamp-2 items-center inline-flex px-025"
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
            <nav className="uom-primary-nav" aria-label="Primary navigation">
              <a href="Collection Search v3.dc.html">Search all records</a>
              <a href="Browse Collections.dc.html">Browse collections</a>
              <a href="Help and Support.dc.html">Help</a>
              <a href="Contact Us.dc.html">Contact</a>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
