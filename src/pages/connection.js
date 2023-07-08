import { useState, useEffect, useContext } from "react";
import { AppContext, SerialContext } from "@context/SerialContext";
import MyHead from "@ui/MyHead";
import Navbar from "@ui/Navbar";
import style from "css/modules/Buttons.module.sass"

export default function Connection(props) {
  const { portOpen, connect } = useContext(SerialContext)
  //message is just for the GUI display, props contain connection state of app
  const [message, setMessage] = useState("");
  useEffect(() => {
    //check if web serial is supported
    /*if (!("serial" in navigator)) {
      setMessage("WebSerial API is not supported in this browser");
      return;
    }*/

    document.getElementById("connectBtn").onclick = connect;
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MyHead title="Se Connecter à l'appareil"></MyHead>
      <div className="w-100 vh-100 d-flex flex-column align-items-center justify-content-center">
        <Navbar path="/">Se Connecter</Navbar>
        <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
          <button className={`${style.activeButton}`} id="connectBtn">Connect</button>
          <h1 className="m-5">{portOpen ? "Paired." : "Not paired."}</h1>
        </div>
      </div >
    </>
  );
}
