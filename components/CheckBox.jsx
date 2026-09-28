// figma node: 47:2278 checkBox (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "selected=" + __venc(p.selected);

export function CheckBox(_p = {}) {
  const props = { ..._p, selected: _p.selected ?? "off" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: 16,
      padding: "4px 4px 4px 4px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        width: 40,
        borderRadius: 4,
        backgroundColor: "rgb(255,255,255)",
        boxShadow: "inset 0 0 0 2px rgb(75,0,173)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={8} height={5.982} viewBox="0 0 8 5.982" fill="none" style={{
          position: "absolute",
          left: 15.999,
          top: 16.959,
          width: 8,
          height: 5.982,
        }}>
          <path d={"M 3.009 5.982 L 8 0.991 L 7.009 0 L 3.009 4 L 0.991 1.982 L 0 2.973 L 3.009 5.982 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: 16,
      padding: "4px 4px 4px 4px",
      alignItems: "center",
      flexWrap: "nowrap",
      boxSizing: "border-box",
      position: "relative",
      color: "rgb(255,255,255)",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        width: 40,
        borderRadius: 4,
        backgroundColor: "rgb(255,255,255)",
        boxShadow: "inset 0 0 0 20px rgb(75,0,173)",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={22.600} height={16.900} viewBox="0 0 22.600 16.900" fill="none" style={{
          position: "absolute",
          left: 8.699,
          top: 11.5,
          width: 22.6,
          height: 16.9,
        }}>
          <path d={"M 8.5 16.9 L 22.6 2.8 L 19.8 0 L 8.5 11.3 L 2.8 5.6 L 0 8.4 L 8.5 16.9 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
    </div>
  );
  const __impls = {
    // figma: Selected=Off
    "selected=off": __body0,
    // figma: Selected=On
    "selected=on": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default CheckBox;
