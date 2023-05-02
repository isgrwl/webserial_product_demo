import { createContext, useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";
import writeInstructions from "@util/writeToSerial";

export const RunContext = createContext();

export const RunProvider = ({ children }) => {
    const { paired, port, setPort, params } = useContext(AppContext)
    const [runningState, setRunningState] = useState(0);
    //keep the reader & writer between state changes
    const readerRef = useRef();
    const keepReading = useRef();
    const writerRef = useRef();
    const keepWriting = useRef();

    //open and close port based on running state
    //0 = stopped, 1 = running, 2 = paused
    useEffect(() => {
        //tie app logic to ports, begin reading
        //TODO: move this next to port initialization so that effect isnt called twice
        (async () => {
            {
                if (paired) {
                    if (runningState == 0) {
                        //cancel reader to allow port to close
                        if (port.readable) {
                            keepReading.current = false;
                            readerRef.current?.cancel();
                            //release writer lock to allow port to close
                            if (port.writable?.locked) {
                                writerRef.current?.releaseLock()
                            }
                        }

                    }
                    else if (runningState == 1) {
                        keepReading.current = true;
                        //open and initialize port reader & writer
                        openPort(port, readerRef, keepReading, keepWriting, writerRef)

                    }
                    else if (runningState == 2) {
                        //pause command
                    }
                } else {
                    setRunningState(0)
                }
            }
        })();
    }, [runningState, paired, port])

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
        runningState, setRunningState, writerRef
    }
    return (
        <RunContext.Provider value={v}>
            {children}
        </RunContext.Provider>
    )
}

//this opens a port and stores the reader and writer in refs. this doesnt use the serial device's responses further
async function openPort(port, readerRef, keepReading, keepWriting, writerRef) {
    if (
        Object.getPrototypeOf(port).constructor.name !== "SerialPort" ||
        port.readable === null
    ) {

        try {
            console.log("opening port..");
            await port.open({ baudRate: 115200 });

            //close port nicely on disconnect
            /*port.addEventListener("disconnect", (e) => {
                readerRef.current.cancel()
            });*/

            //start reading 
            /*writeInstructions(port, writerRef, keepWriting, ["Va24","Vb1","Vc1","Vd0","Ve1","Vf1"])*/
            //create writer
            writerRef.current = await port.writable.getWriter();
            writeInstructions(port, writerRef, keepWriting, ["hello there"])
            while (port.readable && keepReading.current) {
                /*const textDecoder = new TextDecoderStream();
                const readableStreamClosed = port.readable.pipeTo(
                    textDecoder.writable
                );
                const reader = textDecoder.readable.getReader();*/
                readerRef.current = await port.readable.getReader()
                //write params before anything else 
                try {
                    while (true) {
                        console.log("reading...");
                        const { value, done } = await readerRef.current.read();
                        if (done) {
                            // Allow the serial port to be closed later.
                            readerRef.current.releaseLock();
                            break;
                        }
                        if (value) {
                            keepWriting = 1;
                            console.log("message: ", value);
                        }
                    }
                } catch (error) {
                    // TODO: Handle non-fatal read error.
                    console.log(error);
                }
                finally {
                    readerRef.current.releaseLock()
                }

            }
            await port.close()
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("Port is already open");
    }

}