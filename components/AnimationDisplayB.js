import SelectBox from "./SelectBox";
import React, { useEffect, useState } from "react";
import store from "store2";

export default function AnimationDisplayB(props) {
  const [boxValues, setBoxValues] = useState([]);
  useEffect(() => {
    if (store("boxValues")) {
      setBoxValues(store("boxValues"));
    } else {
      setBoxValues(new Array(24).fill(1));
    }
    console.log(boxValues);

    function drawBoxes() {
      const display = document.getElementById("display");
      const rect = display.getBoundingClientRect();
      const checkBoxes = document.querySelectorAll("button[find=selectButton]");

      for (const box of checkBoxes) {
        const i = box.getAttribute("i");
        box.style.top = `${
          (rect.width / 2) * Math.cos(((2 * Math.PI) / 24) * i) +
          rect.height / 2 -
          box.clientHeight / 2
        }px`;
        box.style.left = `${
          (rect.width / 2) * Math.sin(((2 * Math.PI) / 24) * i) +
          rect.width / 2 -
          box.clientWidth / 2
        }px`;
        box.style.position = "absolute";
      }
    }

    drawBoxes();

    window.addEventListener("resize", (e) => {
      drawBoxes();
    });
  }, []);

  return (
    <div
      id="display"
      className="flex-fill animation360-noborder d-flex justify-content-center align-items-center"
    >
      {(() => {
        return new Array(24).fill(0).map((v, i) => {
          return (
            <SelectBox
              checked={boxValues[i]}
              i={i}
              key={`$box${i}`}
              enable={props.enable === 2 ? 0 : 1}
              storeValue={setBoxValues}
            ></SelectBox>
          );
        });
      })()}

      <img src="/imgs/download.png" />
      <img className="bgWheel" src="/imgs/E-commerce.jpg" />
    </div>
  );
}
