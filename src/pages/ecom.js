import { useContext, useState, useRef } from "react";
import { AppContext } from "@context/AppContext";

import MyHead from "@ui/MyHead";
import Navbar from "@ui/Navbar";
import MenuButton from "@ui/MenuButton";
import AnimationDisplayB from "@ui/AnimationDisplayB";
import Menu from "@ui/Menu";
import MenuNumber from "@ui/MenuNumber";
import MenuRotation from "@ui/MenuRotation";
import MenuArrows from "@ui/MenuArrows";
import Footer from "@ui/Footer";
import React from "react";
import writeToSerial from "@util/writeToSerial";
import StartButton from "components/control/StartButton";
import CameraButton from "components/control/CameraButton";

import ChooseAnglesButton from "components/control/ChooseAnglesButton";


export default function Ecom(props) {
  const { params, setParams, paired } = useContext(AppContext)
  const [selecting, setSelecting] = useState(0)
  //0 = stopped, 1= running, 2= selecting

  /*
    componentDidMount() {
      const startBtn = document.getElementById("start");
      const selectBtn = document.getElementById("select");
      const testBtn = document.getElementById("test");
   
      //add test btn animation
      testBtn.addEventListener("mousedown", (e) => {
        testBtn.classList.add("running");
      });
      document.addEventListener("mouseup", (e) => {
        testBtn.classList.remove("running");
      });
   
      document.querySelectorAll('[find="selectButton"]').forEach((e) => {
        //e.disabled = true;
      });
    }
   
    useEffect(() => {
      const startBtn = document.getElementById("start");
      const selectBtn = document.getElementById("select");
      const testBtn = document.getElementById("test");
      //app logic
      switch (this.state.runningState) {
        case 0:
          //stopped
          writeToSerial(this.props.port, [
            "Fg" + this.props.params.boxValues.join(""),
          ]);
          writeToSerial(this.props.port, "Fh0");
   
          startBtn.classList.remove("running");
          startBtn.classList.remove("disabled");
          startBtn.disabled = false;
          startBtn.innerHTML = "Prendre les photos";
   
          selectBtn.classList.remove("disabled");
          selectBtn.classList.remove("running");
          selectBtn.disabled = false;
   
          testBtn.classList.remove("disabled");
          testBtn.disabled = false;
   
          document.querySelectorAll('[type="menuOption"]').forEach((e) => {
            e.classList.remove("disabled");
            e.disabled = false;
          });
   
          document.querySelectorAll('[find="selectButton"]').forEach((e) => {
            //e.disabled = true;
          });
          break;
        case 1:
          //running
          writeToSerial(this.props.port, "Fh1");
          startBtn.classList.add("running");
          startBtn.innerHTML = "Annuler";
   
          testBtn.classList.add("disabled");
          testBtn.disabled = true;
   
          selectBtn.classList.add("disabled");
          selectBtn.disabled = true;
   
          document.querySelectorAll('[type="menuOption"]').forEach((e) => {
            e.classList.add("disabled");
            e.disabled = true;
          });
   
          document.querySelectorAll('[find="selectButton"]').forEach((e) => {
            //e.disabled = true;
          });
          break;
        case 2:
          selectBtn.classList.add("running");
   
          startBtn.classList.add("disabled");
          startBtn.disabled = true;
   
          testBtn.classList.add("disabled");
          testBtn.disabled = true;
   
          document.querySelectorAll('[find="selectButton"]').forEach((e) => {
            //e.disabled = false;
          });
      }
    })
  */
  return (
    <>
      <MyHead title="Photos E-Commerce"></MyHead>
      {/*
      <Script
        src="/scripts/ecomAnimation.js"
        strategy="afterInteractive"
      ></Script>*/}
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center vw-100 vh-100 ">
        {/**Nav bar */}
        <Navbar>Photo Ecommerce</Navbar>
        {/**Menu and display */}
        <div className="row w-100 h-100 d-flex align-items-evenly justify-content-center">
          {/**Menu */}
          <div className="col w-50 h-75">
            <div className="d-flex flex-column flex-nowrap align-items-center justify-content-center">
              <ChooseAnglesButton selecting={selecting} setSelecting={setSelecting}>
                Choisir les angles
              </ChooseAnglesButton>
              <MenuNumber>Nombre de photos</MenuNumber>
              <MenuNumber>Angle Choisi</MenuNumber>
              <StartButton>
                Prendre les photos
              </StartButton>
              <CameraButton>
                Camera test
              </CameraButton>
              <MenuNumber>Photos realisees</MenuNumber>
              <MenuNumber>Position du plateau</MenuNumber>
              <MenuNumber>Delais des flashes</MenuNumber>
              <MenuRotation>Sens de rotation</MenuRotation>
              <MenuNumber>Vitesse de rotation</MenuNumber>
              <MenuArrows></MenuArrows>
            </div>
          </div>
          {/**Display */}
          <div className="col w-50 h-75 d-flex flex-column justify-content-center align-items-center">
            <div
              id="display"
              className="animation360 position-relative h-50 w-50"
            >

              <AnimationDisplayB
                id="display"

                paired={paired}
                params={params}
                setParams={setParams}
              ></AnimationDisplayB>
            </div>
          </div>
        </div>
        {/**Help button */}
        <Footer path="ecom_aide"></Footer>
      </div >
    </>
  );
}
