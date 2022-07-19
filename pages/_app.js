import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import "../public/styles/globals.css";
import { useState } from "react";
import PairedBox from "../components/PairedBox";

function MyApp({ Component, pageProps }) {
  const [paired, setPaired] = useState(0);

  useEffect(() => {
    (async () => {
      const availablePorts = await navigator.serial.getPorts();
      //console.log(availablePorts);
      if (availablePorts.length > 0) {
        setPaired(1);
      }
    })();

    navigator.serial.addEventListener("connect", (e) => {
      setPaired(1);
      console.log("Connected..");
    });

    navigator.serial.addEventListener("disconnect", (e) => {
      setPaired(0);
      console.log("Disconnected..");
    });
  }, [paired]);

  return (
    <>
      <PairedBox paired={paired}></PairedBox>
      <Component {...pageProps} paired={paired} setPaired={setPaired} />
    </>
  );
}

export default MyApp;
