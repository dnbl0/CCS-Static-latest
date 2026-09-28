// figma node: 65:4622 .caret (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "caret=" + __venc(p.caret);

export function Caret(_p = {}) {
  const props = { ..._p, caret: _p.caret ?? "on" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 1,
      height: 24,
      position: "relative",
      ...props.style,
    }} />
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 1,
      height: 24,
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1,
        height: 24,
        backgroundColor: "var(--text-primary)",
      }} />
    </div>
  );
  const __impls = {
    // figma: Caret=Off
    "caret=off": __body0,
    // figma: Caret=On
    "caret=on": __body1,
  };
  return (__impls[__vkey(props)] ?? __body1)();
}
export default Caret;
