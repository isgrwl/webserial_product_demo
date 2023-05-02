import { RunContext } from "@context/RunContext"
import styles from "css/modules/Buttons.module.sass"
import { useContext, useEffect } from "react"
export default function ChooseAnglesButton(props) {
    const { runningState } = useContext(RunContext)
    //keep button unpressed after setting runningState
    useEffect(() => {
        if (runningState != 0) {
            props.setSelecting(0)
        }
    }, [runningState, props])

    return (
        <button
            className={`${styles.navButton}
             ${props.selecting && !runningState ? styles.pressed : ""} 
             w-75`}
            disabled={runningState == 1}
            onClick={() => {
                props.selecting ? props.setSelecting(0) : props.setSelecting(1)
            }}>
            {props.children}
        </button>
    )
}