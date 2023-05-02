import { useEffect, useState } from "react";

export default function MenuRotation(props) {
  return (
    <div type="menuOption" className="d-flex justify-content-between w-75 ">
      <span>{props.children}</span>
      <div className="d-flex flex-column justify-content-center">
        <img
          src="/imgs/fleche droit-1.jpg"
          className={"img-fluid h-50" + props.rotation ? "" : "flip"}
        />
      </div>
    </div>
  );
}
