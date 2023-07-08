import { AppContext } from "@context/AppContext";
import styles from "css/modules/Buttons.module.sass";
import { useContext, useEffect } from "react";
export default function ChooseAnglesButton(props) {
  //keep button unpressed after setting runState
  return (
    <button
      className={`${styles.navButton}
             ${props.selecting ? styles.pressed : ""} 
             w-75`}
      disabled={props.appState != "" || !props.readyToRun}
      onClick={() => {
        props.selecting ? props.setSelecting(0) : props.setSelecting(1);
        if (props.selecting == 1) {
          props.writeBoxValues();
        }
      }}
    >
      {props.children}
    </button>
  );
}
