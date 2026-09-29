import { PathfinderCard } from './PathfinderCard.jsx';

// figma node: 1401:1890 Pathfinder (6 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "breakpoint=" + __venc(p.breakpoint) + '|' + "inverse=" + __venc(p.inverse);

export function Pathfinder(_p = {}) {
  const props = { ..._p, card1: _p.card1 ?? true, breakpoint: _p.breakpoint ?? "lg", card2: _p.card2 ?? true, inverse: _p.inverse ?? true, card4: _p.card4 ?? true, card3: _p.card3 ?? true };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 1288,
      minWidth: 1024,
      overflow: "hidden",
      backgroundColor: "var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-006) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.card1 && (
      <PathfinderCard
        style={{
          position: "relative",
          flexGrow: 1,
          alignSelf: "stretch",
          width: "auto",
          height: "auto",
        }}
        state={"default inverse"}
        altBG={false}
      />
      )}
      {props.card2 && (
      <PathfinderCard
        style={{
          position: "relative",
          flexGrow: 1,
          alignSelf: "stretch",
          width: "auto",
          height: "auto",
        }}
        state={"default inverse"}
        altBG={true}
      />
      )}
      {props.card3 && (
      <PathfinderCard
        style={{
          position: "relative",
          flexGrow: 1,
          alignSelf: "stretch",
          width: "auto",
          height: "auto",
        }}
        state={"default inverse"}
        altBG={false}
      />
      )}
      {props.card4 && (
      <PathfinderCard
        style={{
          position: "relative",
          flexGrow: 1,
          alignSelf: "stretch",
          width: "auto",
          height: "auto",
        }}
        state={"default inverse"}
        altBG={true}
      />
      )}
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 1288,
      minWidth: 1024,
      overflow: "hidden",
      backgroundColor: "var(--stroke-weaker)",
      display: "flex",
      flexDirection: "row",
      gap: "calc(var(--spacing-006) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.card1 && (
      <PathfinderCard
        style={{
          position: "relative",
          flexGrow: 1,
          alignSelf: "stretch",
          width: "auto",
          height: "auto",
        }}
        state={"default"}
        altBG={false}
      />
      )}
      {props.card2 && (
      <PathfinderCard
        style={{
          position: "relative",
          flexGrow: 1,
          alignSelf: "stretch",
          width: "auto",
          height: "auto",
        }}
        state={"default"}
        altBG={true}
      />
      )}
      {props.card3 && (
      <PathfinderCard
        style={{
          position: "relative",
          flexGrow: 1,
          alignSelf: "stretch",
          width: "auto",
          height: "auto",
        }}
        state={"default"}
        altBG={false}
      />
      )}
      {props.card4 && (
      <PathfinderCard
        style={{
          position: "relative",
          flexGrow: 1,
          alignSelf: "stretch",
          width: "auto",
          height: "auto",
        }}
        state={"default"}
        altBG={true}
      />
      )}
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 720,
      minWidth: 720,
      maxWidth: 1023,
      maxHeight: null,
      overflow: "hidden",
      backgroundColor: "var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-006) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.card1 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 158,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default inverse"}
        altBG={false}
      />
      )}
      {props.card2 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 158,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default inverse"}
        altBG={true}
      />
      )}
      {props.card3 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 158,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default inverse"}
        altBG={false}
      />
      )}
      {props.card4 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 158,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default inverse"}
        altBG={true}
      />
      )}
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: 720,
      minWidth: 720,
      maxWidth: 1023,
      maxHeight: null,
      overflow: "hidden",
      backgroundColor: "var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-006) * 1px)",
      alignItems: "center",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.card1 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 158,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default"}
        altBG={false}
      />
      )}
      {props.card2 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 158,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default"}
        altBG={true}
      />
      )}
      {props.card3 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 158,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default"}
        altBG={false}
      />
      )}
      {props.card4 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 158,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default"}
        altBG={true}
      />
      )}
    </div>
  );
  const __body4 = () => (
    <div className={props.className} style={{
      width: 360,
      minWidth: 320,
      maxWidth: 719,
      maxHeight: null,
      overflow: "hidden",
      backgroundColor: "var(--stroke-weaker-inverse)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-006) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.card1 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 192,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default inverse"}
        altBG={false}
      />
      )}
      {props.card2 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 192,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default inverse"}
        altBG={true}
      />
      )}
      {props.card3 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 192,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default inverse"}
        altBG={false}
      />
      )}
      {props.card4 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 192,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default inverse"}
        altBG={true}
      />
      )}
    </div>
  );
  const __body5 = () => (
    <div className={props.className} style={{
      width: 360,
      minWidth: 320,
      maxWidth: 719,
      maxHeight: null,
      overflow: "hidden",
      backgroundColor: "var(--stroke-weaker)",
      display: "flex",
      flexDirection: "column",
      gap: "calc(var(--spacing-006) * 1px)",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.card1 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 192,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default"}
        altBG={false}
      />
      )}
      {props.card2 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 192,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default"}
        altBG={true}
      />
      )}
      {props.card3 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 192,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default"}
        altBG={false}
      />
      )}
      {props.card4 && (
      <PathfinderCard
        style={{
          position: "relative",
          height: 192,
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        image={false}
        state={"default"}
        altBG={true}
      />
      )}
    </div>
  );
  const __impls = {
    // figma: Breakpoint=LG, Inverse=True
    "breakpoint=lg|inverse=true": __body0,
    // figma: Breakpoint=LG, Inverse=False
    "breakpoint=lg|inverse=false": __body1,
    // figma: Breakpoint=MD, Inverse=True
    "breakpoint=md|inverse=true": __body2,
    // figma: Breakpoint=MD, Inverse=False
    "breakpoint=md|inverse=false": __body3,
    // figma: Breakpoint=SM, Inverse=True
    "breakpoint=sm|inverse=true": __body4,
    // figma: Breakpoint=SM, Inverse=False
    "breakpoint=sm|inverse=false": __body5,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default Pathfinder;
