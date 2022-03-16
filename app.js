const canvas = document.querySelector("#jsCanvas");
//const colors = document.querySelector("#jsColors");
const colors = document.querySelectorAll(".controls__color");
const ctx = canvas.getContext("2d");
const brushControl = document.querySelector("#jsRange");
const modeBtn = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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
  ctx.fillStyle = color;
}

function onChangeBrushSize() {
  const brushSize = this.value;
  ctx.lineWidth = brushSize;
}

function onClickModeBtn() {
  if (filling === true) {
    filling = false;
    modeBtn.innerText = "Fill";
  } else {
    filling = true;
    modeBtn.innerText = "Paint";
  }
}

function onClickSaveBtn() {
  //make the dataURL of image, and give the url to A link. and click it
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "myPainting";
  link.click();
}

function onClickCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function onHandleCM(event) {
  event.preventDefault();
}

brushControl.addEventListener("input", onChangeBrushSize);

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", onClickCanvas);
  canvas.addEventListener("contextmenu", onHandleCM);
}

if (modeBtn) {
  modeBtn.addEventListener("click", onClickModeBtn);
}

if (saveBtn) {
  saveBtn.addEventListener("click", onClickSaveBtn);
}

//Nico's solution
colors.forEach((color) =>
  color.addEventListener("click", onClickColorChangeBtn)
);
