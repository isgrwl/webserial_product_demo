import { useState, useEffect } from "react";
import MyHead from "../components/MyHead";
import Navbar from "../components/Navbar";

export default function Connection(props) {
  //status is just for the GUI display, props contain connection state of app
  const [status, setStatus] = useState(
    props.paired ? "Paired." : "Not paired."
  );
  useEffect(() => {
    /*const baudRate = 9600;
    const connectBtn = document.getElementById("connectBtn");
    const testBtn = document.getElementById("testBtn");
    */
    //check if web serial is support

    document.getElementById("connectBtn").onclick = async (e) => {
      //check whether WebSerial API is available
      if (!("serial" in navigator)) {
        console.error("WebSerial not supported");
        setStatus("WebSerial API not supported..");
        return;
      }
      console.log("Api supported");

      let availablePorts;
      try {
        //disconnect from all available ports
        availablePorts = await navigator.serial.getPorts();
        await availablePorts.map((port) => {
          return port.forget();
        });

        //start pairing process
        setStatus("Pairing..");
        props.setPaired(0);
        await navigator.serial.requestPort();

        //successful pairing
        props.setPaired(1);
        setStatus("Paired.");

        //loop to handle non-fatal errors
        /*while (port.readable) {
            reader = port.readable.getReader();
            try {
              //loop to listen to data coming from serial device
              while (true) {
                const { value, done } = await reader.read();
                if (done) {
                  ///reader.cancel() has been called
                  break;
                }
                //value is a Uint8Array
                console.log(value);
              }
            } catch (error) {
              //handle reror
              console.log(error);
            } finally {
              reader.releaseLock();
            }
          }*/
        //console.log(JSON.parse(window.localStorage.getItem("port")));
        //await reader.close();
      } catch {
        //unsuccessful pairing
        props.setPaired(0);
        setStatus("Failed to pair.");
      }

      /*
      testBtn.onclick = async (e) => {
        let port;
  
        const ports = await navigator.serial.getPorts();
        port = ports[0];
  
        const writer = port.writable.getWriter();
  
        const data = new Uint8Array([104, 101, 108, 108, 111]); // hello
        await writer.write(data);
  
        // Allow the serial port to be closed later.
        writer.releaseLock();
      };
      */
      /*
      navigator.serial.addEventListener("connect", async (e) => {
        // Connect to `e.target` or add it to a list of available ports.
        //await e.target.open({ baudRate: baudRate });

        if (window.localStorage.getItem("port")) {
          console.log("found port..");
          port = JSON.parse(window.localStorage.getItem("port"));
          await port.open;
        }

        //const ports = await navigator.serial.getPorts();
        //console.log(await navigator.serial.getPorts());
        console.log("Connected: ", e.target);
        const ports = await navigator.serial.getPorts();
        //await ports[0].open({ baudRate: baudRate });
        //console.log("open");
      })
      navigator.serial.addEventListener("disconnect", async (e) => {
        // Remove `e.target` from the list of available ports.
        console.log("Disconnected: ", e.target);

        //   await e.target.close();

        /*navigator.serial.getPorts().then((ports) => {
        // Initialize the list of available ports with `ports` on page load.
        if (ports.length>0) {
          //display ports
          console.log("found accessible ports..")
        } else {
          
        }
      });*/
    };
  }, []);

  return (
    <>
      <MyHead title="Se Connecter à l'appareil"></MyHead>
      <div className="container-fluid">
        <Navbar path="/">Se connecter</Navbar>
      </div>
      <div className="container">
        <div className="d-flex flex-column align-items-center">
          <button id="connectBtn">Connect</button>
          <h1 className="m-5">{status}</h1>
        </div>
      </div>
    </>
  );
}
