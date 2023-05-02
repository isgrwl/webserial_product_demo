import SelectBox from "./SelectBox";
import React, { useEffect } from "react";
import Image from "next/image";

export default function AnimationDisplay(props) {
  return (
    <div
      id="display"
      className="animation360 d-flex justify-content-center align-items-center position-relative h-100 w-100"
    >
      <Image src="/imgs/platformIcon.png" alt="Turn Icon" objectFit="contain" layout="fill" />
    </div>
  );
}
