const canvas = document.querySelector("#jsCanvas");
//const colors = document.querySelector("#jsColors");
const colors = document.querySelectorAll(".controls__color");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  //coord over the canvas, necessary. so use offset(relative to the div element)
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

//** my solution with eventDelegation using dataset
// function onClickColorChangeBtn(event) {
//   const dataset = event.target.dataset;
//   const key = dataset.key;
//   //const value = dataset.value;
//   const value = event.target.style.backgroundColor;
//   if (key == null) {
//     return;
//   } else {
//     ctx.strokeStyle = value;
//   }
// }

function onClickColorChangeBtn(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

//Nico's solution
colors.forEach((color) =>
  color.addEventListener("click", onClickColorChangeBtn)
);
