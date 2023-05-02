const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 450;

const cursor = new Cursor({ position: { x: 0, y: 0 } });
const parrot = new Parrot({ position: { x: 10, y: 10 } });

function animate() {
  requestAnimationFrame(animate);

  parrot.update();

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  parrot.draw(ctx);
  cursor.draw(ctx);
}

window.addEventListener("load", animate);

canvas.addEventListener("mousemove", (e) => {
  cursor.position.x = e.layerX;
  cursor.position.y = e.layerY;
});
