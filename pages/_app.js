import "bootstrap/dist/css/bootstrap.css";
import "../public/styles/globals.css";
import { useState, useEffect, createContext } from "react";
import PairedBox from "../components/PairedBox";
import store from "store2";
import { stringifyQuery } from "next/dist/server/server-route-utils";

function MyApp({ Component, pageProps }) {
  const [paired, setPaired] = useState(0);
  const [params, setParams] = useState({
    numPhotos: store("numPhotos") || 0,
    laserActive: store("laserActive") || 0,
    laserAngle: store("laserAngle") || 0,
    flashDelay: store("flashDelay") || 0,
    rotationDirection: store("rotationDirection") || 0,
    rotationSpeed: store("rotationSpeed") || 0,
    boxValues: store("boxValues") || new Array(24).fill(0),
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

            while (ports[0].readable) {
              const textDecoder = new TextDecoderStream();
              const readableStreamClosed = ports[0].readable.pipeTo(
                textDecoder.writable
              );
              const reader = textDecoder.readable.getReader();
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
                    if (value == "OK") {
                      console.log("read next now");
                    }
                    /*console.log(
                      value.map((s) => {
                        //return String.fromCharCode(s);
                      })
                    );*/
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
            //reader.releaseLock();
          }
        } else {
          console.log("Port is already open");
        }
      } else {
        //only open port if its not already open
      }
    })();
  }, [paired]);

  //useEffect(() => {});

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
