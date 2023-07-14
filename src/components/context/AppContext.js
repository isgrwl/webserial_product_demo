import store from "store2";
import {
  useContext,
  createContext,
  useState,
  createRef,
  useEffect,
} from "react";
import { SerialContext } from "./SerialContext";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const {
    subscribe,
    serialWrite,
    commandMap,
    portOpen,
    readyToRun,
    setReadyToRun,
  } = useContext(SerialContext);
  //track which of 3 tasks is running- "", "360", "ecom", "manual"
  const [appState, setAppState] = useState("");
  const [photosTaken, setPhotosTaken] = useState(0);
  const [platformPosition, setPlatformPosition] = useState(0);
  //initialize state from localStorage
  const [params, setParams] = useState({
    numPhotos: store("numPhotos") ?? 0,
    laserActive: store("laserActive") ?? 0,
    laserAngle: store("laserAngle") ?? 0,
    flashDelay: store("flashDelay") ?? 0,
    rotationDirection: store("rotationDirection") ?? 0,
    rotationSpeed: store("rotationSpeed") ?? 0,
    boxValues: store("boxValues") ?? new Array(24).join(0),
  });

  //keep params synced with localStorage
  useEffect(() => {
    store(params);
  }, [params]);

  //keep params synced with arduino
  useEffect(() => {
    if (portOpen) writeAllParams();
  }, [portOpen]);

  /**
   * Manage port based on running state and vice versa
   *  - 0=stopped, 1=running, 2=paused
   */

  /*useEffect(() => {
        (async () => {
            if (readyToRun && readyToRun) {
                if (runState == 0) {
                    //serialWrite("stopped")
                }
                else if (runState == 1) {
                    if (await writeParams()) {
                        await start360()
                    } else {
                        console.log("Could not start running.")
                    }
                }
                else {
                    //await writeParams(`${commandMap.control.pause}`)
                }
            } else {
                setRunState(0)
            }
        })()

    }, [portOpen, runState, readyToRun])*/

  /**
   * Write numPhotos parameter to take to device
   * @returns true if done writing, false if port was closed
   */
  const writeNumPhotos = async () => {
    //write numPhotos
    const vals = [24, 30, 36, 40, 45, 60, 90, 120];
    if (portOpen || readyToRun) {
      await serialWrite(
        `${commandMap.params.numPhotos[0]} 71 ${vals[params.numPhotos]} ${
          commandMap._ending
        }`,
        commandMap.params.numPhotos[1]
      );
      //set state to stopped again
      setAppState("");
      return true;
    }
    return false;
  };
  /**
   * Write flashDelay parameter to device
   * @returns true if done writing, false if port was closed
   */
  const writeFlashDelay = async () => {
    if (portOpen || readyToRun) {
      //write flashDelay
      await serialWrite(
        `${commandMap.params.flashDelay[0]} 71 ${params.flashDelay} ${commandMap._ending}`,
        commandMap.params.flashDelay[1]
      );
      return true;
    }
    return false;
  };
  /**
   * Write rotationSpeed parameter to device
   * @returns true if done writing, false if port was closed
   */
  const writeRotationSpeed = async () => {
    if (portOpen || readyToRun) {
      //write rotationSpeed
      await serialWrite(
        `${commandMap.params.rotationSpeed[0]} 71 ${params.rotationSpeed} ${commandMap._ending}`,
        commandMap.params.rotationSpeed[1]
      );
      return true;
    }
    return false;
  };
  /**
   * Write laserAngle parameter to device
   * @returns true if done writing, false if port was closed
   */
  const writeLaserAngle = async () => {
    if (portOpen || readyToRun) {
      //write laserAngle
      await serialWrite(
        `${commandMap.params.laserAngle[0]} 71 ${params.laserAngle} ${commandMap._ending}`,
        commandMap.params.laserAngle[1]
      );
      return true;
    }
    return false;
  };
  /**
   * Write laserActive parameter to device
   * @returns true if done writing, false if port was closed
   */
  const writeLaserActive = async () => {
    if (portOpen || readyToRun) {
      //write laserActive
      await serialWrite(
        `${commandMap.params.laserActive[0]} 71 ${params.laserActive} ${commandMap._ending}`,
        commandMap.params.laserActive[1]
      );
      return true;
    }
    return false;
  };
  /**
   * Write rotationDirection parameter to device
   * @returns true if done writing, false if port was closed
   */
  const writeRotationDirection = async () => {
    if (portOpen || readyToRun) {
      await serialWrite(
        `${commandMap.params.rotationDirection[0]} 71 ${params.rotationDirection} ${commandMap._ending}`,
        commandMap.params.rotationDirection[1]
      );
      return true;
    }
    return false;
  };

  /**
   * Write ecom angles to device
   * @returns true if done writing, false if port was closed
   */
  const writeEcomAngles = async () => {
    if (portOpen || readyToRun) {
      await serialWrite(
        `${commandMap.control.selectEcomAngles[0]} ${params.boxValues} ${commandMap._ending}`,
        commandMap.control.selectEcomAngles[1]
      );
      return true;
    }
    return false;
  };

  /**
   * Write all parameters to the device sequentially
   * @returns true if done writing, false if port was closed
   */
  const writeAllParams = async () => {
    await writeNumPhotos();
    await writeFlashDelay();
    await writeRotationSpeed();
    await writeRotationDirection();
    await writeLaserAngle();
    await writeLaserActive();
    //await writeEcomAngles();
    setReadyToRun(true);
  };

  /**
   * 360: Start animation360 procedure
   * parameters are state setters that update relevant variable
   */
  const start360 = async () => {
    setAppState("360");
    setPlatformPosition(0);
    setPhotosTaken(0);
    //callback to update taken photos
    let unsub;
    let message = "";
    new Promise((res) => {
      unsub = subscribe((val) => {
        message += val;
        if (
          message.includes("nPhotoFait.val") &&
          message.includes("zPosition.val")
        ) {
          //extract value from "nPhotoFait.val=X"
          let photosTakenStr = message.indexOf("nPhotoFait.val");
          photosTakenStr = message.substring(
            message.indexOf("=", photosTakenStr) + 1,
            message.indexOf("�", photosTakenStr)
          );

          //extract value from "zPosition.val=X"
          let platformPositionStr = message.indexOf("zPosition.val");
          platformPositionStr = message.substring(
            message.indexOf("=", platformPositionStr) + 1,
            message.indexOf("�", platformPositionStr)
          );

          //update state
          setPlatformPosition(parseInt(platformPositionStr) % 360);
          setPhotosTaken(parseInt(photosTakenStr));

          message = "";
        }
      });
    });
    //start 360
    await serialWrite(
      `${commandMap.control.start360[0]} ${commandMap._ending}`,
      commandMap.control.start360[1]
    );
    //delete callback
    unsub();

    //set state to stopped again
    setAppState("");
  };

  /**
   * Manual: Turn platform 1 position
   */
  const turnManual = async () => {
    if (appState != "manual") {
      setAppState("manual");
      setPlatformPosition(0);
      setPhotosTaken(0);
    }
    let unsub;
    let message = "";
    new Promise((res) => {
      unsub = subscribe((val) => {
        message += val;
        if (message.includes("zPosition.val")) {
          //extract value from "nPhotoFait.val=X"

          //extract value from "zPosition.val=X"
          let platformPositionStr = message.indexOf("zPosition.val");
          platformPositionStr = message.substring(
            message.indexOf("=", platformPositionStr) + 1,
            message.indexOf("�", platformPositionStr)
          );

          //update state
          setPlatformPosition(parseInt(platformPositionStr) % 360);

          message = "";
        }
      });
    });
    await serialWrite(
      `${commandMap.control.turnManual[0]} ${commandMap._ending}`,
      commandMap.control.turnManual[1]
    );
    //delete callback
    unsub();

    console.log(message);
  };

  /**
   * Manual: Take photo
   */
  const cameraManual = async () => {
    if (appState != "manual") {
      setAppState("manual");
      setPlatformPosition(0);
      setPhotosTaken(0);
    }
    let unsub;
    let message = "";
    new Promise((res) => {
      unsub = subscribe((val) => {
        message += val;
        if (message.includes("nPhotoFait.val")) {
          //extract value from "nPhotoFait.val=X"
          let photosTakenStr = message.indexOf("nPhotoFait.val");
          photosTakenStr = message.substring(
            message.indexOf("=", photosTakenStr) + 1,
            message.indexOf("�", photosTakenStr)
          );

          //extract value from "zPosition.val=X"
          /*let platformPositionStr = message.indexOf("zPosition.val");
        platformPositionStr = message.substring(
          message.indexOf("=", platformPositionStr) + 1,
          message.indexOf("�", platformPositionStr)
        );*/

          //update state
          setPhotosTaken(parseInt(photosTakenStr));

          message = "";
        }
      });
    });
    const msg = await serialWrite(
      `${commandMap.control.cameraManual[0]} ${commandMap._ending}`,
      commandMap.control.cameraManual[1]
    );

    unsub();

    console.log(msg);
  };

  /**
   * Manual: Cancel (reset)
   */
  const cancelManual = async () => {
    await serialWrite(
      `${commandMap.control.cancelManual[0]} ${commandMap._ending}`,
      commandMap.control.cancelManual[1]
    );
    setAppState("");
    setPhotosTaken(0);
    setPlatformPosition(0);
  };

  /**
   * Camera Test
   */
  const cameraTest = async () => {
    await serialWrite(
      `${commandMap.control.cameraTest} ${commandMap._ending}`,
      null
    );
  };

  /**
   * Left Rotation Arrow DOWN
   */
  const leftRotationArrowDown = async () => {
    await serialWrite(
      `${commandMap.control.leftArrowDown} ${commandMap._ending}`,
      null
    );
  };

  /**
   * Right Rotation Arrow DOWN
   */
  const rightRotationArrowDown = async () => {
    await serialWrite(
      `${commandMap.control.rightArrowDown} ${commandMap._ending}`,
      null
    );
  };

  /**
   * Rotation Arrows UP
   */
  const rotationArrowsUp = async () => {
    await serialWrite(
      `${commandMap.control.arrowsUp} ${commandMap._ending}`,
      null
    );
  };

  /**
   * Start ecom
   */
  const startEcom = async () => {
    if (readyToRun) {
      await writeEcomAngles();
      await serialWrite(
        `${commandMap.control.startEcom[0]} ${commandMap._ending}`,
        commandMap.control.startEcom[1]
      );
      setAppState("");
    }
    return false;
  };

  const appFunctions = {
    writeEcomAngles,
    writeNumPhotos,
    writeFlashDelay,
    writeLaserActive,
    writeLaserAngle,
    writeRotationDirection,
    writeRotationSpeed,
    startEcom,
    start360,
    turnManual,
    cameraManual,
    cancelManual,
    cameraTest,
    leftRotationArrowDown,
    rightRotationArrowDown,
    rotationArrowsUp,
  };

  return (
    <AppContext.Provider
      value={{
        params,
        setParams,
        appState,
        setAppState,
        photosTaken,
        platformPosition,
        appFunctions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
