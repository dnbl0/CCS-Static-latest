import React from 'react';

// University of Melbourne Official Gen 3 Page Footer Component
// Canonical structure: matches the real .page-footer markup used across
// unimelb.edu.au (acknowledgement band, main links/contact/social/logo
// band, legal disclaimer band). Styling lives in styles/footer.css.
export function Footer({ className = '', style = {}, ...props }) {
  return (
    <footer
      aria-label="University of Melbourne footer"
      className={`page-footer ${className}`}
      style={style}
      {...props}
    >
      {/* Acknowledgement of Country */}
      <div className="page-footer__acknowledgement bg-primary-75">
        <div className="page-footer__inner">
          <div className="grid">
            <div className="grid__col-sm-4 grid__col-md-3">
              <p className="page-footer__acknowledgement-title">Acknowledgement of Country</p>
              <div className="page-footer__flags">
                <div className="logo-indigenous" role="img" aria-label="Aboriginal flag"></div>
                <div className="logo-torres" role="img" aria-label="Torres Strait Islander flag"></div>
              </div>
            </div>
            <div className="grid__col-sm-8 grid__col-md-9">
              <p>
                We acknowledge Aboriginal and Torres Strait Islander people as the
                Traditional Owners of the unceded lands on which we work, learn and
                live. We pay respect to Elders past, present and future, and
                acknowledge the importance of Indigenous knowledge in the Academy.
              </p>
              <a className="button button--text" href="https://www.unimelb.edu.au/reconciliation">
                Read about our Indigenous priorities
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main content: links, contact, social, logo */}
      <div className="page-footer__content bg-primary">
        <div className="page-footer__inner">
          <h2 className="screenreaders-only">Site footer</h2>
          <div className="grid">
            <div className="grid__col-sm-4 grid__col-md-3">
              <ul className="page-footer__links">
                <li className="page-footer__links-item">
                  <a className="button button--text" href="https://about.unimelb.edu.au/">About us</a>
                </li>
                <li className="page-footer__links-item">
                  <a className="button button--text" href="https://about.unimelb.edu.au/careers">Careers at Melbourne</a>
                </li>
                <li className="page-footer__links-item">
                  <a className="button button--text" href="https://www.unimelb.edu.au/respect">Safety and respect</a>
                </li>
                <li className="page-footer__links-item">
                  <a className="button button--text" href="https://www.unimelb.edu.au/newsroom">Newsroom</a>
                </li>
                <li className="page-footer__links-item">
                  <a className="button button--text" href="https://www.unimelb.edu.au/contact">Contact</a>
                </li>
                <li className="page-footer__links-item">
                  <a
                    className="button button--text"
                    href="https://about.unimelb.edu.au/priorities-and-partnerships/campus-development/campus-locations"
                  >
                    Campus locations
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid__col-sm-4 grid__col-md-3">
              <div className="page-footer__contact">
                <p className="page-footer__contact-heading">Contact details</p>
                <div className="page-footer__contact-details">
                  <div>
                    <strong>Phone</strong> <a href="tel:13 6352">13 MELB (13 6352)</a>
                    <br />
                  </div>
                  <div>
                    <strong>International</strong> <a href="tel:+61 3 9035 5511">+61 3 9035 5511</a>
                  </div>
                </div>
                <div>
                  <p>
                    <strong>Address</strong>
                    <br />
                    The University of Melbourne
                    <br />
                    Grattan Street, Parkville
                    <br />
                    Victoria 3010
                    <br />
                    Australia
                  </p>
                </div>
              </div>
            </div>

            <div className="grid__col-sm-4 grid__col-md-6">
              <div className="grid">
                <div className="grid__col-10 grid__col-md-6">
                  <div className="page-footer__contact">
                    <p className="page-footer__contact-heading" id="footer-connect-heading">
                      Connect with us
                    </p>
                    <ul className="page-footer__social" aria-labelledby="footer-connect-heading">
                      <li className="page-footer__social-item">
                        <a href="https://www.facebook.com/unimelb" target="_blank" rel="noreferrer" aria-label="Facebook">
                          <svg className="icon" role="img" aria-label="Facebook"><use xlinkHref="#icon-facebook"></use></svg>
                        </a>
                      </li>
                      <li className="page-footer__social-item">
                        <a href="https://www.linkedin.com/school/university-of-melbourne" target="_blank" rel="noreferrer" aria-label="Linkedin">
                          <svg className="icon" role="img" aria-label="Linkedin"><use xlinkHref="#icon-linkedin"></use></svg>
                        </a>
                      </li>
                      <li className="page-footer__social-item">
                        <a href="https://www.instagram.com/unimelb" target="_blank" rel="noreferrer" aria-label="Instagram">
                          <svg className="icon" role="img" aria-label="Instagram"><use xlinkHref="#icon-instagram"></use></svg>
                        </a>
                      </li>
                      <li className="page-footer__social-item">
                        <a href="https://www.unimelb.edu.au/alumni/support-resources/contact-us/wechat" target="_blank" rel="noreferrer" aria-label="Wechat">
                          <svg className="icon" role="img" aria-label="Wechat"><use xlinkHref="#icon-wechat"></use></svg>
                        </a>
                      </li>
                      <li className="page-footer__social-item">
                        <a href="https://www.tiktok.com/@unimelb" target="_blank" rel="noreferrer" aria-label="Tiktok">
                          <svg className="icon" role="img" aria-label="Tiktok"><use xlinkHref="#icon-tiktok"></use></svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid__col-10 grid__col-md-6">
                  <div className="page-footer__logo">
                    <a
                      href="https://www.unimelb.edu.au"
                      className="logo logo--unhoused logo--xl"
                      aria-label="The University of Melbourne homepage"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal / disclaimer */}
      <div className="page-footer__disclaimer bg-secondary">
        <div className="page-footer__inner">
          <div className="grid">
            <div className="grid__col-md-4">
              <ul className="page-footer__legal">
                <li className="page-footer__legal-item"><a href="https://safety.unimelb.edu.au/emergency">Emergency</a></li>
                <li className="page-footer__legal-item"><a href="https://www.unimelb.edu.au/legal">Terms &amp; privacy</a></li>
                <li className="page-footer__legal-item"><a href="https://www.unimelb.edu.au/accessibility">Accessibility</a></li>
                <li className="page-footer__legal-item">
                  <a href="https://about.unimelb.edu.au/strategy/governance/compliance-obligations/privacy">Privacy</a>
                </li>
              </ul>
            </div>
            <div className="grid__col-md-8">
              <ul className="page-footer__important">
                <li className="page-footer__important-item">
                  The University of Melbourne (Australian University): <strong>PRV12150</strong>
                </li>
                <li className="page-footer__important-item">
                  CRICOS number: <strong>00116K</strong>
                </li>
                <li className="page-footer__important-item">
                  ABN: <strong>84 002 705 224</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
