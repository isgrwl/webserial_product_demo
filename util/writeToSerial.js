export default async function (port, instructions) {
  //takes array of instructions
  if (port.writable) {
    try {
      const textEncoder = new TextEncoderStream();
      const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
      const writer = textEncoder.writable.getWriter();

      console.log(textEncoder);
      for (let i of instructions) {
        await writer.write(i);
        writer.releaseLock();
      }
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
