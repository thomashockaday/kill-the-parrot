const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 450;

const cursor = new Cursor({ position: { x: 0, y: 0 } });
const parrots = [];
const splatters = [];

const game = {
  score: 0,
  level: 1,
};

function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < parrots.length; i++) {
    parrots[i].update();

    if (
      parrots[i].position.x > canvas.width ||
      parrots[i].position.x + parrots[i].width < 0
    ) {
      parrots.splice(i, 1);
    }

    if (cursor.shooting && collisionRectRect(cursor, parrots[i].hitbox)) {
      const size = randomIntBetween(100, 320);

      splatters.push(
        new Splatter({
          position: {
            x: cursor.position.x - size / 2,
            y: cursor.position.y - size / 2,
          },
          size,
        })
      );

      parrots.splice(i, 1);
      game.score++;
    }
  }

  for (let i = 0; i < splatters.length; i++) {
    splatters[i].update();

    if (
      splatters[i].frames.current === 0 &&
      splatters[i].frames.elapsed > splatters[i].frames.hold
    ) {
      splatters.splice(i, 1);
    }
  }

  cursor.update();

  if (parrots.length <= game.level - 1) {
    let speed = randomIntBetween(2, 8);
    const size = randomIntBetween(100, 250);
    let startX = -size + 1;
    const random = Math.random();

    if (random > 0.5) {
      speed *= -1;
      startX = canvas.width - 1;
    }

    parrots.push(
      new Parrot({
        position: { x: startX, y: randomIntBetween(1, 360) },
        size,
        speed,
      })
    );
  }

  if (game.score >= game.level * 10) {
    game.level++;
  }

  ctx.fillStyle = "#f5f6fa";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  parrots.forEach((parrot) => {
    parrot.draw(ctx);
  });

  splatters.forEach((splatter) => {
    splatter.draw(ctx);
  });

  ctx.fillStyle = "black";
  ctx.font = "24px Titan One";
  ctx.textBaseline = "top";
  ctx.textAlign = "right";
  ctx.fillText(
    `Level: ${game.level}   Score: ${game.score}`,
    canvas.width - 10,
    10
  );

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

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
