import MyHead from "../components/MyHead";
import Link from "next/link";
import NavbarB from "../components/NavbarB";
import ParamSlider from "../components/ParamSlider";
import Footer from "../components/Footer";
import ParamLaser from "../components/ParamLaser";

import { useEffect, useState } from "react";
import store from "store2";
import ParamRotation from "../components/ParamRotation";

export default function Parametre(props) {
  return (
    <>
      <MyHead title="Animation"></MyHead>
      <div className="container-fluid">
        {/**Nav bar */}
        <NavbarB title="Parametres animation 360"></NavbarB>
        {/** Menu and sliders */}
        <div className="mt-3 px-5">
          <ParamSlider
            id="numPhotos"
            min={24}
            max={120}
            setState={props.setParams}
            val={props.params.numPhotos}
          >
            Choisir Nombre de photos
          </ParamSlider>
          <ParamSlider
            id="flashDelay"
            min={0}
            max={10}
            setState={props.setParams}
            val={props.params.flashDelay}
          >
            Choisir un delais en secondes pour le recharger les flashes
          </ParamSlider>
          <ParamSlider
            id="rotationSpeed"
            min={1}
            max={5}
            setState={props.setParams}
            val={props.params.rotationSpeed}
          >
            Choisir la vitesse de rotation
          </ParamSlider>
          <ParamSlider
            id="laserAngle"
            min={0}
            max={90}
            setState={props.setParams}
            val={props.params.laserAngle}
          >
            Choisir l&apos;angle du laser
          </ParamSlider>
        </div>
        {/**Footer */}

        <div className="d-flex justify-content-evenly align-items-center">
          {/**Rotation Button */}
          <ParamRotation
            id="rotationDirection"
            setState={props.setParams}
            val={props.params.rotationDirection}
          ></ParamRotation>
          {/**Enable laser button */}
          <ParamLaser
            id="laserActive"
            setState={props.setParams}
            val={props.params.laserActive}
          ></ParamLaser>
        </div>
        <Footer path="parametre_aide"></Footer>
      </div>
    </>
  );
}
