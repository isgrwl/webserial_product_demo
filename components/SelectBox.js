import { useState, useEffect, useSyncExternalStore } from "react";
import store from "store2";

export default function SelectBox(props) {
  const [checked, setChecked] = useState(1);
  useEffect(() => {
    //setChecked(props.checked);
  }, []);

  return (
    <button
      find="selectButton"
      i={props.i}
      className={checked ? "checked selectButton" : "selectButton"}
      onClick={(e) => {
        setChecked(checked ? 0 : 1);
      }}
      disabled={props.enable || false}
    ></button>
  );
}
