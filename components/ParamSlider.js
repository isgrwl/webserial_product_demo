import { useEffect, useState } from "react";
import store from "store2";

export default function ParamSlider(props) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <span className="col-4">{props.children}</span>
      <input
        className="col-1"
        type="number"
        id={props.id + "Number"}
        value={props.val}
        readOnly
      ></input>
      <input
        type="range"
        min={props.min}
        max={props.max}
        className="slider w-50 col-7"
        id={props.id}
        onChange={(e) => {
          props.setState((s) => {
            return { ...s, [props.id]: parseInt(e.target.value) };
          });
          e.preventDefault();
        }}
        value={props.val}
      />
    </div>
  );
}
