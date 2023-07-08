import { useEffect, useState, useContext } from "react";
import { AppContext } from "@context/AppContext";
import Image from "next/image";
import style from "css/modules/Components.module.sass";

export default function ParamRotation(props) {
  const { params, setParams } = useContext(AppContext);

  return (
    <div className="col-4 position-relative d-flex align-items-center justify-content-center h-75">
      <span className="col-8">Sens de rotation</span>
      <div className="col-4 position-relative h-100">
        <Image
          className={`${params.rotationDirection ? style.flip : ""}`}
          style={{ opacity: props.disabled ? 0.6 : 1 }}
          id="rotationArrow"
          src="/imgs/fleche droite.png"
          alt="Rotation Direction Arrow"
          layout="fill"
          objectFit="contain"
          onClick={
            props.disabled
              ? null
              : (e) => {
                  setParams((s) => {
                    return {
                      ...s,
                      [props.id]: parseInt(params[props.id]) ? 0 : 1,
                    };
                  });
                  props.updateParam();
                }
          }
        />
      </div>
    </div>
  );
}
