const ss = window.sessionStorage;
//init
ss.setItem("state", "stopped");

const [runBtn, stopBtn, testBtn] = document.querySelectorAll("button");
const [leftBtn, rightBtn] = document.querySelectorAll(".arrowButton");

//setup
initElt(stopBtn);
initElt(leftBtn);
initElt(rightBtn);

runBtn.addEventListener("click", (e) => {
  toggleDisable(stopBtn);
  toggleDisable(leftBtn);
  toggleDisable(rightBtn);
  toggleDisable(testBtn);

  if (ss.getItem("running") === "true") {
    //set stopping state
    //stop taking pictures- ungreen button, disable pause, enable test, enable arrows
    ss.setItem("running", "false");

    runBtn.classList.toggle("enabled");
    runBtn.innerHTML = "Demarrer";
  } else {
    //set running state
    //start taking pictures- make button green, enable pause, disable test pics, disable arrows
    ss.setItem("running", "true");

    runBtn.classList.toggle("enabled");
    runBtn.innerHTML = "Annuler";
  }
});

stopBtn.addEventListener("click", (e) => {
  stopBtn.classList.toggle("enabled");
  stopBtn.innerHTML === "Pause"
    ? (stopBtn.innerHTML = "Redemarrer")
    : (stopBtn.innerHTML = "Pause");
});

function toggleDisable(e) {
  e.classList.toggle("disabled");
  e.disabled = !e.disabled;
}

function initElt(e) {
  e.disabled = true;
  e.classList.add("disabled");
}
