import style from "css/modules/Buttons.module.sass";
import { AppContext } from "@context/AppContext";
import { useContext } from "react";

export default function ToggleButton(props) {
  return (
    <button
      className={`
                ${style.navButton} 
                ${props.appState == props.task ? style.pressed : ""}
                w-75`}
      disabled={
        props.selecting ||
        !(props.appState == "" || props.appState == props.task) ||
        !props.readyToRun
      }
      onClick={() => {
        props.appState != ""
          ? props.setAppState("")
          : props.setAppState(props.task);
      }}
    >
      {props.children}
    </button>
  );
}
