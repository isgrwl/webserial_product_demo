import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/AppContext";
import { RunContext } from "@context/RunContext";

function PairedBox(props) {
  const m = {
    0: {
      color: "red",
      text: "Not Paired"
    },
    1: {
      color: "green",
      text: "Paired"
    }
  }

  return (
    <div
      className="pairedBox px-2 py-1 text-center"
      style={{ backgroundColor: m[props.p].color, color: "white", border: "1px solid black" }}
    >
      {m[props.p].text}
    </div>
  )
}

function RunningBox(props) {
  const m = {
    0: {
      text: "Stopped",
      bg: "green"
    },
    1: {
      text: "Running",
      bg: "red"
    },
    2: {
      text: "Paused",
      bg: "#baa202"
    }
  }

  return (
    <div className="px-2 py-1 text-center" style={{ backgroundColor: m[props.r].bg, color: "white", border: "1px solid black" }}>
      {m[props.r].text}
    </div>
  )
}

export default function StatusBar(props) {
  const { paired } = useContext(AppContext)
  const { runningState } = useContext(RunContext)
  return (
    <div className="d-flex position-absolute w-100 gap-1">
      <PairedBox p={paired}></PairedBox>
      <RunningBox r={runningState}></RunningBox>
      <div className="flex-fill px-2 py-1" >
        <div style={{ color: "red", fontWeight: "bold" }}>
          {paired ? "" : "Please pair your device in the connect section"}
        </div>
      </div >
    </div >
  );
}
