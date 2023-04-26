import MyHead from "../components/MyHead";
import Link from "next/link";
import Script from "next/script";

import Navbar from "../components/Navbar";
import MenuButton from "../components/MenuButton";
import AnimationDisplayB from "../components/AnimationDisplayB";
import Menu from "../components/Menu";
import MenuNumber from "../components/MenuNumber";
import MenuRotation from "../components/MenuRotation";
import MenuArrows from "../components/MenuArrows";
import Footer from "../components/Footer";
import React from "react";
import { useRef } from "react";
import writeToSerial from "../util/writeToSerial";

export default class Ecom extends React.Component {
  //0 = stopped, 1= running, 2= selecting
  constructor() {
    super();
    this.state = { runningState: 0 };
    this.display = React.createRef();
  }

  componentDidMount() {
    const startBtn = document.getElementById("start");
    const selectBtn = document.getElementById("select");
    const testBtn = document.getElementById("test");

    //add test btn animation
    testBtn.addEventListener("mousedown", (e) => {
      testBtn.classList.add("running");
    });
    document.addEventListener("mouseup", (e) => {
      testBtn.classList.remove("running");
    });

    document.querySelectorAll('[find="selectButton"]').forEach((e) => {
      //e.disabled = true;
    });
  }

  componentDidUpdate() {
    const startBtn = document.getElementById("start");
    const selectBtn = document.getElementById("select");
    const testBtn = document.getElementById("test");
    //app logic
    switch (this.state.runningState) {
      case 0:
        //stopped
        writeToSerial(this.props.port, [
          "Fg" + this.props.params.boxValues.join(""),
        ]);
        writeToSerial(this.props.port, "Fh0");

        startBtn.classList.remove("running");
        startBtn.classList.remove("disabled");
        startBtn.disabled = false;
        startBtn.innerHTML = "Prendre les photos";

        selectBtn.classList.remove("disabled");
        selectBtn.classList.remove("running");
        selectBtn.disabled = false;

        testBtn.classList.remove("disabled");
        testBtn.disabled = false;

        document.querySelectorAll('[type="menuOption"]').forEach((e) => {
          e.classList.remove("disabled");
          e.disabled = false;
        });

        document.querySelectorAll('[find="selectButton"]').forEach((e) => {
          //e.disabled = true;
        });
        break;
      case 1:
        //running
        writeToSerial(this.props.port, "Fh1");
        startBtn.classList.add("running");
        startBtn.innerHTML = "Annuler";

        testBtn.classList.add("disabled");
        testBtn.disabled = true;

        selectBtn.classList.add("disabled");
        selectBtn.disabled = true;

        document.querySelectorAll('[type="menuOption"]').forEach((e) => {
          e.classList.add("disabled");
          e.disabled = true;
        });

        document.querySelectorAll('[find="selectButton"]').forEach((e) => {
          //e.disabled = true;
        });
        break;
      case 2:
        selectBtn.classList.add("running");

        startBtn.classList.add("disabled");
        startBtn.disabled = true;

        testBtn.classList.add("disabled");
        testBtn.disabled = true;

        document.querySelectorAll('[find="selectButton"]').forEach((e) => {
          //e.disabled = false;
        });
    }
  }
  render() {
    return (
      <>
        <MyHead title="Photos E-Commerce"></MyHead>
        {/*
      <Script
        src="/scripts/ecomAnimation.js"
        strategy="afterInteractive"
      ></Script>*/}
        <div className="container-fluid">
          {/**Nav bar */}
          <Navbar>Photo Ecommerce</Navbar>
          {/**Menu and display */}
          <div className="d-flex justify-content-evenly mt-3">
            {/**Menu */}
            <Menu>
              <MenuButton
                id="select"
                onClick={() => {
                  this.setState({
                    runningState: this.state.runningState === 2 ? 0 : 2,
                  });
                }}
              >
                Choisir les angles
              </MenuButton>
              <MenuNumber>Nombre de photos</MenuNumber>
              <MenuNumber>Angle Choisi</MenuNumber>
              <MenuButton
                id="start"
                onClick={() => {
                  this.setState({
                    runningState: this.state.runningState === 1 ? 0 : 1,
                  });
                  
                }}
              >
                Prendre les photos
              </MenuButton>
              <MenuButton
                id="test"
                onClick={() => {
                  writeToSerial(props.port, "23 02 54 0D");
                }}
              >
                Camera test
              </MenuButton>
              <MenuNumber>Photos realisees</MenuNumber>
              <MenuNumber>Position du plateau</MenuNumber>
              <MenuNumber>Delais des flashes</MenuNumber>
              <MenuRotation>Sens de rotation</MenuRotation>
              <MenuNumber>Vitesse de rotation</MenuNumber>
              <MenuArrows></MenuArrows>
            </Menu>
            {/**Display */}
            <AnimationDisplayB
              id="display"
              enable={this.state.runningState}
              paired={this.props.paired}
              params={this.props.params}
              setParams={this.props.setParams}
            ></AnimationDisplayB>
          </div>
          {/**Help button */}
          <Footer path="ecom_aide"></Footer>
        </div>
      </>
    );
  }
}
