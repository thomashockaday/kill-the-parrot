class Cursor {
  constructor({ position }) {
    this.position = position;
  }

  draw(ctx) {
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
    ctx.moveTo(this.position.x + 40, this.position.y);
    ctx.arc(this.position.x, this.position.y, 40, 0, 2 * Math.PI);
    ctx.moveTo(this.position.x, this.position.y - 10);
    ctx.lineTo(this.position.x, this.position.y - 50);
    ctx.moveTo(this.position.x + 10, this.position.y);
    ctx.lineTo(this.position.x + 50, this.position.y);
    ctx.moveTo(this.position.x, this.position.y + 10);
    ctx.lineTo(this.position.x, this.position.y + 50);
    ctx.moveTo(this.position.x - 10, this.position.y);
    ctx.lineTo(this.position.x - 50, this.position.y);
    ctx.stroke();
    ctx.closePath();
  }
}
