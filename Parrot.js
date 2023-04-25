class Parrot extends Sprite {
  constructor({ position }) {
    super({ position, imageSrc: "parrot.png", frames: { max: 10 } });

    this.width = 100;
    this.height = 100;
  }

  update() {
    this.position.x++;
  }
}
