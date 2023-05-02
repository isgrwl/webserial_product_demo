import { useState, useEffect, useContext } from "react";
import { AppContext } from "@context/AppContext";
import MyHead from "@ui/MyHead";
import Navbar from "@ui/Navbar";
import style from "css/modules/Buttons.module.sass"

export default function Connection(props) {
  const { paired, setPaired, port, setPort } = useContext(AppContext)
  //status is just for the GUI display, props contain connection state of app
  const [status, setStatus] = useState(

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
        console.error("WebSerial not supported on this device");
        setStatus("WebSerial API is not supported in this browser");
        return;
      }

      try {
        //disconnect from all available ports
        const availablePorts = await navigator.serial.getPorts();
        await availablePorts.map((port) => {
          return port.forget();
        });

        //start pairing process
        setStatus("Pairing..");
        setPaired(0);
        const newPort = await navigator.serial.requestPort();

        //successful pairing
        setPaired(1);
        setPort(newPort);
        setStatus("Paired.");

      } catch {
        //unsuccessful pairing
        setPaired(0);
        setPort(null);
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
  }, [paired, port]);

  return (
    <>
      <MyHead title="Se Connecter à l'appareil"></MyHead>
      <div className="w-100 vh-100 d-flex flex-column align-items-center justify-content-center">
        <Navbar path="/">Se Connecter</Navbar>
        <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
          <button className={`${style.activeButton}`} id="connectBtn">Connect</button>
          <h1 className="m-5">{paired ? "Paired." : "Not paired."}</h1>
        </div>
      </div >
    </>
  );
}
