import { createContext, useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "./SerialContext";
import { writeParams } from "@serial/writeParams";

export const RunContext = createContext();

export const RunProvider = ({ children }) => {

    const [runState, setRunState] = useState(0);
    //open and close port based on running state
    //0 = stopped, 1 = running, 2 = paused
    useEffect(() => {

        (async () => {
            if (paired) {
                if (runningState == 0) {
                    //if port.readable is an object, port is open so we should close it
                    if (port.readable) {
                        await port.close()
                    }

                }
                else if (runningState == 1) {
                    if (!port.readable) {
                        await port.open({ baudRate: 115200 })
                        //timeout for arduino initialization
                        await new Promise(res => setTimeout(res, 3500))
                        await writeParams(port, params)

                    }
                }
                else if (runningState == 2) {
                    //pause command
                }
            } else {
                setRunningState(0)
            }

        })();
    }, [runningState, paired, port, params])

    //TODO: add event listener that discourages user from refreshing while app is runninng
    /*useEffect(() => {
        const handleRefresh = () => {
            console.log("nooo")
            return "App is in progress, are you sure you want to refresh?"
        }

        if (runningState !== 0) {
            window.onbeforeunload = handleRefresh
        } else
            window.onbeforeunload = () => { }

    }, [runningState])*/

    const v = {
        runningState, setRunningState
    }
    return (
        <RunContext.Provider value={v}>
            {children}
        </RunContext.Provider>
    )
}


