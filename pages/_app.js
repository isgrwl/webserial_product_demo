import "bootstrap/dist/css/bootstrap.css";
import "../public/styles/globals.css";
import { useState, useEffect, createContext } from "react";
import PairedBox from "../components/PairedBox";
import store from "store2";

function MyApp({ Component, pageProps }) {
  const [paired, setPaired] = useState(0);
  const [params, setParams] = useState({
    numPhotos: store("numPhotos") || 0,
    laserActive: store("laserActive") || 0,
    laserAngle: store("laserAngle") || 0,
    flashDelay: store("flashDelay") || 0,
    rotationDirection: store("rotationDirection") || 0,
    rotationSpeed: store("rotationSpeed") || 0,
  });

  const [port, setPort] = useState({});

  //add event listeners on mount
  useEffect(() => {
    //check if port is available on mount
    (async () => {
      const ports = await navigator.serial.getPorts();
      if (ports.length > 0) {
        setPaired(1);
      } else {
        setPaired(0);
      }
    })();

    navigator.serial.addEventListener("connect", (e) => {
      (async () => {
        const availablePorts = await navigator.serial.getPorts();

        if (availablePorts.length > 0) {
          setPaired(1);
          setPort((s) => {
            return availablePorts[0];
          });
        }
      })();

      console.log("Connected serial device.");
    });

    navigator.serial.addEventListener("disconnect", (e) => {
      setPaired(0);
      console.log("Disconnected serial device.");
    });
  }, []);

  //tie app logic to ports
  useEffect(() => {
    console.log(port);
    (async () => {
      if (paired) {
        //if port is uninitialized, initialize it then open it and store it in state
        if (
          Object.getPrototypeOf(port).constructor.name !== "SerialPort" ||
          port.readable == null
        ) {
          try {
            console.log("opening port..");
            let ports = await navigator.serial.getPorts();
            await ports[0].open({ baudRate: 9600 });

            setPort((s) => {
              return ports[0];
            });

            //close port nicely on disconnect
            ports[0].addEventListener("disconnect", (e) => {
              e.target.close();
            });

            //start reading on port
            while (port.readable) {
              const reader = port.readable.getReader();

              try {
                while (true) {
                  const { value, done } = await reader.read();
                  if (done) {
                    // Allow the serial port to be closed later.
                    reader.releaseLock();
                    break;
                  }
                  if (value) {
                    console.log(value);
                  }
                }
              } catch (error) {
                // TODO: Handle non-fatal read error.
                console.log(error);
              }
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log("Port is already open");
        }
      } else {
        //only open port if its not already open
      }
    })();
  }, [paired]);

  useEffect(() => {});

  //keep settings synced
  //useEffect(() => {}, [settings]);
  useEffect(() => {
    store(params);
  }, [params]);

  return (
    <>
      <PairedBox paired={paired}></PairedBox>
      <Component
        {...pageProps}
        paired={paired}
        setPaired={setPaired}
        params={params}
        setParams={setParams}
        port={port}
        setPort={setPort}
      />
    </>
  );
}

export default MyApp;
