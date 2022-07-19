import MyHead from "../components/MyHead";
import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

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
      {/* <Script
        src="/scripts/ecomAnimation.js"
        strategy="afterInteractive"
  ></Script>*/}
      <div className="container-fluid">
        {/**Nav bar */}
        <Navbar>Mode Manuel</Navbar>
        {/**Menu and display */}
        <div className="d-flex justify-content-evenly mt-3">
          {/**Menu */}
          <Menu>
            <MenuButton
              onClick={() => {
                if (props.paired) {
                  writeToSerial("23 02 54 0F");
                }
              }}
            >
              Tourner une position
            </MenuButton>
            <MenuButton
              onClick={() => {
                if (props.paired) {
                  writeToSerial("23 02 54 11");
                }
              }}
            >
              Camera
            </MenuButton>
            <MenuButton
              onClick={() => {
                if (props.paired) {
                  writeToSerial("23 02 54 10");
                }
              }}
            >
              Annuler
            </MenuButton>
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
          </Menu>
          {/**Display */}
          <AnimationDisplay>
            <img id="animationImg" src="/imgs/download.png" />
          </AnimationDisplay>
        </div>
        {/**Help button */}
        <Footer path="manuel_aide"></Footer>
      </div>
    </>
  );
}
