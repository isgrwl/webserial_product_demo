import { useEffect, useState } from "react";
import store from "store2";
export default function ParamRotation(props) {
  let [c, sc] = useState("");
  useEffect(() => {
    sc(props.val ? "flip" : "");
  }, [props.val]);

  return (
    <div className="position-relative d-flex col-3 align-items-center">
      <span className="">Sens de rotation</span>
      <img
        className={c}
        id="rotationArrow"
        src="/imgs/fleche droite.png"
        onClick={(e) => {
          props.setState((s) => {
            return {
              ...s,
              [props.id]: props.val ? 0 : 1,
            };
          });
          e.preventDefault();
        }}
      />
    </div>
  );
}
