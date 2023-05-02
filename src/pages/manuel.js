import { useEffect } from "react";

import Link from "next/link";
import Script from "next/script";

import MyHead from "@ui/MyHead";
import MenuButton from "@ui/MenuButton";
import MenuNumber from "@ui/MenuNumber";
import MenuRotation from "@ui/MenuRotation";
import MenuArrows from "@ui/MenuArrows";
import AnimationDisplay from "@ui/AnimationDisplay";
import Footer from "@ui/Footer";
import Navbar from "@ui/Navbar";
import store from "store2";
import Image
  from "next/image";
import writeToSerial from "@util/writeToSerial";
import StartButton from "components/control/StartButton";
import PauseButton from "components/control/PauseButton";
import CameraButton from "components/control/CameraButton";
import TurnPosButton from "components/control/TurnPosButton";

export default function Manuel(props) {
  useEffect(() => {
    //add button press animation
    document.querySelectorAll(".navButton").forEach((b) => {
      b.addEventListener("mousedown", (e) => {
        b.classList.add("running");
      });
      document.addEventListener("mouseup", (e) => {
        b.classList.remove("running");
      });
    });
  }, []);

  return (
    <>
      <MyHead title="Photos E-Commerce"></MyHead>
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center vw-100 vh-100 ">
        {/**Nav bar */}
        <Navbar>Mode Manuel TODO</Navbar>
        {/**Menu and display */}
        <div className="row w-100 h-100 d-flex align-items-evenly justify-content-center">
          {/**Menu */}
          <div className="col w-50 h-75">
            <div className="d-flex flex-column flex-nowrap align-items-center justify-content-center">


              <StartButton
              >
                Tourner une position
              </StartButton>
              <CameraButton
              >
                Camera
              </CameraButton>
              <PauseButton
              >
                Annuler
              </PauseButton>
              <MenuNumber val={store(0)}>Positions a faire</MenuNumber>
              <MenuNumber val={0}>Position du Plateau</MenuNumber>
              <MenuNumber val={store("settings_numPhotos")}>
                Photos realisees
              </MenuNumber>
              <MenuNumber val={store("settings_flashDelay")}>
                Delais de flashes
              </MenuNumber>
              <MenuRotation>Sens de rotation</MenuRotation>
              <MenuNumber val={store("settings_rotationSpeed")}>
                Vitesse de rotation
              </MenuNumber>
              {/**left/right arrows */}
              <MenuArrows></MenuArrows>
            </div></div>
          {/**Display */}
          <div className="col w-50 h-75 d-flex flex-column justify-content-center align-items-center">
            <div
              id="display"
              className="animation360 position-relative h-50 w-50"
            >
              <AnimationDisplay>
                <Image src="/imgs/platformIcon.png" alt="Turn Icon" objectFit="contain" layout="fill" />
              </AnimationDisplay>
            </div>
          </div>
        </div>
        {/**Help button */}
        <Footer path="manuel_aide"></Footer>
      </div>
    </>
  );
}
