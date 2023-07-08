const commandMap = {
  params: {
    numPhotos: ["23 02 54 28", "get nomPhoto"],
    flashDelay: ["23 02 54 29", "get delais"],
    rotationSpeed: ["23 02 54 2A", "get vitesse"],
    laserAngle: ["23 02 54 2B", "get angleLaser"],
    laserActive: ["23 02 54 2D", "get etatLaser"],
    rotationDirection: ["23 02 54 2C", "get sensRotation"],
  },
  control: {
    start360: ["23 02 54 09", "tmReset.en=1"],
    cancel360: "23 02 54 2E",

    cancelManual: ["23 02 54 10", "zPosition.val"],
    turnManual: ["23 02 54 0F", "zPosition.val"],
    cameraManual: ["23 02 54 11", "nPhotoFait.val"],

    startEcom: ["23 02 54 0C", "tmReset.en=1"],
    selectEcomAngles: ["23 02 54 0B", "nNumChoix.val"],

    cameraTest: "23 02 54 0D",
    leftArrowDown: "23 02 54 07",
    rightArrowDown: "23 02 54 06",
    arrowsUp: "23 02 54 08",
  },
  _ending: "00 00 00 FF FF FF",
};

export default commandMap;
