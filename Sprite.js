class Sprite {
  constructor({ position }) {
    this.position = position;

    this.image = new Image();
    this.image.src = "parrot.png";
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
