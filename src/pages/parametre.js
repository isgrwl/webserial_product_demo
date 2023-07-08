import { useEffect, useState, useContext } from "react";
import store from "store2";

import MyHead from "@ui/MyHead";
import Link from "next/link";
import ParamsNavbar from "@ui/ParamsNavbar";
import ParamSlider from "@ui/ParamSlider";
import Footer from "@ui/Footer";
import ParamLaser from "@ui/ParamLaser";
import ParamRotation from "@ui/ParamRotation";

import { AppContext } from "@context/AppContext";

export default function Parametre(props) {
  const { appFunctions, appState } = useContext(AppContext);
  return (
    <>
      <MyHead title="Animation"></MyHead>
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center vw-100 vh-100 ">
        {/**Nav bar */}
        <ParamsNavbar>Parametres animation 360</ParamsNavbar>

        {/** Menu and sliders */}
        <div className="row d-flex flex-column w-100 h-75">
          <ParamSlider
            id="numPhotos"
            min={0}
            max={7}
            updateParam={appFunctions.writeNumPhotos}
            appState={appState}
            values={[24,30,36,40,45,60,90,120]}
          >
            Choisir Nombre de photos
          </ParamSlider>
          <ParamSlider
            id="flashDelay"
            min={0}
            max={10}
            updateParam={appFunctions.writeFlashDelay}
            appState={appState}
          >
            Choisir un delais en secondes pour le recharger les flashes
          </ParamSlider>
          <ParamSlider
            id="rotationSpeed"
            min={1}
            max={5}
            updateParam={appFunctions.writeRotationSpeed}
            appState={appState}
          >
            Choisir la vitesse de rotation
          </ParamSlider>
          <ParamSlider
            id="laserAngle"
            min={0}
            max={90}
            updateParam={appFunctions.writeLaserAngle}
            appState={appState}
          >
            Choisir l&apos;angle du laser
          </ParamSlider>
          <div className="d-flex justify-content-between  salign-items-center w-100">
            {/**Rotation Button */}
            <ParamRotation
              id="rotationDirection"
              updateParam={appFunctions.writeRotationDirection}
              disabled={appState!=""}
            ></ParamRotation>
            {/**Enable laser button */}
            <ParamLaser
              id="laserActive"
              updateParam={appFunctions.writeLaserActive}
              appState={appState}
            ></ParamLaser>
          </div>
        </div>
        {/**Footer */}
        <Footer path="parametre_aide"></Footer>
      </div>
    </>
  );
}
