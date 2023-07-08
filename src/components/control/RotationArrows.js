import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import style from "css/modules/Components.module.sass";
import { SerialContext } from "@context/SerialContext";
import commandMap from "@serial/commandMap";

const LeftArrow = (props) => {
  return (
    <div className="col-4 position-relative">
      <Image
        style={props.disabled ? { filter: "opacity(50%)" } : {}}
        alt="Left Rotation Arrow"
        layout="fill"
        objectFit="contain"
        src="/imgs/fleche gauche-1.jpg"
        onMouseDown={props.disabled ? null : props.arrowDown}
        onMouseUp={props.disabled ? null : props.arrowsUp}
      />
    </div>
  );
};

const RightArrow = (props) => {
  return (
    <div
      className={`col-4 position-relative ${style.nodrag} ${style.noselect}`}
    >
      <Image
        alt="Right Rotation Arrow"
        layout="fill"
        objectFit="contain"
        src="/imgs/fleche droit-1.jpg"
        onMouseDown={props.disabled ? null : props.arrowDown}
        onMouseUp={props.disabled ? null : props.arrowsUp}
        style={props.disabled ? { filter: "opacity(50%)" } : {}}
      />
    </div>
  );
};

export default function RotationArrows(props) {
  return (
    <div className="d-flex justify-content-evenly w-75 h-100 ">
      <LeftArrow
        arrowDown={props.arrowFuncs.leftArrowDown}
        arrowsUp={props.arrowFuncs.arrowsUp}
        disabled={props.disabled}
      ></LeftArrow>
      <p></p>
      <RightArrow
        arrowDown={props.arrowFuncs.rightArrowDown}
        arrowsUp={props.arrowFuncs.arrowsUp}
        disabled={props.disabled}
      ></RightArrow>
    </div>
  );
}
