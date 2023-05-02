class Parrot extends Sprite {
  constructor({ position }) {
    super({ position, imageSrc: "parrot.png", frames: { max: 10 } });

    this.width = 200;
    this.height = 200;

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

    this.position.x++;
    this.hitbox.position.x++;
  }
}
