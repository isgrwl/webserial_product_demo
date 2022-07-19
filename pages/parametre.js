import MyHead from "../components/MyHead";
import Link from "next/link";
import NavbarB from "../components/NavbarB";
import ParamSlider from "../components/ParamSlider";
import Footer from "../components/Footer";
import ActiveButton from "../components/ActiveButton";
import { useEffect } from "react";
import store from "store2";

export default function Parametre() {
  useEffect(() => {
    if (store("settings_rotationDirection")) {
      document.getElementById("rotationArrow").classList.add("flip");
    }

    if (store("settings_laserActive")) {
      document.getElementById("laserButton").classList.add("running");
    }
  });
  return (
    <>
      <MyHead title="Animation"></MyHead>
      <div className="container-fluid">
        {/**Nav bar */}
        <NavbarB title="Parametres animation 360"></NavbarB>
        {/** Menu and sliders */}
        <div className="mt-3 px-5">
          <ParamSlider id="numPhotos">Choisir Nombre de photos</ParamSlider>
          <ParamSlider id="flashDelay">
            Choisir un delais en secondes pour le recharger les flashes
          </ParamSlider>
          <ParamSlider id="rotationSpeed">
            Choisir la vitesse de rotation
          </ParamSlider>
          <ParamSlider id="laserAngle">
            Choisir l&apos;angle du laser
          </ParamSlider>
        </div>
        {/**Footer */}
        {/**Rotation Button */}
        <div className="d-flex justify-content-evenly align-items-center">
          <div className="position-relative d-flex col-3 align-items-center">
            <span className="">Sens de rotation</span>
            <img
              id="rotationArrow"
              src="/imgs/fleche droite.png"
              onClick={(e) => {
                e.target.classList.toggle("flip");
                store(
                  "settings_rotationDirection",
                  store("settings_rotationDirection") ? 0 : 1
                );
              }}
            />
          </div>
          {/**Enable laser button */}
          <div className="d-flex col-3 align-items-center">
            <span className="">Etat de la croix laser</span>
            <button
              id="laserButton"
              className="activeButton w-25 h-75"
              onClick={(e) => {
                e.target.innerHTML =
                  e.target.innerHTML === "Actif" ? "Inactif" : "Actif";
                e.target.classList.toggle("running");
                store(
                  "settings_laserActive",
                  store("settings_laserActive") ? 0 : 1
                );
              }}
            >
              Inactif
            </button>
          </div>
        </div>
        <Footer path="parametre_aide"></Footer>
      </div>
    </>
  );
}
