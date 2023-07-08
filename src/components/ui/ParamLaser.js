import { useEffect, useState, useContext } from "react";
import { AppContext } from "@context/AppContext";
import style from "css/modules/Buttons.module.sass";

export default function LaserButton(props) {
  const { params, setParams } = useContext(AppContext);

  return (
    <div className="d-flex col-5 align-items-center ">
      <span>Etat de la croix laser</span>
      <button
        id="laserButton"
        className={`${style.activeButton} ${
          params.laserActive ? style.isActive : ""
        } w-25`}
        onClick={(e) => {
          setParams((s) => {
            return {
              ...s,
              [props.id]: params[props.id] ? 0 : 1,
            };
          });
          props.updateParam();
        }}
        disabled={props.appState != ""}
      >
        {params.laserActive ? "Active" : "Passif"}
      </button>
    </div>
  );
}
