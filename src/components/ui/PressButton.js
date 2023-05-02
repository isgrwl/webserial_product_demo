import style from "css/modules/Buttons.module.sass"
import { useEffect, useState } from "react";

export default function PressButton(props) {
    const [pressed, setPressed] = useState(0)

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
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
