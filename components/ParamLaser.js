import store from "store2";
import { useEffect, useState } from "react";

export default function LaserButton(props) {
  let [c, sc] = useState("");
  let [t, st] = useState("");
  useEffect(() => {
    sc(props.val ? "isActive" : "");
    st(props.val ? "Actif" : "Passif");
  }, [props.val]);

  return (
    <div className="d-flex col-3 align-items-center ">
      <span>Etat de la croix laser</span>
      <button
        id="laserButton"
        className={"activeButton w-50 h-75 " + c}
        onClick={(e) => {
          props.setState((s) => {
            return {
              ...s,
              [props.id]: props.val ? 0 : 1,
            };
          });
          e.preventDefault();
        }}
      >
        {
          t
          //props.val ? "Actif" : "Pasif"}
        }
      </button>
    </div>
  );
}
