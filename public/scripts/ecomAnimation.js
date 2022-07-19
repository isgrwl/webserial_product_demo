(() => {
  document.body.onload = function getElementCenter() {
    let bodyRect = document
      .querySelector(".animation360")
      .getBoundingClientRect();

    let bodyCenter = {
      x: bodyRect.x + bodyRect.width / 2,
      y: bodyRect.y + bodyRect.height / 2,
    };
    console.log(bodyCenter);

    //make coordinates
    let el, x, y;
    let dc = 300;
    let numElements = 24;
    for (let i = 0; i < numElements; i++) {
      el = document.createElement("div");
      el.style.width = "5px";
      el.style.height = "5px";
      el.style.position = "absolute";
      el.style.backgroundColor = "red";

      y = dc * Math.sin(((2 * Math.PI) / numElements) * i) + bodyCenter.y;
      x = dc * Math.cos(((2 * Math.PI) / numElements) * i) + bodyCenter.x;
      el.style.top = y + "px";
      el.style.left = x + "px";

      document.body.appendChild(el);
    }
  };
})();
