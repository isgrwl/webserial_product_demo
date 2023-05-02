import { RunContext } from "@context/RunContext"
import { AppContext } from "@context/AppContext"

import style from "css/modules/Buttons.module.sass"
import { useContext } from "react"

export default function StartButton(props) {
    const { runningState, setRunningState } = useContext(RunContext)
    const { paired } = useContext(AppContext)
    return (
        <button className={`
            ${style.navButton} 
            ${runningState != 0 ? style.pressed : ''}
            w-75`

        }
            disabled={!paired}
            onClick={() => { runningState ? setRunningState(0) : setRunningState(1) }}>
            {props.children}
        </button >
    )
}