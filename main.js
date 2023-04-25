const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 450;

const parrot = new Parrot({ position: { x: 10, y: 10 } });

function animate() {
  requestAnimationFrame(animate);

  parrot.update();

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  parrot.draw(ctx);
}

window.addEventListener("load", animate);
