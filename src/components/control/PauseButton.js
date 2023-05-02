import style from "css/modules/Buttons.module.sass"
import { useContext, useEffect, useState } from "react";
import { RunContext } from "@context/RunContext";

export default function PauseButton(props) {
    const { runningState, setRunningState } = useContext(RunContext)
    /*
        const handleMouseUp = (e) => {
            setPressed(0);
        }
    
        useEffect(() => {
            window.addEventListener("mouseup", handleMouseUp)
    
            return () => {
                window.removeEventListener('mouseup', handleMouseUp);
            };
        })
        */

    return (
        <button
            className={` ${style.navButton}
            ${runningState == 2 ? style.pressed : ''}
            w-75`}
            disabled={runningState == 0}
            onClick={() => { runningState == 2 ? setRunningState(1) : setRunningState(2) }}

        >
            {props.children}
        </button >
    );
}
