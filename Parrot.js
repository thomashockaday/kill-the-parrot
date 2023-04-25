class Parrot {
  constructor({ position }) {
    this.position = position;
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
