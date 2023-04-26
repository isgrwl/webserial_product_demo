import writeToSerial from "./writeToSerial"

export default async function (port, params) {
    await writeToSerial(port, `23 02 54 29 71 ${parseInt(params.flashDelay, 16)} 00 00 00 FF FF FF`)
    await writeToSerial(port, `23 02 54 2A 71 ${parseInt(params.rotationSpeed, 16)} 00 00 00 FF FF FF`)
    await writeToSerial(port, `23 02 54 2B 71 ${parseInt(params.laserAngle, 16)} 00 00 00 FF FF FF`)
    await writeToSerial(port, `23 02 54 2D 71 ${parseInt(params.laserActive, 16)} 00 00 00 FF FF FF`)
    await writeToSerial(port, `23 02 54 2C 71 ${parseInt(params.rotationDirection, 16)} 00 00 00 FF FF FF`)
}