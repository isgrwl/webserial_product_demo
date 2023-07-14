import { useContext, useEffect } from "react";

import MyHead from "@ui/MyHead";
import MenuButton from "@ui/MenuButton";
import MenuNumber from "@ui/MenuNumber";
import MenuRotation from "@ui/MenuRotation";
import MenuArrows from "@ui/MenuArrows";
import AnimationDisplay from "@ui/AnimationDisplay";
import Footer from "@ui/Footer";
import Navbar from "@ui/Navbar";
import store from "store2";
import Image from "next/image";
import StartButton from "components/control/ToggleButton";
import PauseButton from "components/control/PauseButton";
import CameraButton from "components/control/CameraButton";
import PressButton from "components/control/PressButton";
import { AppContext } from "@context/AppContext";
import { SerialContext } from "@context/SerialContext";
import RotationArrows from "components/control/RotationArrows";

export default function Manuel(props) {
  const {
    photosTaken,
    platformPosition,
    params,
    appState,
    setAppState,
    appFunctions,
  } = useContext(AppContext);
  const { portOpen, readyToRun } = useContext(SerialContext);

  return (
    <>
      <MyHead title="Photos E-Commerce"></MyHead>
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center vw-100 vh-100 ">
        {/**Nav bar */}
        <Navbar>Mode Manuel</Navbar>
        {/**Menu and display */}
        <div className="row w-100 h-100 d-flex align-items-evenly justify-content-center">
          {/**Menu */}
          <div className="col w-50 h-75">
            <div className="d-flex flex-column flex-nowrap align-items-center justify-content-center">
              <PressButton
                task="manual"
                appState={appState}
                setAppState={setAppState}
                portOpen={portOpen}
                readyToRun={readyToRun}
                onClick={appFunctions.turnManual}
              >
                Tourner une position
              </PressButton>
              <PressButton
                task="manual"
                appState={appState}
                setAppState={setAppState}
                portOpen={portOpen}
                readyToRun={readyToRun}
                onClick={appFunctions.cameraManual}
              >
                Camera
              </PressButton>
              <PressButton
                task="manual"
                appState={appState}
                setAppState={setAppState}
                portOpen={portOpen}
                readyToRun={readyToRun}
                onClick={appFunctions.cancelManual}
              >
                Annuler
              </PressButton>
              <MenuNumber
                val={
                  [24, 30, 36, 40, 45, 60, 90, 120][params.numPhotos] -
                  (appState == "manual" ? photosTaken : 0)
                }
              >
                Positions a faire
              </MenuNumber>
              <MenuNumber val={appState == "manual" ? platformPosition : 0}>
                Position du Plateau
              </MenuNumber>
              <MenuNumber val={appState == "manual" ? photosTaken : 0}>
                Photos realisees
              </MenuNumber>
              <MenuNumber val={params.flashDelay}>Delais de flashes</MenuNumber>
              <MenuRotation>Sens de rotation</MenuRotation>
              <MenuNumber val={params.rotationSpeed}>
                Vitesse de rotation
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
                    (appState == "" || appState == "manual") &&
                    portOpen &&
                    readyToRun
                  )
                }
              ></RotationArrows>
            </div>
          </div>
          {/**Display */}
          <div className="col w-50 h-75 d-flex flex-column justify-content-center align-items-center">
            <div
              id="display"
              className="animation360 position-relative h-50 w-50"
            >
              <Image
                src="/imgs/platformIcon.png"
                alt="Turn Icon"
                objectFit="contain"
                layout="fill"
              />
            </div>
          </div>
        </div>
        {/**Help button */}
        <Footer path="manuel_aide"></Footer>
      </div>
    </>
  );
}
