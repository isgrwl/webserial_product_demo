//t type: v or f (variable or function)
//l letter: a-f (which variable to act on eg laserAngle, rotationSpeed)
//v val: integer value to set variable to
export default async function (port, instructions) {
  //takes array of instructions
  if (!port.writable?.locked && port.writable) {
    try {
      const textEncoder = new TextEncoderStream();
      const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
      const writer = textEncoder.writable.getWriter();

      //console.log(writer);
      //console.log(formattedInstructions);
      for (let instruction of instructions) {
        console.log("writing..");
        await writer.write(instruction);
      }

      writer.releaseLock();
    } catch (err) {
      console.log(err);
    }
  }
}
/*
function HexArrayToDecimal(s) {
  const nums = s.split(" ");
  return nums.map((n) => {
    return parseInt(n, 16);
  });
}*/




