import "bootstrap/dist/css/bootstrap.css";
import "../public/styles/globals.css";
import { useState, useEffect, createContext } from "react";
import PairedBox from "../components/PairedBox";
import store from "store2";
import { stringifyQuery } from "next/dist/server/server-route-utils";

function MyApp({ Component, pageProps }) {
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

    //monitor connect and disconnect events for device
    navigator.serial.addEventListener("connect", (e) => {
      setPaired(1);
      setPort(e.target);
      console.log("Reconnected to device.");
    });

    navigator.serial.addEventListener("disconnect", (e) => {
      setPaired(0);
      setPort(null);
      console.log("Disconnected serial device.");
    });
  }, []);

  //tie app logic to ports, begin reading
  //TODO: move this next to port initialization so that effect isnt called twice
  useEffect(() => {
    (async () => {
      if (paired) {
        //if port is uninitialized, initialize it then open it and store it in state
        if (
          Object.getPrototypeOf(port).constructor.name !== "SerialPort" ||
          port.readable === null
        ) {

          try {
            console.log("opening port..");
            await port.open({ baudRate: 115200 });

            //close port nicely on disconnect
            port.addEventListener("disconnect", (e) => {
              e.target.close();
            });
            //start reading on port
            const textDecoder = new TextDecoderStream();
            const readableStreamClosed = port.readable.pipeTo(
              textDecoder.writable
            );
            const reader = textDecoder.readable.getReader();

            while (port.readable) {
              try {
                while (true) {
                  console.log("reading...");

                  const { value, done } = await reader.read();
                  if (done) {
                    // Allow the serial port to be closed later.
                    reader.releaseLock();
                    break;
                  }
                  if (value) {
                    console.log("message: ");
                    console.log(value);
                  }
                }
              } catch (error) {
                // TODO: Handle non-fatal read error.
                console.log(error);
              }
            }

            //await port.close();
          } catch (err) {
            console.log(err);
          } finally {

          }
        } else {
          console.log("Port is already open");
        }
      } else {
        //only open port if its not already open
        console.log("Not paired.")
      }
    })();
  }, [paired]);

  //useEffect(() => {});



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
