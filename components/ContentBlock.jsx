import { Slot2 } from './Slot2.jsx';
import { TitleLockup } from './TitleLockup.jsx';

// figma node: 7574:3683 Content block (24 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "breakpoint=" + __venc(p.breakpoint) + '|' + "inverse=" + __venc(p.inverse) + '|' + "background=" + __venc(p.background);

export function ContentBlock(_p = {}) {
  const props = { ..._p, titleLockup: _p.titleLockup ?? true, breakpoint: _p.breakpoint ?? "xl", inverse: _p.inverse ?? false, background: _p.background ?? "primary" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 1288,
      minWidth: 1024,
      maxWidth: 1288,
      maxHeight: null,
      backgroundColor: "var(--background-primary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        overline={true}
        description={true}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 1288,
      minWidth: 1024,
      maxWidth: 1288,
      maxHeight: null,
      backgroundColor: "var(--background-secondary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        overline={true}
        description={true}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 1288,
      minWidth: 1024,
      maxWidth: 1288,
      maxHeight: null,
      backgroundColor: "var(--background-tertiary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        overline={true}
        description={true}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 1288,
      minWidth: 1024,
      maxWidth: 1288,
      maxHeight: null,
      backgroundColor: "var(--background-primary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 1288,
      minWidth: 1024,
      maxWidth: 1288,
      maxHeight: null,
      backgroundColor: "var(--background-secondary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 1288,
      minWidth: 1024,
      maxWidth: 1288,
      maxHeight: null,
      backgroundColor: "var(--background-tertiary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body6 = () => (
    <div className={props.className} style={{
      width: 1440,
      minWidth: 1288,
      backgroundColor: "var(--background-primary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body7 = () => (
    <div className={props.className} style={{
      width: 1440,
      minWidth: 1288,
      backgroundColor: "var(--background-secondary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body8 = () => (
    <div className={props.className} style={{
      width: 1440,
      minWidth: 1288,
      backgroundColor: "var(--background-tertiary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body9 = () => (
    <div className={props.className} style={{
      width: 1440,
      minWidth: 1288,
      backgroundColor: "var(--background-primary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body10 = () => (
    <div className={props.className} style={{
      width: 1440,
      minWidth: 1288,
      backgroundColor: "var(--background-secondary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body11 = () => (
    <div className={props.className} style={{
      width: 1440,
      minWidth: 1288,
      backgroundColor: "var(--background-tertiary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "80px 32px 80px 32px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body12 = () => (
    <div className={props.className} style={{
      width: 768,
      minWidth: 720,
      maxWidth: 1023,
      maxHeight: null,
      backgroundColor: "var(--background-primary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "64px 16px 64px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body13 = () => (
    <div className={props.className} style={{
      width: 768,
      minWidth: 720,
      maxWidth: 1023,
      maxHeight: null,
      backgroundColor: "var(--background-secondary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "64px 16px 64px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body14 = () => (
    <div className={props.className} style={{
      width: 768,
      minWidth: 720,
      maxWidth: 1023,
      maxHeight: null,
      backgroundColor: "var(--background-tertiary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "64px 16px 64px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body15 = () => (
    <div className={props.className} style={{
      width: 768,
      minWidth: 720,
      maxWidth: 1023,
      maxHeight: null,
      backgroundColor: "var(--background-primary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "64px 16px 64px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body16 = () => (
    <div className={props.className} style={{
      width: 768,
      minWidth: 720,
      maxWidth: 1023,
      maxHeight: null,
      backgroundColor: "var(--background-secondary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "64px 16px 64px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body17 = () => (
    <div className={props.className} style={{
      width: 768,
      minWidth: 720,
      maxWidth: 1023,
      maxHeight: null,
      backgroundColor: "var(--background-tertiary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "64px 16px 64px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 116,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body18 = () => (
    <div className={props.className} style={{
      width: 360,
      minWidth: 320,
      maxWidth: 719,
      maxHeight: null,
      backgroundColor: "var(--background-primary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "48px 16px 48px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 146,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body19 = () => (
    <div className={props.className} style={{
      width: 360,
      minWidth: 320,
      maxWidth: 719,
      maxHeight: null,
      backgroundColor: "var(--background-secondary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "48px 16px 48px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 146,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body20 = () => (
    <div className={props.className} style={{
      width: 360,
      minWidth: 320,
      maxWidth: 719,
      maxHeight: null,
      backgroundColor: "var(--background-tertiary)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "48px 16px 48px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={false}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 146,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body21 = () => (
    <div className={props.className} style={{
      width: 360,
      minWidth: 320,
      maxWidth: 719,
      maxHeight: null,
      backgroundColor: "var(--background-primary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "48px 16px 48px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 146,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body22 = () => (
    <div className={props.className} style={{
      width: 360,
      minWidth: 320,
      maxWidth: 719,
      maxHeight: null,
      backgroundColor: "var(--background-secondary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "48px 16px 48px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 146,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __body23 = () => (
    <div className={props.className} style={{
      width: 360,
      minWidth: 320,
      maxWidth: 719,
      maxHeight: null,
      backgroundColor: "var(--background-tertiary-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-200) * 1px)",
      padding: "48px 16px 48px 16px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      paddingLeft: "calc(var(--margin) * 1px)",
      paddingTop: "calc(var(--spacing-responsive-500) * 1px)",
      paddingRight: "calc(var(--margin) * 1px)",
      paddingBottom: "calc(var(--spacing-responsive-500) * 1px)",
      position: "relative",
      ...props.style,
    }}>
      {props.titleLockup && (
      <TitleLockup
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        inverse={true}
        titleStyle={"title 1"}
        alignment={"centre"}
      />
      )}
      <div style={{
          position: "relative",
          height: 146,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}>{props.slot ?? <Slot2 type={"default"} />}</div>
    </div>
  );
  const __impls = {
    // figma: Breakpoint=LG, Inverse=False, Background=Primary
    "breakpoint=lg|inverse=false|background=primary": __body0,
    // figma: Breakpoint=LG, Inverse=False, Background=Secondary
    "breakpoint=lg|inverse=false|background=secondary": __body1,
    // figma: Breakpoint=LG, Inverse=False, Background=Tertiary
    "breakpoint=lg|inverse=false|background=tertiary": __body2,
    // figma: Breakpoint=LG, Inverse=True, Background=Primary
    "breakpoint=lg|inverse=true|background=primary": __body3,
    // figma: Breakpoint=LG, Inverse=True, Background=Secondary
    "breakpoint=lg|inverse=true|background=secondary": __body4,
    // figma: Breakpoint=LG, Inverse=True, Background=Tertiary
    "breakpoint=lg|inverse=true|background=tertiary": __body5,
    // figma: Breakpoint=XL, Inverse=False, Background=Primary
    "breakpoint=xl|inverse=false|background=primary": __body6,
    // figma: Breakpoint=XL, Inverse=False, Background=Secondary
    "breakpoint=xl|inverse=false|background=secondary": __body7,
    // figma: Breakpoint=XL, Inverse=False, Background=Tertiary
    "breakpoint=xl|inverse=false|background=tertiary": __body8,
    // figma: Breakpoint=XL, Inverse=True, Background=Primary
    "breakpoint=xl|inverse=true|background=primary": __body9,
    // figma: Breakpoint=XL, Inverse=True, Background=Secondary
    "breakpoint=xl|inverse=true|background=secondary": __body10,
    // figma: Breakpoint=XL, Inverse=True, Background=Tertiary
    "breakpoint=xl|inverse=true|background=tertiary": __body11,
    // figma: Breakpoint=MD, Inverse=False, Background=Primary
    "breakpoint=md|inverse=false|background=primary": __body12,
    // figma: Breakpoint=MD, Inverse=False, Background=Secondary
    "breakpoint=md|inverse=false|background=secondary": __body13,
    // figma: Breakpoint=MD, Inverse=False, Background=Tertiary
    "breakpoint=md|inverse=false|background=tertiary": __body14,
    // figma: Breakpoint=MD, Inverse=True, Background=Primary
    "breakpoint=md|inverse=true|background=primary": __body15,
    // figma: Breakpoint=MD, Inverse=True, Background=Secondary
    "breakpoint=md|inverse=true|background=secondary": __body16,
    // figma: Breakpoint=MD, Inverse=True, Background=Tertiary
    "breakpoint=md|inverse=true|background=tertiary": __body17,
    // figma: Breakpoint=SM, Inverse=False, Background=Primary
    "breakpoint=sm|inverse=false|background=primary": __body18,
    // figma: Breakpoint=SM, Inverse=False, Background=Secondary
    "breakpoint=sm|inverse=false|background=secondary": __body19,
    // figma: Breakpoint=SM, Inverse=False, Background=Tertiary
    "breakpoint=sm|inverse=false|background=tertiary": __body20,
    // figma: Breakpoint=SM, Inverse=True, Background=Primary
    "breakpoint=sm|inverse=true|background=primary": __body21,
    // figma: Breakpoint=SM, Inverse=True, Background=Secondary
    "breakpoint=sm|inverse=true|background=secondary": __body22,
    // figma: Breakpoint=SM, Inverse=True, Background=Tertiary
    "breakpoint=sm|inverse=true|background=tertiary": __body23,
  };
  return (__impls[__vkey(props)] ?? __body6)();
}
export default ContentBlock;
