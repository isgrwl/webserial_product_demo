import { useEffect } from "react";
import writeToSerial from "@util/writeToSerial";

export default function MenuArrows() {
  useEffect(() => {
    document.addEventListener("mouseup", (e) => {
      handleMouseup(e);
    });
  }, []);
  return (
    <div type="menuOption" className="d-flex w-75 ">
      <div className="col d-flex justify-content-center arrowButton">
        <img
          src="/imgs/fleche gauche-1.jpg"
          className="img-fluid"
          onMouseDown={(e) => {
            handleMousedown(e);
            writeToSerial(props.port, ["Ff1"]);
          }}
          onMouseUp={(e) => {
            writeToSerial(props.port, ["Ff0"]);
          }}
        />
      </div>
      <div className="col d-flex justify-content-center arrowButton">
        <img
          src="/imgs/fleche droit-1.jpg"
          className="img-fluid "
          onMouseDown={(e) => {
            handleMousedown(e);
            writeToSerial(props.port, ["Fe1"]);
          }}
          onMouseUp={(e) => {
            writeToSerial(props.port, ["Fe0"]);
          }}
        />
      </div>
    </div>
  );
}

function handleMousedown(e) {
  e.target.classList.add("arrowClick");
}

function handleMouseup(e) {
  document.querySelectorAll(".arrowClick").forEach((el) => {
    el.classList.remove("arrowClick");
  });
}
