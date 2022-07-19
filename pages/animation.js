import MyHead from "../components/MyHead";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect } from "react";

import Menu from "../components/Menu";
import MenuButton from "../components/MenuButton";
import MenuNumber from "../components/MenuNumber";
import MenuRotation from "../components/MenuRotation";
import MenuArrows from "../components/MenuArrows";
import AnimationDisplay from "../components/AnimationDisplay";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import writeToSerial from "../util/writeToSerial";

export default function Animation(props) {
  //0=stopped,1=running,2=paused
  const [runningState, setRunningState] = React.useState(props.paired);

  useEffect(() => {
    if (!props.paired) setRunningState(0);
    /*window.onbeforeunload = () => {
      return "";
    };*/

    const startBtn = document.getElementById("start");
    const pauseBtn = document.getElementById("pause");
    const testBtn = document.getElementById("test");

    //add button press animation
    testBtn.addEventListener("mousedown", (e) => {
      testBtn.classList.add("running");
    });
    document.addEventListener("mouseup", (e) => {
      testBtn.classList.remove("running");
    });

    //app logic
    switch (runningState) {
      case 0:
        startBtn.classList.remove("running");
        startBtn.innerHTML = "Demarrer";

        pauseBtn.classList.add("disabled");
        pauseBtn.classList.remove("running");
        pauseBtn.disabled = true;
        pauseBtn.innerHTML = "Pause";

        testBtn.classList.remove("disabled");
        testBtn.disabled = false;

        document.querySelectorAll('[type="menuOption"]').forEach((e) => {
          e.classList.remove("disabled");
          e.disabled = false;
        });

        break;
      case 1:
        startBtn.classList.add("running");
        startBtn.innerHTML = "Annuler";

        pauseBtn.classList.remove("disabled");
        pauseBtn.classList.remove("running");
        pauseBtn.disabled = false;
        pauseBtn.innerHTML = "Pause";

        testBtn.classList.add("disabled");
        testBtn.disabled = true;

        document.querySelectorAll('[type="menuOption"]').forEach((e) => {
          e.classList.add("disabled");
          e.disabled = true;
        });
        break;
      case 2:
        pauseBtn.classList.add("running");
        pauseBtn.innerHTML = "Redemarrer";
        testBtn.classList.remove("disabled");
        testBtn.disabled = false;

        break;
    }
  }, [runningState, props.paired]);

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
        <Navbar>Prise de vue animation 360</Navbar>

        {/**Menu and display */}
        <div className="d-flex justify-content-evenly mt-3">
          {/**Menu */}
          <Menu>
            <MenuButton
              id="start"
              onClick={() => {
                if (props.paired) {
                  writeToSerial("23 02 54 09");
                  setRunningState(runningState === 0 ? 1 : 0);
                }
              }}
            >
              Demarrer
            </MenuButton>
            <MenuButton
              id="pause"
              onClick={() => {
                if (props.paired) {
                  writeToSerial("23 02 54 09");
                  setRunningState(runningState === 1 ? 2 : 1);
                }
              }}
            >
              Pause
            </MenuButton>
            <MenuButton
              id="test"
              onClick={() => {
                if (props.paired) {
                  writeToSerial("23 02 54 09");
                }
              }}
            >
              Camera Test
            </MenuButton>
            <MenuNumber>Photos a faire</MenuNumber>
            <MenuNumber>Photos Realisees</MenuNumber>
            <MenuNumber>Position du Plateau</MenuNumber>
            <MenuNumber>Delais de Flashes</MenuNumber>
            <MenuRotation>Sens de Rotation</MenuRotation>
            <MenuNumber>Vitesse de Rotation</MenuNumber>
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
