import Image from "next/image";
import { useEffect, useState } from "react";

export default function MenuRotation(props) {
  return (
    <div type="menuOption" className="d-flex justify-content-between w-75 h-100">
      <span>{props.children}</span>
      <div className="col-3 position-relative">
        <Image
          alt="Rotation Direction"
          layout="fill"
          objectFit="contain"
          src="/imgs/fleche droit-1.jpg"
          className={props.rotation ? "" : "flip"}
        />
      </div>
    </div>
  );
}
