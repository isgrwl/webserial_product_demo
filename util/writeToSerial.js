//t type: v or f (variable or function)
//l letter: a-f (which variable to act on eg laserAngle, rotationSpeed)
//v val: integer value to set variable to
export default async function (port, instruction) {
  let textEncoder, writableStreamClosed, writer, signals
  //takes array of instructions
  /*setTimeout(() => {
    console.log('hi')
  }, 5000);*/
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

function HexStringToDecimal(s) {
  return s.split(" ").map((n) => {
    return parseInt(n, 16)
  })
}




