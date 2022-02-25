const canvas = document.getElementById("draw");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.strokeStyle = "#BADA55";
context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = 20;
context.globalCompositeOperation = "source-over";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  //stop the function when we release the mouse click
  if (!isDrawing) return;
  console.log(e);
  context.strokeStyle = `hsl(${hue},100%,50%)`;
  context.beginPath();
  //start with
  context.moveTo(lastX, lastY);
  //go to
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  // lastX = e.offsetX;
  // lastY = e.offsetY;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  if (context.lineWidth >= 100 || context.lineWidth <= 5) {
    direction = !direction;
  }
  if (direction) {
    context.lineWidth++;
  } else {
    context.lineWidth--;
  }
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  [lastX, lastY] = [e.offsetX, e.offsetY];

  isDrawing = true;
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
