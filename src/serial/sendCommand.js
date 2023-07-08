
/**
 * 
 * Write command and wait for response from MCU
 * 
 */

export default async function sendCommand(port, command, shouldWait) {
    await writeData(port, command)

    const value = await readData(port, shouldWait)
    console.log("Response: ", value)

    await new Promise(res => setTimeout(res, 400))
    return value;
}

/**
 * 
 * Read Data from the MCU until there is a specific response based on shouldWait
 * 
 */

async function readData(port, shouldWait) {
    let val = "";
    if (port.readable) {
        const reader = port.readable.getReader();
        try {
            while (true) {
                console.log("Reading...")
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                val += new TextDecoder().decode(value);
                if (shouldWait) {
                    if (val.includes("tmReset.en=1")) break;
                } else {
                    if (val.includes("���"))
                        break;
                }
            }
        } catch (err) {
            console.log(err)
        } finally {
            reader.releaseLock();
        }
    }


    return val;
}

/**
 * 
 * Write data to MCU
 * 
 */

async function writeData(port, data) {
    const writer = port.writable?.getWriter();
    try {
        await writer.write(formatInstruction(data));
    } catch (err) {
        console.log(err)
    } finally {
        writer.releaseLock()
        console.log("Done Writing: ", data)
    }



}

//return uint8Array of the hex numbers
function formatInstruction(instruction) {
    return new Uint8Array(HexStringToDecimal(instruction))
}

function HexStringToDecimal(s) {
    return s.split(" ").map((n) => {
        return parseInt(n, 16)
    })
}

