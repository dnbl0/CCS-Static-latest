import { AccordionItem } from './AccordionItem.jsx';

// figma node: 1545:6347 Accordion (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "inverse=" + __venc(p.inverse);

export function Accordion(_p = {}) {
  const props = { ..._p, inverse: _p.inverse ?? false, item6: _p.item6 ?? false, item1: _p.item1 ?? true, item7: _p.item7 ?? false, item8: _p.item8 ?? false, item9: _p.item9 ?? false, item5: _p.item5 ?? false, item2: _p.item2 ?? true, item4: _p.item4 ?? true, item10: _p.item10 ?? false, item3: _p.item3 ?? true };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 808,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.item1 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default"}
      />
      )}
      {props.item2 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default"}
      />
      )}
      {props.item3 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default"}
      />
      )}
      {props.item4 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default"}
      />
      )}
      {props.item5 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default"}
      />
      )}
      {props.item6 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default"}
      />
      )}
      {props.item7 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default"}
      />
      )}
      {props.item8 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default"}
      />
      )}
      {props.item9 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default"}
      />
      )}
      {props.item10 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default"}
      />
      )}
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 808,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "nowrap",
      position: "relative",
      ...props.style,
    }}>
      {props.item1 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default inverse"}
      />
      )}
      {props.item2 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default inverse"}
      />
      )}
      {props.item3 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default inverse"}
      />
      )}
      {props.item4 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default inverse"}
      />
      )}
      {props.item5 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default inverse"}
      />
      )}
      {props.item6 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default inverse"}
      />
      )}
      {props.item7 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default inverse"}
      />
      )}
      {props.item8 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default inverse"}
      />
      )}
      {props.item9 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default inverse"}
      />
      )}
      {props.item10 && (
      <AccordionItem
        style={{
          position: "relative",
          flexShrink: 0,
          alignSelf: "stretch",
          width: "auto",
        }}
        expanded={false}
        state={"default inverse"}
      />
      )}
    </div>
  );
  const __impls = {
    // figma: Inverse=False
    "inverse=false": __body0,
    // figma: Inverse=True
    "inverse=true": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default Accordion;
