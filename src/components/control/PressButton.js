import style from "css/modules/Buttons.module.sass"
import { useContext, useEffect, useState } from "react";
import { SerialContext } from "@context/SerialContext";
import sendCommand from "serial/sendCommand";

export default function PressButton(props) {
    const [pressed, setPressed] = useState(0)

    //animate button to change color while pressed
    const handleMouseUp = (e) => {
        setPressed(0);
    }

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp)

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        };
    })

    return (
        <button
            className={`${style.animateButton} ${style.navButton} w-75 ${pressed ? style.pressed : ""}`}
            onMouseDown={(e) => {
                setPressed(1)
            }}
            disabled={!((props.appState == "" || props.appState == props.task) && props.portOpen && props.readyToRun)}
            onClick={props.onClick}
        >
            {props.children}
        </button >
    );
}
