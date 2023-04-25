class Parrot {
  constructor(canvas) {
    this.canvas = canvas;
    this.position = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
    };
    this.width = 100;
    this.height = 100;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 450;

const parrot = new Parrot(canvas);

function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  parrot.draw(ctx);

  parrot.position.x++;
}

window.addEventListener("load", () => {
  requestAnimationFrame(animate);
});
