import style from "css/modules/Buttons.module.sass"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/AppContext";

export default function PauseButton(props) {
    const { runState, setRunState } = useContext(AppContext)

    return (
        <button
            className={` ${style.navButton}
            ${runState == 2 ? style.pressed : ''}
            w-75`}
            disabled={!(props.appState == "" || props.appState == props.task) || !props.portOpen || !props.readyToRun}
            onClick={() => { }}
        >
            {props.children}
        </button >
    );
}
