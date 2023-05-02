import { useEffect, useState, useContext } from "react";
import store from "store2";
import { AppContext } from "@context/AppContext";
import style from "css/modules/Params.module.sass"

export default function ParamSlider(props) {
  const { params, setParams } = useContext(AppContext);
  return (
    <div className="row d-flex justify-content-between align-items-center">
      <span className="col-4">{props.children}</span>
      <input
        className={style.numberDisplay}
        type="number"
        id={props.id + "Number"}
        value={params[props.id]}
        readOnly
      ></input>
      <input
        type="range"
        min={props.min}
        max={props.max}
        className={`${style.slider} w-50 col-7`}
        id={props.id}
        onChange={(e) => {
          setParams((s) => {
            return { ...s, [props.id]: parseInt(e.target.value) };
          });
          e.preventDefault();
        }}
        value={params[props.id]}
      />
    </div>
  );
}
