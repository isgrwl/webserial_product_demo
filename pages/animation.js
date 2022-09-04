import MyHead from "../components/MyHead";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useRef, useCallback, forwardRef } from "react";
import { useRouter } from "next/router";

import Menu from "../components/Menu";
import MenuButton from "../components/MenuButton";
import MenuNumber from "../components/MenuNumber";
import MenuRotation from "../components/MenuRotation";
import MenuArrows from "../components/MenuArrows";
import AnimationDisplay from "../components/AnimationDisplay";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import store from "store2";

import writeToSerial from "../util/writeToSerial";

export default function Animation(props) {
  //0=stopped,1=running,2=paused
  const [runningState, setRunningState] = React.useState(0);
  const [photosTaken, setPhotosTaken] = React.useState(0);
  const [platformRotation, setPlatformRotation] = React.useState(0);
  const router = useRouter();

  const startBtn = useRef();
  const pauseBtn = useRef();
  const testBtn = useRef();

  //switch running state if unpaired
  useEffect(() => {
    setRunningState(0);
  }, [props.paired]);

  useEffect(() => {
    if (props.paired) {
      writeToSerial(props.port, [
        `Va${props.params.numPhotos}`,
        `Vb${props.params.flashDelay}`,
        `Vc${props.params.rotationSpeed}`,
        `Vd${props.params.laserAngle}`,
        `Ve${props.params.laserActive}`,
        `Vf${props.params.rotationDirection}`,
      ]);
    }
  }, [props.port]);

  //style buttons based on running state
  useEffect(() => {
    //app logic
    switch (runningState) {
      case 0:
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
        pauseBtn.current.classList.add("running");
        pauseBtn.current.innerHTML = "Redemarrer";
        testBtn.current.classList.remove("disabled");
        testBtn.current.disabled = false;

        break;
    }
  }, [runningState]);

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
      <div className="container-fluid">
        {/**Nav bar */}
        <Navbar paired={props.paired}>Prise de vue animation 360</Navbar>

        {/**Menu and display */}
        <div className="d-flex justify-content-evenly mt-3">
          {/**Menu */}
          <Menu>
            <MenuButton
              id="start"
              type="click"
              innerRef={startBtn}
              onClick={() => {
                setRunningState(runningState ? 0 : 1);
              }}
            >
              Demarrer
            </MenuButton>
            <MenuButton
              id="pause"
              type="click"
              innerRef={pauseBtn}
              onClick={() => {
                setRunningState(runningState === 1 ? 2 : 1);
              }}
            >
              Pause
            </MenuButton>
            <MenuButton
              id="test"
              type="press"
              innerRef={testBtn}
              onClick={() => {}}
            >
              Camera Test
            </MenuButton>
            <MenuNumber val={props.params.numPhotos}>Photos a faire</MenuNumber>
            <MenuNumber val={photosTaken}>Photos Realisees</MenuNumber>
            <MenuNumber val={platformRotation}>Position du Plateau</MenuNumber>
            <MenuNumber val={props.params.flashDelay}>
              Delais de Flashes
            </MenuNumber>
            <MenuRotation val={props.params.rotationDirection}>
              Sens de Rotation
            </MenuRotation>
            <MenuNumber val={props.params.rotationSpeed}>
              Vitesse de Rotation
            </MenuNumber>
            {/**left/right arrows */}
            <MenuArrows></MenuArrows>
          </Menu>

          {/**Display */}
          <AnimationDisplay>
            <img src="/imgs/download.png" />
          </AnimationDisplay>
        </div>
        {/**Help button */}
        <Footer path="/animation_aide"></Footer>
      </div>
    </>
  );
}
