import { useState, useEffect, useSyncExternalStore } from "react";
import store from "store2";
import clsx from "clsx";

export default function SelectBox(props) {
  //fuck react and this bullshit fuck
  const [classPlaceholder, setClassPlaceholder] = useState("");
  useEffect(() => {
    setClassPlaceholder(props.checked && "checked");
  }, [props.checked]);
  return (
    <button
      find="selectButton"
      className={`selectButton ${classPlaceholder}`}
      onClick={props.onClick}
      disabled={props.enable || false}
    ></button>
  );
}
