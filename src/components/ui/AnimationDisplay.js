import SelectBox from "./SelectBox";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import Image from "next/image";
import style from "css/modules/Buttons.module.sass";
import { AppContext } from "@context/AppContext";
function CheckBox(props) {
  return (
    <input
      type="checkbox"
      className={style.selectButton + " position-fixed"}
      checked={props.val == "1" ? true : false}
      style={{
        left: `${
          props.originPos?.left +
          props.originPos?.width / 2 +
          Math.cos(((2 * Math.PI) / 24) * (props.boxIndex - 6)) *
            props.originPos?.width -
          15
        }px`,
        top: `${
          props.originPos?.top +
          props.originPos?.height / 2 +
          Math.sin(((2 * Math.PI) / 24) * (props.boxIndex - 6)) *
            props.originPos?.width -
          15
        }px`,
      }}
      onClick={() => {
        props.setBoxVal(props.boxIndex, props.val == "1" ? "0" : "1");
      }}
      disabled={props.disabled}
    ></input>
  );
}

export default function AnimationDisplay(props) {
  const imgRef = useRef(null);
  const [imgPos, setImgPos] = useState(imgRef);
  const resizeHandler = (e) => {
    setImgPos(imgRef.current.getBoundingClientRect());
  };
  useEffect(() => {
    setImgPos(imgRef.current.getBoundingClientRect());
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return (
    <div className="position-relative h-100 w-100 d-flex justify-content-center align-items-center">
      <div>
        {new Array(24).fill(0).map((el, i) => {
          return (
            <CheckBox
              key={i}
              setBoxVal={props.setBoxVal}
              boxIndex={i}
              val={props.boxValues.at(i)}
              originPos={imgPos}
              disabled={props.selecting}
            ></CheckBox>
          );
        })}
      </div>

      <div ref={imgRef} className="position-relative h-50 w-50">
        <Image
          style={
            ({ transform: `rotate(${props.rotation}deg)` },
            { pointerEvents: "none" })
          }
          src="/imgs/platformIcon.png"
          alt="Turn Icon"
          objectFit="contain"
          layout="fill"
        />
      </div>
    </div>
  );
}
