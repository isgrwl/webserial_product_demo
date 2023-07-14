import React, { createContext, useState, useEffect, useRef } from "react";
import commandMap from "@serial/commandMap";

export const SerialContext = createContext({
  canUseSerial: true,
  hasTriedAutoconnect: false,
  connect: () => Promise.resolve(false),
  disconnect: () => {},
  portOpen: false,
  //subscribe: () => () => { },
});

export const SerialProvider = ({ children }) => {
  const [canUseSerial] = useState(() => true);

  const [portOpen, setPortOpen] = useState(false);
  const [hasTriedAutoconnect, setHasTriedAutoConnect] = useState(false);
  const [hasManuallyDisconnected, setHasManuallyDisconnected] = useState(false);
  const [readyToRun, setReadyToRun] = useState(false); //updates when arduino is ready to receive commands
  const portRef = useRef(null);
  const readerRef = useRef(null);
  const readerClosedPromiseRef = useRef(Promise.resolve());

  //subscriber callback map- callbacks have ID which is used to remove themself
  const currentSubscribersIdRef = useRef(0);
  const subscribersRef = useRef(new Map()); //(id,callback)

  // commands with no response callback queue - callbacks await their least oldest neighbor
  const noResponseCommandRef = useRef([]);

  const subscribe = (callback) => {
    const id = currentSubscribersIdRef.current;
    subscribersRef.current.set(id, callback);
    currentSubscribersIdRef.current++;

    return () => {
      subscribersRef.current.delete(id);
    };
  };

  //manual connect
  const connectManually = async () => {
    if (!portOpen) {
      try {
        const port = await navigator.serial.requestPort();
        await openPort(port);
        return true;
      } catch (err) {
        console.log("Port not selected.");
      }
    }
  };

  //auto connect
  const connectAutomatically = async () => {
    if (!portOpen && canUseSerial) {
      const availablePorts = await navigator.serial.getPorts();
      if (availablePorts.length) {
        const port = availablePorts[0];
        await openPort(port);
        return true;
      }
      setHasTriedAutoConnect(true);
    }

    return false;
  };
  //handle deviceReconnect
  const handleDeviceReconnect = async (e) => {
    setHasTriedAutoConnect(false);
  };
  //handle deviceDisconnect
  const handleDeviceDisconnect = async () => {
    //wait to finsh current loop
    if (canUseSerial && portOpen) {
      const port = portRef.current;
      if (port) {
        //cancel reading
        //readerRef.current?.cancel();
        await readerClosedPromiseRef.current;
        readerRef.current = null;
        //close port
        await port.close();
        portRef.current = null;

        //update state
        setPortOpen(false);
        setHasTriedAutoConnect(false);
        setReadyToRun(false);
      }
    }
  };
  //open port
  const openPort = async (port) => {
    try {
      await port.open({ baudRate: 115200 });
      portRef.current = port;
      //pause to wait for arduino to initialize
      await new Promise((res) => {
        setTimeout(res, 2800);
      });
      setPortOpen(true);
      //setReadyToRun(true);
      return true;
    } catch (err) {
      console.log("Could not open port.");
    }
    return false;
  };

  /**
   * Creates a promise and subscribes a callback that will execute upon receiving a specified message from the reader. Callback is stored in subscribersRef. Instructions that expect a message should be awaited in the calling function. Instructions that don't expect a message are automatically added to the noResponseCommandRef and executed with a delay in between.
   *
   * @param {*} comStr: Hexadecimal instruction string (from Nextion) that is formatted and written to MCU
   * @param {*} waitFor: Message to wait for
   * @returns string obtained from reader
   */
  const writeToPort = async (comStr, waitFor) => {
    if (canUseSerial && portOpen) {
      try {
        //store message and promise of subscriber, subscribe to reader and act based on result
        let unsub;
        let message = "";
        let result;
        if (waitFor) {
          //wait for no response queue to finish
          while (noResponseCommandRef.current.length) {
            await noResponseCommandRef.current[0];
          }
          result = new Promise((res) => {
            unsub = subscribe((val) => {
              message += val;
              //wait for specified result OR !cancel
              if (message.includes(waitFor) || message.includes("!cancel")) {
                console.log(message);
                res(message);
              }
            });
          });
        }
        //add delay between commands that get no response
        else {
          noResponseCommandRef.current.push(
            new Promise((res) => {
              setTimeout(() => {
                res();
              }, (noResponseCommandRef.current.length + 1) * 150);
            })
          );
          await noResponseCommandRef.current[
            noResponseCommandRef.current.length - 1
          ];
          noResponseCommandRef.current.splice(0, 1);
        }
        //initialize writer
        const writer = portRef.current.writable.getWriter();
        //format command string
        const comDecArray = comStr.split(" ").map((n) => {
          return parseInt(n, 16);
        });
        const data = new Uint8Array(comDecArray);
        //write data
        console.log("Writing: ", data);
        await writer.write(data);
        writer.releaseLock();

        //if command must wait for a response, await the message. otherwise just return
        if (waitFor) {
          message = await result;
          unsub();
        }
        //delay before next command (if awaiting in calling function)
        await new Promise((res) => {
          setTimeout(res, 400);
        });
        return message;
      } catch (err) {
        console.log(err);
        console.log("Could not write.");
      }
    }
  };

  //resolve all current subscribers with a !cancel string
  const cancelAllWriting = async () => {
    Array.from(subscribersRef.current).forEach(([id, callback]) => {
      callback("!cancel");
    });
  };

  //read from port until closed
  const readUntilClosed = async (port) => {
    if (port.readable) {
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      readerRef.current = textDecoder.readable.getReader();

      try {
        while (true) {
          const { value, done } = await readerRef.current.read();
          if (done) {
            break;
          }
          //console.log("Read: ", value)
          Array.from(subscribersRef.current).forEach(([id, callback]) => {
            callback(value);
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        readerRef.current.releaseLock();
      }

      await readableStreamClosed.catch(() => {}); // Ignore the error
    }
  };

  //attempt to auto-connect to port
  useEffect(() => {
    if (
      canUseSerial &&
      !hasManuallyDisconnected &&
      !hasTriedAutoconnect &&
      !portOpen
    ) {
      connectAutomatically();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canUseSerial, hasManuallyDisconnected, hasTriedAutoconnect, portOpen]);

  //attach event listeners when port is open
  useEffect(() => {
    const port = portRef.current;
    if (portOpen && port) {
      // When the port is open, read until closed
      const aborted = { current: false };
      readerRef.current?.cancel();
      readerClosedPromiseRef.current.then(() => {
        if (!aborted.current) {
          readerRef.current = null;
          readerClosedPromiseRef.current = readUntilClosed(port);
        }
      });

      // Attach a listener for when the device is disconnected
      navigator.serial.addEventListener("disconnect", handleDeviceDisconnect);

      return () => {
        aborted.current = true;
        navigator.serial.removeEventListener(
          "disconnect",
          handleDeviceDisconnect
        );
      };
    } else {
      navigator.serial.addEventListener("connect", handleDeviceReconnect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portOpen]);

  return (
    <SerialContext.Provider
      value={{
        canUseSerial,
        portOpen,
        readyToRun,
        setReadyToRun,
        connect: connectManually,
        serialWrite: writeToPort,
        commandMap,
        subscribe,
        cancelAllWriting,
      }}
    >
      {children}
    </SerialContext.Provider>
  );
};
