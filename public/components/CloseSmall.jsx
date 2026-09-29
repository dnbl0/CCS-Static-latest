// figma node: 297:3863 close_small
export function CloseSmall(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: 24,
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "rgb(0,0,0)",
      ...props.style,
    }}>
      <svg width={9.975} height={9.975} viewBox="0 0 9.975 9.975" fill="none" style={{
        position: "absolute",
        left: 7,
        top: 7.025,
        width: 9.975,
        height: 9.975,
      }}>
        <path d={"M 1.4 9.975 L 0 8.575 L 3.6 4.975 L 0 1.4 L 1.4 0 L 5 3.6 L 8.575 0 L 9.975 1.4 L 6.375 4.975 L 9.975 8.575 L 8.575 9.975 L 5 6.375 L 1.4 9.975 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default CloseSmall;
