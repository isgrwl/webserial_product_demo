import Image from "next/image";
import { useEffect } from "react";
import style from "css/modules/Components.module.sass"

export default function MenuArrows() {
  return (
    <div className="d-flex justify-content-evenly w-75 h-100 ">

      <div className="col-4 position-relative">
        <Image
          alt="Left Rotation Arrow"
          layout="fill"
          objectFit="contain"
          src="/imgs/fleche gauche-1.jpg"
          onMouseDown={handleMouseup}
          onMouseUp={handleMouseup}
        />
      </div>
      <p></p>
      <div className="col-4 position-relative ">
        <Image
          alt="Right rotation Arrow"
          layout="fill"
          objectFit="contain"
          src="/imgs/fleche droit-1.jpg"
          onMouseDown={handleMousedown}
          onMouseUp={handleMouseup}
        />
      </div>
    </div>
  );
}

function handleMousedown(e) {
  e.target.classList.add("arrowClick");
}

function handleMouseup(e) {
  e.target.classList.add("arrowClick")
}
