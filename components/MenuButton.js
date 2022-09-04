import { useEffect } from "react";

export default function MenuButton(props) {
  //add button press animation to 'press' buttons

  return (
    <button
      ref={props.innerRef}
      className={`navButton w-75 animateButton`}
      id={props.id ? props.id : null}
      onClick={props.onClick}
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
