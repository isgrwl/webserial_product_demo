import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "@context/AppContext";
import { SerialContext } from "@context/SerialContext";

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
import StartButton from "components/control/ToggleButton";
import CameraButton from "components/control/CameraButton";
import RotationArrows from "components/control/RotationArrows";
import ChooseAnglesButton from "components/control/ChooseAnglesButton";
import ToggleButton from "components/control/ToggleButton";
import PressButton from "components/control/PressButton";
import Image from "next/image";
import AnimationDisplay from "@ui/AnimationDisplay";

export default function Ecom(props) {
  const {
    photosTaken,
    platformPosition,
    params,
    setParams,
    appState,
    setAppState,
    appFunctions,
  } = useContext(AppContext);
  const { portOpen, readyToRun } = useContext(SerialContext);
  const [selecting, setSelecting] = useState(0);

  useEffect(() => {
    (async () => {
      if (appState == "ecom") {
        await appFunctions.startEcom();
      } else {
        //cancel running
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

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
              <ChooseAnglesButton
                selecting={selecting}
                setSelecting={setSelecting}
                task="ecom"
                appState={appState}
                portOpen={portOpen}
                readyToRun={readyToRun}
                writeBoxValues={appFunctions.writeEcomAngles}
              >
                {selecting ? "Annuler choisir" : "Choisir les angles"}
              </ChooseAnglesButton>
              <MenuNumber>Nombre de photos</MenuNumber>
              <MenuNumber>Angle Choisi</MenuNumber>
              <ToggleButton
                task="ecom"
                appState={appState}
                setAppState={setAppState}
                readyToRun={readyToRun}
                selecting={selecting}
              >
                Prendre les photos
              </ToggleButton>
              <PressButton
                task="ecom"
                appState={appState}
                portOpen={portOpen}
                readyToRun={readyToRun}
                onClick={appFunctions.cameraTest}
              >
                Camera test
              </PressButton>
              <MenuNumber>Photos realisees</MenuNumber>
              <MenuNumber>Position du plateau</MenuNumber>
              <MenuNumber>Delais des flashes</MenuNumber>
              <MenuRotation>Sens de rotation</MenuRotation>
              <MenuNumber>Vitesse de rotation</MenuNumber>
              <RotationArrows
                arrowFuncs={{
                  leftArrowDown: appFunctions.leftRotationArrowDown,
                  rightArrowDown: appFunctions.rightRotationArrowDown,
                  arrowsUp: appFunctions.rotationArrowsUp,
                }}
                disabled={
                  !(
                    (appState == "" || appState == "ecom") &&
                    portOpen &&
                    readyToRun
                  )
                }
              ></RotationArrows>
            </div>
          </div>
          {/**Display */}
          <div className="col w-50 h-75 d-flex flex-column justify-content-center align-items-center">
            <AnimationDisplay
              rotation={0}
              setBoxVal={(i, v) => {
                setParams((s) => {
                  let boxVals = s.boxValues.split("");
                  boxVals[i] = v;
                  return { ...s, boxValues: boxVals.join("") };
                });
              }}
              boxValues={params.boxValues}
              selecting={!selecting}
            ></AnimationDisplay>
          </div>
        </div>
        {/**Help button */}
        <Footer path="ecom_aide"></Footer>
      </div>
    </>
  );
}
