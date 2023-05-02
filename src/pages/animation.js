import React, { useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { AppContext } from "@context/AppContext";
import { RunContext } from "@context/RunContext";

import MyHead from "@ui/MyHead";
import Menu from "@ui/Menu";
import MenuButton from "@ui/MenuButton";
import MenuNumber from "@ui/MenuNumber";
import MenuRotation from "@ui/MenuRotation";
import MenuArrows from "@ui/MenuArrows";
import AnimationDisplay from "@ui/AnimationDisplay";
import Footer from "@ui/Footer";
import Navbar from "@ui/Navbar";
import PressButton from "@ui/PressButton";
import StartButton from "components/control/StartButton";
import PauseButton from "components/control/PauseButton";
import CameraButton from "components/control/CameraButton";


export default function Animation(props) {
  const { params } = useContext(AppContext)
  const { runningState } = useContext(RunContext)
  //0=stopped,1=running,2=paused
  const [photosTaken, setPhotosTaken] = React.useState(0);
  const [platformRotation, setPlatformRotation] = React.useState(0);
  const router = useRouter();

  const startBtn = useRef();
  const pauseBtn = useRef();
  const testBtn = useRef();

  //style buttons based on running state, and send commands based on running state
  /*
  useEffect(() => {
    //app logic
    switch (runningState) {
      case 0:
        //stopped
        //writeToSerial(port, ["Fa0"]);
        //writeToSerial(port, ["Fb0"]);
        startBtn.current.classList.remove("running");
        startBtn.current.innerHTML = "Demarrer";

        pauseBtn.current.classList.add("disabled");
        pauseBtn.current.classList.remove("running");
        pauseBtn.current.disabled = true;
        pauseBtn.current.innerHTML = "Pause";

        testBtn.current.classList.remove("disabled");
        testBtn.current.disabled = false;

        break;
      case 1:
        //running
        //writeToSerial(port, ["Fa1"]);
        //writeToSerial(port, ["Fb0"]);
        startBtn.current.classList.add("running");
        startBtn.current.innerHTML = "Annuler";

        pauseBtn.current.classList.remove("disabled");
        pauseBtn.current.classList.remove("running");
        pauseBtn.current.disabled = false;
        pauseBtn.current.innerHTML = "Pause";

        testBtn.current.classList.add("disabled");
        testBtn.current.disabled = true;

        break;
      case 2:
        //paused
        //writeToSerial(port, ["Fb0"]);
        pauseBtn.current.classList.add("running");
        pauseBtn.current.innerHTML = "Redemarrer";
        testBtn.current.classList.remove("disabled");
        testBtn.current.disabled = false;

        break;
    }
  }, [runningState]);
  */

  //listen for page change
  /*
  useEffect(() => {
    router.events.on("routeChangeStart", (url, { shallow }) => {
      console.log(router.pathname);
      if (["/manuel", "/animation", "/ecom"].includes(router.pathname)) {
        console.log("don't leave!\n");
      }
    });
  }, [router]);
  */
  return (
    <>
      <MyHead title="Animation"></MyHead>
      {/*
        <Script
          src="/scripts/360controls.js"
          strategy="afterInteractive"
        ></Script>
      */}
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center vw-100 vh-100 ">
        {/**Nav bar */}
        <Navbar>Prise de vue animation 360</Navbar>
        {/**Menu and display */}
        <div className="row w-100 h-100 d-flex align-items-evenly justify-content-center">
          {/**Menu */}
          <div className="col w-50 h-75">
            <div className="d-flex flex-column flex-nowrap align-items-center justify-content-center">
              {/**Menu buttons */}
              <StartButton>
                Demarrer
              </StartButton>
              <PauseButton
              >
                Pause
              </PauseButton>
              <CameraButton
              >
                Camera Test
              </CameraButton>
              {/**Display params */}
              <MenuNumber val={params.numPhotos}>Photos a faire</MenuNumber>
              <MenuNumber val={photosTaken}>Photos Realisees</MenuNumber>
              <MenuNumber val={platformRotation}>Position du Plateau</MenuNumber>
              <MenuNumber val={params.flashDelay}>
                Delais de Flashes
              </MenuNumber>
              <MenuRotation val={params.rotationDirection}>
                Sens de Rotation
              </MenuRotation>
              <MenuNumber val={params.rotationSpeed}>
                Vitesse de Rotation
              </MenuNumber>
              {/**left/right arrows */}
              <MenuArrows></MenuArrows>
            </div>
          </div>
          {/**Display logo */}
          <div className="col w-50 h-75 d-flex flex-column justify-content-center align-items-center">
            <div
              id="display"
              className="animation360 position-relative h-50 w-50"
            >
              <Image src="/imgs/platformIcon.png" alt="Turn Icon" objectFit="contain" layout="fill" />
            </div>
          </div>
        </div>
        {/**Help button */}
        <Footer path="animation_aide"></Footer>
      </div >
    </>
  );
}
