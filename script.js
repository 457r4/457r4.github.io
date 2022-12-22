const cube = document.getElementById("cube");
let angle = 0;

function rotateCube() {
  angle += 0.1;
  cube.style.transform = `rotateX(${angle}deg) rotateY(${angle}deg)`;
}

setInterval(rotateCube, 1);