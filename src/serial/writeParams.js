import sendCommand from "@serial/sendCommand"
import commandMap from "@serial/commandMap"

export async function writeParams(port, params) {
    const paramNames = Object.keys(commandMap.params)
    for (let paramName of paramNames) {
        //console.log("writing instruction: ", instruction)
        await sendCommand(port, formatParam(commandMap.params[paramName], params[paramName]), false)
    }
}

function formatParam(instruction, val) {
    return `${instruction} 71 ${val.toString(16)} 00 00 00 FF FF FF`
}