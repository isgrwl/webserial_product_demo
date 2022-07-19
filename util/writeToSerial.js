export default async function (s) {
  try {
    const ports = await navigator.serial.getPorts();

    if (ports.length > 0) {
      const port = ports[0];
      await port.open({ baudRate: 9600 });
      const writer = port.writable.getWriter();

      const data = new Uint8Array(HexArrayToDecimal(s));
      await writer.write(data);

      writer.releaseLock();
      await port.close();
    } else {
      throw new Error("No port available");
    }
  } catch (err) {
    console.log(err);
  }
}

function HexArrayToDecimal(s) {
  const nums = s.split(" ");
  return nums.map((n) => {
    return parseInt(n, 16);
  });
}
