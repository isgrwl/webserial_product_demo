//t type: v or f (variable or function)
//l letter: a-f (which variable to act on eg laserAngle, rotationSpeed)
//v val: integer value to set variable to
/*async function writeToSerial(port, instruction) {
  let textEncoder, writableStreamClosed, writer, signals
  //takes array of instructions
  if (port.readable?.locked) {
    if (!port.writable?.locked && port.writable) {
      try {
        //write hex digits passed to arduino as decimal
        writer = port.writable.getWriter();
        console.log(HexStringToDecimal(instruction))
        await writer.write(new Uint8Array(HexStringToDecimal(instruction)));
        writer.releaseLock()
      }
      catch (err) {
        console.log(err);
      }
    } else {
      console.log("cant write")
    }
  }


}
*/

import { AppContext } from "@context/AppContext"
import { RunContext } from "@context/RunContext"
import { useContext } from "react"

export default async function writeInstructions(port, writer, keepWriting, instructions) {
  for (let instruction of instructions) {
    try {
      console.log("Writing: ", instruction)
      console.log(HexStringToDecimal(instruction))
      console.log(new Uint8Array(HexStringToDecimal(instruction)))
      await writer.current.write(new Uint8Array(instruction));
    } catch (err) {
      console.log(err)
    }
  }
  writer.current.releaseLock()
  console.log("Done writing.")
}

function HexStringToDecimal(s) {
  return s.split(" ").map((n) => {
    return parseInt(n, 16)
  })
}
