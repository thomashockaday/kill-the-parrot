class Parrot {
  constructor(canvas) {
    this.position = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };
    this.width = 100;
    this.height = 100;
  }

  update() {
    this.position.x++;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
