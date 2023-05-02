class Parrot extends Sprite {
  constructor({ position, size, speed }) {
    const imageSrc = `sprites/parrot-${speed < 0 ? "left" : "right"}.png`;
    super({ position, imageSrc, frames: { max: 10 } });

    this.width = size;
    this.height = size;
    this.speed = speed;

    this.hitbox = {
      position: {
        x: this.position.x + this.width / 10,
        y: this.position.y + this.height / 6,
      },
      width: this.width / 1.25,
      height: this.height / 1.2,
    };
  }

  update() {
    super.update();

    this.position.x += this.speed;
    this.hitbox.position.x += this.speed;
  }
}
