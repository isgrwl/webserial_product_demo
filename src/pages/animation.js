import React, { useEffect, useRef, useContext, useState } from "react";

import { AppContext } from "@context/AppContext";
import { SerialContext } from "@context/SerialContext";

import Image from "next/image";
import MyHead from "@ui/MyHead";
import Menu from "@ui/Menu";
import MenuButton from "@ui/MenuButton";
import MenuNumber from "@ui/MenuNumber";
import MenuRotation from "@ui/MenuRotation";
import MenuArrows from "@ui/MenuArrows";
import AnimationDisplay from "@ui/AnimationDisplay";
import Footer from "@ui/Footer";
import Navbar from "@ui/Navbar";
import PressButton from "components/control/PressButton";
import PauseButton from "components/control/PauseButton";
import CameraButton from "components/control/CameraButton";
import RotationArrows from "components/control/RotationArrows";
import ToggleButton from "components/control/ToggleButton";

export default function Animation(props) {
  const {
    photosTaken,
    platformPosition,
    params,
    appState,
    setAppState,
    appFunctions,
  } = useContext(AppContext);
  const { portOpen, readyToRun } = useContext(SerialContext);

  useEffect(() => {
    (async () => {
      if (appState == "360") {
        await appFunctions.start360();
      } else {
        //cancel running
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  return (
    <>
      <MyHead title="Animation"></MyHead>
      {/*Main container*/}
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center vw-100 vh-100 ">
        {/**Nav bar */}
        <Navbar>Prise de vue animation 360</Navbar>
        {/**Menu and display */}
        <div className="row w-100 h-100 d-flex align-items-evenly justify-content-center">
          {/**Menu */}
          <div className="col w-50 h-75">
            <div className="d-flex flex-column flex-nowrap align-items-center justify-content-center">
              {/**Menu buttons */}
              <ToggleButton
                task="360"
                appState={appState}
                setAppState={setAppState}
                portOpen={portOpen}
                readyToRun={readyToRun}
              >
                Demarrer
              </ToggleButton>
              <PressButton
                task="360"
                appState={appState}
                setAppState={setAppState}
                portOpen={portOpen}
                readyToRun={readyToRun}
                onClick={null}
              >
                Pause
              </PressButton>
              <PressButton
                task="360"
                appState={appState}
                portOpen={portOpen}
                readyToRun={readyToRun}
                onClick={appFunctions.cameraTest}
              >
                Camera Test
              </PressButton>
              {/**Display params */}
              <MenuNumber
                val={
                  [24, 30, 36, 40, 45, 60, 90, 120][params.numPhotos] -
                  (appState == "360" ? photosTaken : 0)
                }
              >
                Photos a faire
              </MenuNumber>
              <MenuNumber val={appState == "360" ? photosTaken : 0}>
                Photos Realisees
              </MenuNumber>
              <MenuNumber val={appState == "360" ? platformPosition : 0}>
                Position du Plateau
              </MenuNumber>
              <MenuNumber val={params.flashDelay}>Delais de Flashes</MenuNumber>
              <MenuRotation val={params.rotationDirection}>
                Sens de Rotation
              </MenuRotation>
              <MenuNumber val={params.rotationSpeed}>
                Vitesse de Rotation
              </MenuNumber>
              {/**left/right arrows */}
              <RotationArrows
                arrowFuncs={{
                  leftArrowDown: appFunctions.leftRotationArrowDown,
                  rightArrowDown: appFunctions.rightRotationArrowDown,
                  arrowsUp: appFunctions.rotationArrowsUp,
                }}
                disabled={
                  !(
                    (appState == "" || appState == "360") &&
                    portOpen &&
                    readyToRun
                  )
                }
              ></RotationArrows>
            </div>
          </div>
          {/**Display logo */}
          <div className="col w-50 h-75 d-flex flex-column justify-content-center align-items-center">
            <div
              id="display"
              className="animation360 position-relative h-50 w-50"
            >
              <Image
                style={{ transform: `rotate(${platformPosition}deg)` }}
                src="/imgs/platformIcon.png"
                alt="Turn Icon"
                objectFit="contain"
                layout="fill"
              />
            </div>
          </div>
        </div>
        {/**Help button */}
        <Footer path="animation_aide"></Footer>
      </div>
    </>
  );
}
