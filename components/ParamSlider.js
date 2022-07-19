import { useEffect, useState } from "react";
import store from "store2";

export default function ParamSlider(props) {
  const [value, setValue] = useState(store("settings_" + props.id) || 0);

  useEffect(() => {
    store("settings_" + props.id, value);
  });
  return (
    <div className="d-flex justify-content-between align-items-center">
      <span className="col-4">{props.children}</span>
      <input
        className="col-1"
        type="number"
        id={props.id + "Number"}
        value={value}
        readOnly
      ></input>
      <input
        type="range"
        min="0"
        max="99"
        className="slider w-50 col-7"
        id={props.id}
        onChange={(e) => {
          setValue(e.target.value);
          e.preventDefault();
        }}
        value={value}
      />
    </div>
  );
}
