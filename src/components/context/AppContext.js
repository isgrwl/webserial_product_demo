import React, { createContext, useState, useEffect } from 'react';
import store from "store2";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [paired, setPaired] = useState(0);
    const [port, setPort] = useState({});

    //initialize state from localStorage
    const [params, setParams] = useState({
        
        numPhotos: store("numPhotos") ?? 0,
        laserActive: store("laserActive") ?? 0,
        laserAngle: store("laserAngle") ?? 0,
        flashDelay: store("flashDelay") ?? 0,
        rotationDirection: store("rotationDirection") ?? 0,
        rotationSpeed: store("rotationSpeed") ?? 0,
        boxValues: store("boxValues") ?? new Array(24).fill(0),
    });

    //keep params synced with localStorage
    useEffect(() => {
        store(params);
    }, [params]);

    //keep port and pairing updated
    useEffect(() => {
        //monitor connect and disconnect events for device
        const onConnect = async (e) => {
            setPaired(1);
            setPort(e.target);
            console.log("Reconnected to device.");
        }

        const onDisconnect = async (e) => {
            setPaired(0);
            setPort(null);
            console.log("Disconnected serial device.");
        }

        navigator.serial.addEventListener("connect", onConnect);
        navigator.serial.addEventListener("disconnect", onDisconnect);

        //reconnect to port on refresh
        (async () => {
            const ports = await navigator.serial.getPorts();
            if (ports.length > 0) {
                setPaired(1);
                setPort(ports[0]);
            } else {
                setPaired(0);
            }
        })();


    }, []);

    const s = {
        paired,
        setPaired,
        port,
        setPort,
        params,
        setParams
    }

    return (
        <AppContext.Provider value={s}>
            {children}
        </AppContext.Provider>
    )
};