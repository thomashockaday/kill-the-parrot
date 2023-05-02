const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 450;

const cursor = new Cursor({ position: { x: 0, y: 0 } });
const parrots = [new Parrot({ position: { x: 10, y: 10 } })];

function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < parrots.length; i++) {
    parrots[i].update();

    if (cursor.shooting && collisionRectRect(cursor, parrots[i])) {
      parrots.splice(i, 1);
    }

    if (parrots[i].position.x > canvas.width) {
      parrots.splice(i, 1);
    }
  }

  cursor.update();

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  parrots.forEach((parrot) => {
    parrot.draw(ctx);
  });
  cursor.draw(ctx);
}

window.addEventListener("load", animate);

canvas.addEventListener("mousemove", (e) => {
  cursor.position.x = e.layerX;
  cursor.position.y = e.layerY;
});

canvas.addEventListener("mousedown", () => {
  cursor.shooting = true;
});

function collisionRectRect(rect1, rect2) {
  return (
    rect1.position.x >= rect2.position.x &&
    rect1.position.x + rect1.width <= rect2.position.x + rect2.width &&
    rect1.position.y >= rect2.position.y &&
    rect1.position.y + rect1.height <= rect2.position.y + rect2.height
  );
}
