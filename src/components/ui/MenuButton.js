import { useEffect } from "react";
import style from 'css/modules/Buttons.module.sass'

export default function MenuButton(props) {
  //add button press animation to 'press' buttons

  return (
    <button
      ref={props.innerRef}
      style={
        {
          "fontSize": "3vh",
          "marginTop": "1%",
        }}
      //className="navButton w-75 animateButton"
      id={props.id ? props.id : null}
      onClick={() => { }}
      onMouseDown={
        props.type === "press"
          ? (e) => {
            e.target.classList.add("running");
          }
          : null
      }
      onMouseUp={
        props.type === "press"
          ? (e) => {
            e.target.classList.remove("running");
          }
          : null
      }
      type={props.type}
    >
      {props.children}
    </button>
  );
}
