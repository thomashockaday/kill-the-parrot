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
  lives: 20,
};

function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < parrots.length; i++) {
    parrots[i].update();

    if (
      parrots[i].position.x > canvas.width ||
      parrots[i].position.x + parrots[i].width < 0
    ) {
      game.lives--;
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
      cursor.shooting = false;
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
        position: {
          x: startX,
          y: randomIntBetween(1, canvas.height - size / 3),
        },
        size,
        speed,
      })
    );
  }

  if (game.score >= game.level * 10) {
    game.level++;
  }

  if (game.lives <= 0) {
    game.lives = 0;
    canvas.removeEventListener("mousedown", handleMousedown);
    canvas.removeEventListener("touchstart", handleMousedown);
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
    `Level: ${game.level}   Score: ${game.score}   Lives: ${game.lives}`,
    canvas.width - 10,
    10
  );

  if (game.lives > 0) {
    cursor.draw(ctx);
  } else {
    ctx.font = "64px Titan One";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
  }
}

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

function handleMousedown() {
  cursor.shooting = true;
}

function scaleCanvas() {
  if (window.innerWidth <= 900) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else {
    canvas.width = 800;
    canvas.height = 450;
  }
}

window.addEventListener("load", () => {
  scaleCanvas();
  animate();
});

canvas.addEventListener("mousemove", (e) => {
  cursor.position.x = e.layerX;
  cursor.position.y = e.layerY;
});

canvas.addEventListener("mousedown", handleMousedown);
canvas.addEventListener("touchstart", handleMousedown);

window.addEventListener("resize", scaleCanvas);
