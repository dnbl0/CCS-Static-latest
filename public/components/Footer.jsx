import { Facebook } from './Facebook.jsx';
import { FlagAboriginal } from './FlagAboriginal.jsx';
import { FlagTorresStrait } from './FlagTorresStrait.jsx';
import { Instagram } from './Instagram.jsx';
import { Linkedin } from './Linkedin.jsx';
import { UoMLogoVertUnhousedAltOnDark } from './UoMLogoVertUnhousedAltOnDark.jsx';
import { XTwitter } from './XTwitter.jsx';

// figma node: 285:1487 Footer (4 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "breakpoint=" + __venc(p.breakpoint);

export function Footer(_p = {}) {
  const props = { ..._p, breakpoint: _p.breakpoint ?? "xl" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 1440,
      minWidth: 1288,
      overflow: "hidden",
      backgroundColor: "var(--background-primary-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--background-footer-aoc)",
        display: "flex",
        flexDirection: "row",
        padding: "40px 32px 40px 32px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-250) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-250) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 121,
          maxWidth: 1224,
          maxHeight: null,
          flexGrow: 1,
        }}>
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 288,
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-100) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 24,
              lineHeight: 1.2000000476837158,
              color: "var(--text-brand-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "nowrap",
            }}>{props.text1 ?? "Acknowledgement of Country"}</span>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-100) * 1px)",
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                  position: "relative",
                  width: 64,
                  height: 32,
                  flexShrink: 0,
                }}>{props.icon1 ?? <FlagAboriginal style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
              <div style={{
                  position: "relative",
                  width: 64,
                  height: 32,
                  flexShrink: 0,
                }}>{props.icon2 ?? <FlagTorresStrait style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
            </div>
          </div>
          <div style={{
            position: "absolute",
            left: 312,
            top: 0,
            width: 912,
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-100) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>{props.text2 ?? "We acknowledge Aboriginal and Torres Strait Islander people as the Traditional Owners of the unceded lands on which we work, learn and live. We pay respect to Elders past, present and future, and acknowledge the importance of Indigenous knowledge in the Academy."}</span>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Read about our Indigenous priorities</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "40px 32px 40px 32px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-250) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-250) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          maxWidth: 1224,
          maxHeight: null,
          display: "flex",
          flexDirection: "row",
          gap: "calc(var(--gutter) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-150) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexGrow: 1,
          }}>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>About us</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Careers at Melbourne</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Safety and respect</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Newsroom</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Contact</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Campus locations</span>
            </div>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-150) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexGrow: 1,
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.2000000476837158,
              letterSpacing: "0.080em",
              color: "var(--text-secondary-inverse)",
              textTransform: "uppercase",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "nowrap",
            }}>{props.text3 ?? "Contact details"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "pre-wrap",
            }}>{"Phone"}{" "}{"13 MELB (13 6352) "}{"International"}{" "}{"+61 3 9035 5511"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>{props.text4 ?? "Address The University of Melbourne Grattan Street, Parkville  Victoria 3010 Australia"}</span>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-150) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexGrow: 1,
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.2000000476837158,
              letterSpacing: "0.080em",
              color: "var(--text-secondary-inverse)",
              textTransform: "uppercase",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>Connect with us</span>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-150) * 1px)",
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>{props.icon3 ?? <Facebook style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0" }} />}</div>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>{props.icon4 ?? <Linkedin style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0" }} />}</div>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>
                <Instagram style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0", color: "var(--icon-brand-inverse)" }} />
              </div>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>
                <XTwitter style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0", color: "var(--icon-brand-inverse)" }} />
              </div>
            </div>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexGrow: 1,
          }}>
            <div style={{
                position: "relative",
                width: 144,
                height: 144,
                flexShrink: 0,
              }}>
              <UoMLogoVertUnhousedAltOnDark style={{ transform: "scale(0.471, 0.471)", transformOrigin: "0 0" }} />
            </div>
          </div>
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--background-secondary-inverse)",
        display: "flex",
        flexDirection: "row",
        padding: "32px 32px 32px 32px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-200) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-200) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          maxWidth: 1224,
          maxHeight: null,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px 272px",
          flexGrow: 1,
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            gap: "calc(var(--spacing-075) * 1px)",
            alignItems: "center",
            flexWrap: "nowrap",
            flexShrink: 0,
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Emergency</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Terms and privacy</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Accessibility</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Privacy</span>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            gap: "calc(var(--spacing-075) * 1px)",
            justifyContent: "flex-end",
            alignItems: "center",
            flexWrap: "nowrap",
            flexShrink: 0,
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
            }}>{"The University of Melbourne (Australian University): "}{"PRV12150"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
            }}>{"CRICOS: "}{"00116K"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
            }}>{"ABN: "}{"84 002 705 224"}</span>
          </div>
        </div>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 1288,
      minWidth: 1024,
      maxWidth: 1288,
      maxHeight: null,
      overflow: "hidden",
      backgroundColor: "var(--background-primary-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--background-footer-aoc)",
        display: "flex",
        flexDirection: "row",
        padding: "40px 32px 40px 32px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-250) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-250) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          height: 121,
          maxWidth: 1224,
          maxHeight: null,
          flexGrow: 1,
        }}>
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 288,
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-100) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 24,
              lineHeight: 1.2000000476837158,
              color: "var(--text-brand-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "nowrap",
            }}>{props.text1 ?? "Acknowledgement of Country"}</span>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-100) * 1px)",
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                  position: "relative",
                  width: 64,
                  height: 32,
                  flexShrink: 0,
                }}>{props.icon1 ?? <FlagAboriginal style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
              <div style={{
                  position: "relative",
                  width: 64,
                  height: 32,
                  flexShrink: 0,
                }}>{props.icon2 ?? <FlagTorresStrait style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
            </div>
          </div>
          <div style={{
            position: "absolute",
            left: 312,
            top: 0,
            width: 912,
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-100) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>{props.text2 ?? "We acknowledge Aboriginal and Torres Strait Islander people as the Traditional Owners of the unceded lands on which we work, learn and live. We pay respect to Elders past, present and future, and acknowledge the importance of Indigenous knowledge in the Academy."}</span>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Read about our Indigenous priorities</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "40px 32px 40px 32px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-250) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-250) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          maxWidth: 1224,
          maxHeight: null,
          display: "flex",
          flexDirection: "row",
          gap: "calc(var(--gutter) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-150) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexGrow: 1,
          }}>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>About us</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Careers at Melbourne</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Safety and respect</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Newsroom</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Contact</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Campus locations</span>
            </div>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-150) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexGrow: 1,
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.2000000476837158,
              letterSpacing: "0.080em",
              color: "var(--text-secondary-inverse)",
              textTransform: "uppercase",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "nowrap",
            }}>{props.text3 ?? "Contact details"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "pre-wrap",
            }}>{"Phone"}{" "}{"13 MELB (13 6352) "}{"International"}{" "}{"+61 3 9035 5511"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>{props.text4 ?? "Address The University of Melbourne Grattan Street, Parkville  Victoria 3010 Australia"}</span>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-150) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexGrow: 1,
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.2000000476837158,
              letterSpacing: "0.080em",
              color: "var(--text-secondary-inverse)",
              textTransform: "uppercase",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>Connect with us</span>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-150) * 1px)",
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>{props.icon3 ?? <Facebook style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0" }} />}</div>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>{props.icon4 ?? <Linkedin style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0" }} />}</div>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>
                <Instagram style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0", color: "var(--icon-brand-inverse)" }} />
              </div>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>
                <XTwitter style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0", color: "var(--icon-brand-inverse)" }} />
              </div>
            </div>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexGrow: 1,
          }}>
            <div style={{
                position: "relative",
                width: 144,
                height: 144,
                flexShrink: 0,
              }}>
              <UoMLogoVertUnhousedAltOnDark style={{ transform: "scale(0.471, 0.471)", transformOrigin: "0 0" }} />
            </div>
          </div>
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--background-secondary-inverse)",
        display: "flex",
        flexDirection: "row",
        padding: "32px 32px 32px 32px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-200) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-200) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          maxWidth: 1224,
          maxHeight: null,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px 272px",
          flexGrow: 1,
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            gap: "calc(var(--spacing-075) * 1px)",
            alignItems: "center",
            flexWrap: "nowrap",
            flexShrink: 0,
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Emergency</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Terms and privacy</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Accessibility</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Privacy</span>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            gap: "calc(var(--spacing-075) * 1px)",
            justifyContent: "flex-end",
            alignItems: "center",
            flexWrap: "nowrap",
            flexShrink: 0,
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
            }}>{"The University of Melbourne (Australian University): "}{"PRV12150"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
            }}>{"CRICOS: "}{"00116K"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
            }}>{"ABN: "}{"84 002 705 224"}</span>
          </div>
        </div>
      </div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 768,
      minWidth: 720,
      maxWidth: 1023,
      maxHeight: null,
      overflow: "hidden",
      backgroundColor: "var(--background-primary-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--background-footer-aoc)",
        display: "flex",
        flexDirection: "row",
        padding: "40px 16px 40px 16px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-250) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-250) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{ position: "relative", height: 175, flexGrow: 1 }}>
          <div style={{
            position: "absolute",
            left: 1,
            top: 0,
            width: 234,
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-100) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 24,
              lineHeight: 1.2000000476837158,
              color: "var(--text-brand-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "nowrap",
            }}>{props.text1 ?? "Acknowledgement of Country"}</span>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-100) * 1px)",
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                  position: "relative",
                  width: 64,
                  height: 32,
                  flexShrink: 0,
                }}>{props.icon1 ?? <FlagAboriginal style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
              <div style={{
                  position: "relative",
                  width: 64,
                  height: 32,
                  flexShrink: 0,
                }}>{props.icon2 ?? <FlagTorresStrait style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
            </div>
          </div>
          <div style={{
            position: "absolute",
            left: 251,
            top: 0,
            width: 485,
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-100) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>{props.text2 ?? "We acknowledge Aboriginal and Torres Strait Islander people as the Traditional Owners of the unceded lands on which we work, learn and live. We pay respect to Elders past, present and future, and acknowledge the importance of Indigenous knowledge in the Academy."}</span>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Read about our Indigenous priorities</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        padding: "40px 16px 40px 16px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-250) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-250) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: "calc(var(--gutter) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexGrow: 1,
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-150) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexGrow: 1,
          }}>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>About us</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Careers at Melbourne</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Safety and respect</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Newsroom</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Contact</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={16} height={12} viewBox="0 0 16 12" fill="none" style={{
                  position: "absolute",
                  left: 4,
                  top: 6,
                  width: 16,
                  height: 12,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 10 12 L 8.6 10.55 L 12.15 7 L 0 7 L 0 5 L 12.15 5 L 8.6 1.45 L 10 0 L 16 6 L 10 12 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Campus locations</span>
            </div>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-150) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexGrow: 1,
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.2000000476837158,
              letterSpacing: "0.080em",
              color: "var(--text-secondary-inverse)",
              textTransform: "uppercase",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "nowrap",
            }}>{props.text3 ?? "Contact details"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "pre-wrap",
            }}>{"Phone"}{" "}{"13 MELB (13 6352) "}{"International"}{" "}{"+61 3 9035 5511"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>{props.text4 ?? "Address The University of Melbourne Grattan Street, Parkville  Victoria 3010 Australia"}</span>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexGrow: 1,
            alignSelf: "stretch",
          }}>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "calc(var(--spacing-150) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                lineHeight: 1.2000000476837158,
                letterSpacing: "0.080em",
                color: "var(--text-secondary-inverse)",
                textTransform: "uppercase",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>Connect with us</span>
              <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                gap: "calc(var(--spacing-150) * 1px)",
                alignItems: "center",
                flexWrap: "nowrap",
                flexShrink: 0,
                alignSelf: "stretch",
              }}>
                <div style={{
                    position: "relative",
                    width: 24,
                    height: 24,
                    flexShrink: 0,
                    color: "var(--icon-brand-inverse)",
                  }}>{props.icon3 ?? <Facebook style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0" }} />}</div>
                <div style={{
                    position: "relative",
                    width: 24,
                    height: 24,
                    flexShrink: 0,
                    color: "var(--icon-brand-inverse)",
                  }}>{props.icon4 ?? <Linkedin style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0" }} />}</div>
                <div style={{
                    position: "relative",
                    width: 24,
                    height: 24,
                    flexShrink: 0,
                    color: "var(--icon-brand-inverse)",
                  }}>
                  <Instagram style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0", color: "var(--icon-brand-inverse)" }} />
                </div>
                <div style={{
                    position: "relative",
                    width: 24,
                    height: 24,
                    flexShrink: 0,
                    color: "var(--icon-brand-inverse)",
                  }}>
                  <XTwitter style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0", color: "var(--icon-brand-inverse)" }} />
                </div>
              </div>
            </div>
            <div style={{
                position: "relative",
                width: 144,
                height: 144,
                flexShrink: 0,
              }}>
              <UoMLogoVertUnhousedAltOnDark style={{ transform: "scale(0.471, 0.471)", transformOrigin: "0 0" }} />
            </div>
          </div>
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--background-secondary-inverse)",
        display: "flex",
        flexDirection: "row",
        padding: "32px 16px 32px 16px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-200) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-200) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "32px 272px",
          flexGrow: 1,
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            gap: "calc(var(--spacing-075) * 1px)",
            alignItems: "center",
            flexWrap: "nowrap",
            flexShrink: 0,
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Emergency</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Terms and privacy</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Accessibility</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
            }}>Privacy</span>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            gap: "calc(var(--spacing-075) * 1px)",
            justifyContent: "flex-end",
            alignItems: "center",
            flexWrap: "nowrap",
            flexShrink: 0,
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
            }}>{"The University of Melbourne (Australian University): "}{"PRV12150"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
            }}>{"CRICOS: "}{"00116K"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
            }}>{"ABN: "}{"84 002 705 224"}</span>
          </div>
        </div>
      </div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 360,
      minWidth: 320,
      maxWidth: 719,
      maxHeight: null,
      overflow: "hidden",
      backgroundColor: "var(--background-primary-inverse)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--background-footer-aoc)",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing-150) * 1px)",
        padding: "40px 16px 40px 16px",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-250) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-250) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 600,
            fontSize: 24,
            lineHeight: 1.2000000476837158,
            color: "var(--text-brand-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
            whiteSpace: "nowrap",
          }}>{props.text1 ?? "Acknowledgement of Country"}</span>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            gap: "calc(var(--spacing-100) * 1px)",
            alignItems: "center",
            flexWrap: "nowrap",
            flexShrink: 0,
          }}>
            <div style={{
                position: "relative",
                width: 64,
                height: 32,
                flexShrink: 0,
              }}>{props.icon1 ?? <FlagAboriginal style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
            <div style={{
                position: "relative",
                width: 64,
                height: 32,
                flexShrink: 0,
              }}>{props.icon2 ?? <FlagTorresStrait style={{ transform: "scale(1.333, 1.333)", transformOrigin: "0 0" }} />}</div>
          </div>
        </div>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-100) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <span style={{
            position: "relative",
            fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.5,
            color: "var(--text-primary-inverse)",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>{props.text2 ?? "We acknowledge Aboriginal and Torres Strait Islander people as the Traditional Owners of the unceded lands on which we work, learn and live. We pay respect to Elders past, present and future, and acknowledge the importance of Indigenous knowledge in the Academy."}</span>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            gap: "calc(var(--spacing-025) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexShrink: 0,
          }}>
            <div style={{
              position: "relative",
              width: "calc(var(--component-action-link-default-icon-size) * 1px)",
              height: "calc(var(--component-action-link-default-icon-size) * 1px)",
              overflow: "hidden",
              flexShrink: 0,
            }}>
              <svg width={13.333} height={10} viewBox="0 0 13.333 10" fill="none" style={{
                position: "absolute",
                left: 3.333,
                top: 5,
                width: 13.333,
                height: 10,
                color: "var(--icon-interactive-inverse)",
              }}>
                <path d={"M 8.333 10 L 7.167 8.792 L 10.125 5.833 L 0 5.833 L 0 4.167 L 10.125 4.167 L 7.167 1.208 L 8.333 0 L 13.333 5 L 8.333 10 Z"} fill="currentColor" fillRule="nonzero" />
              </svg>
            </div>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 18,
              whiteSpace: "nowrap",
              lineHeight: "24px",
              color: "var(--link-text-default-inverse)",
              flexShrink: 0,
            }}>Read about our Indigenous priorities</span>
          </div>
        </div>
      </div>
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "40px 16px 40px 16px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-250) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-250) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-250) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-150) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={13.333} height={10} viewBox="0 0 13.333 10" fill="none" style={{
                  position: "absolute",
                  left: 3.333,
                  top: 5,
                  width: 13.333,
                  height: 10,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 8.333 10 L 7.167 8.792 L 10.125 5.833 L 0 5.833 L 0 4.167 L 10.125 4.167 L 7.167 1.208 L 8.333 0 L 13.333 5 L 8.333 10 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>About us</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={13.333} height={10} viewBox="0 0 13.333 10" fill="none" style={{
                  position: "absolute",
                  left: 3.333,
                  top: 5,
                  width: 13.333,
                  height: 10,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 8.333 10 L 7.167 8.792 L 10.125 5.833 L 0 5.833 L 0 4.167 L 10.125 4.167 L 7.167 1.208 L 8.333 0 L 13.333 5 L 8.333 10 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Careers at Melbourne</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={13.333} height={10} viewBox="0 0 13.333 10" fill="none" style={{
                  position: "absolute",
                  left: 3.333,
                  top: 5,
                  width: 13.333,
                  height: 10,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 8.333 10 L 7.167 8.792 L 10.125 5.833 L 0 5.833 L 0 4.167 L 10.125 4.167 L 7.167 1.208 L 8.333 0 L 13.333 5 L 8.333 10 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Safety and respect</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={13.333} height={10} viewBox="0 0 13.333 10" fill="none" style={{
                  position: "absolute",
                  left: 3.333,
                  top: 5,
                  width: 13.333,
                  height: 10,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 8.333 10 L 7.167 8.792 L 10.125 5.833 L 0 5.833 L 0 4.167 L 10.125 4.167 L 7.167 1.208 L 8.333 0 L 13.333 5 L 8.333 10 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Newsroom</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={13.333} height={10} viewBox="0 0 13.333 10" fill="none" style={{
                  position: "absolute",
                  left: 3.333,
                  top: 5,
                  width: 13.333,
                  height: 10,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 8.333 10 L 7.167 8.792 L 10.125 5.833 L 0 5.833 L 0 4.167 L 10.125 4.167 L 7.167 1.208 L 8.333 0 L 13.333 5 L 8.333 10 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Contact</span>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-025) * 1px)",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              flexShrink: 0,
            }}>
              <div style={{
                position: "relative",
                width: "calc(var(--component-action-link-default-icon-size) * 1px)",
                height: "calc(var(--component-action-link-default-icon-size) * 1px)",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                <svg width={13.333} height={10} viewBox="0 0 13.333 10" fill="none" style={{
                  position: "absolute",
                  left: 3.333,
                  top: 5,
                  width: 13.333,
                  height: 10,
                  color: "var(--icon-interactive-inverse)",
                }}>
                  <path d={"M 8.333 10 L 7.167 8.792 L 10.125 5.833 L 0 5.833 L 0 4.167 L 10.125 4.167 L 7.167 1.208 L 8.333 0 L 13.333 5 L 8.333 10 Z"} fill="currentColor" fillRule="nonzero" />
                </svg>
              </div>
              <span style={{
                position: "relative",
                fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                fontWeight: 600,
                fontSize: 18,
                whiteSpace: "nowrap",
                lineHeight: "24px",
                color: "var(--link-text-default-inverse)",
                flexShrink: 0,
              }}>Campus locations</span>
            </div>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-100) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.2000000476837158,
              letterSpacing: "0.080em",
              color: "var(--text-secondary-inverse)",
              textTransform: "uppercase",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "nowrap",
            }}>{props.text3 ?? "Contact details"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "pre-wrap",
            }}>{"Phone"}{" "}{"13 MELB (13 6352) "}{"International"}{" "}{"+61 3 9035 5511"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>{props.text4 ?? "Address The University of Melbourne Grattan Street, Parkville  Victoria 3010 Australia"}</span>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-100) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.2000000476837158,
              letterSpacing: "0.080em",
              color: "var(--text-secondary-inverse)",
              textTransform: "uppercase",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>Connect with us</span>
            <div style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              gap: "calc(var(--spacing-150) * 1px)",
              alignItems: "center",
              flexWrap: "nowrap",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>{props.icon3 ?? <Facebook style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0" }} />}</div>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>{props.icon4 ?? <Linkedin style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0" }} />}</div>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>
                <Instagram style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0", color: "var(--icon-brand-inverse)" }} />
              </div>
              <div style={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "var(--icon-brand-inverse)",
                }}>
                <XTwitter style={{ transform: "scale(0.500, 0.500)", transformOrigin: "0 0", color: "var(--icon-brand-inverse)" }} />
              </div>
            </div>
          </div>
          <div style={{
              position: "relative",
              width: 144,
              height: 144,
              flexShrink: 0,
            }}>
            <UoMLogoVertUnhousedAltOnDark style={{ transform: "scale(0.471, 0.471)", transformOrigin: "0 0" }} />
          </div>
        </div>
      </div>
      <div style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--background-secondary-inverse)",
        display: "flex",
        flexDirection: "column",
        padding: "32px 16px 32px 16px",
        alignItems: "center",
        flexWrap: "nowrap",
        boxSizing: "border-box",
        paddingLeft: "calc(var(--margin) * 1px)",
        paddingTop: "calc(var(--spacing-200) * 1px)",
        paddingRight: "calc(var(--margin) * 1px)",
        paddingBottom: "calc(var(--spacing-200) * 1px)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "calc(var(--spacing-200) * 1px)",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          flexShrink: 0,
          alignSelf: "stretch",
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-150) * 1px)",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>Emergency</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>Terms and privacy</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>Accessibility</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--text-brand-inverse)",
              textDecoration: "underline",
              flexShrink: 0,
              alignSelf: "stretch",
            }}>Privacy</span>
          </div>
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing-025) * 1px)",
            alignItems: "flex-start",
            flexWrap: "nowrap",
            flexShrink: 0,
            alignSelf: "stretch",
          }}>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "pre-wrap",
            }}>{"The University of Melbourne (Australian University): "}{"PRV12150"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "pre-wrap",
            }}>{"CRICOS: "}{"00116K"}</span>
            <span style={{
              position: "relative",
              fontFamily: "\"Source Sans 3\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--text-primary-inverse)",
              flexShrink: 0,
              alignSelf: "stretch",
              whiteSpace: "pre-wrap",
            }}>{"ABN: "}{"84 002 705 224"}</span>
          </div>
        </div>
      </div>
    </div>
  );
  const __impls = {
    // figma: Breakpoint=XL
    "breakpoint=xl": __body0,
    // figma: Breakpoint=LG
    "breakpoint=lg": __body1,
    // figma: Breakpoint=MD
    "breakpoint=md": __body2,
    // figma: Breakpoint=SM
    "breakpoint=sm": __body3,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default Footer;
