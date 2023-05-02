import SelectBox from "./SelectBox";
import React, { useEffect, useRef, useState } from "react";
import store from "store2";
import Image from "next/image";

export default function AnimationDisplayB(props) {
  useEffect(() => {
    function drawBoxes() {
      const rect = document.getElementById("display").getBoundingClientRect();
      const checkBoxes = document.querySelectorAll("[find=selectButton]");

      checkBoxes.forEach((box, i) => {
        box.style.top = `${(rect.height / 2) * Math.cos(((2 * Math.PI) / 24) * i) +
          rect.top +
          rect.height / 2 -
          box.clientHeight / 2
          }px`;
        box.style.left = `${(rect.height / 2) * Math.sin(((2 * Math.PI) / 24) * i) +
          rect.left +
          rect.width / 2 -
          box.clientWidth / 2
          }px`;
        box.style.position = "absolute";
      });
    }

    drawBoxes();
    window.addEventListener("resize", (e) => {
      drawBoxes();
    });
  }, []);

  return (
    <div
      id="display"
      className="animation360-noborder flex-fill d-flex justify-content-center align-items-center"
    >
      {props.params.boxValues.map((v, i) => {
        return (
          <SelectBox
            checked={props.params.boxValues[i]}
            key={`$box${i}`}
            onClick={() => {
              props.setParams({
                ...props.params,
                boxValues: ((i) => {
                  let l = Array.from(props.params.boxValues);
                  l[i] = v ? 0 : 1;
                  return l;
                })(i),
              });
            }}
            enable={props.enable === 2 ? 0 : 1}
          ></SelectBox>
        );
      })}

      <div className="twoImage">
        <Image src="/imgs/platformIcon.png" alt="Plaform Icon" layout="fill" objectFit="contain" />
        {/*<img className="bgWheel" src="/imgs/E-commerce.jpg" />*/}
      </div>
    </div>
  );
}
