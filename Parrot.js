class Parrot extends Sprite {
  constructor({ position }) {
    super({ position, imageSrc: "parrot.png", frames: { max: 10 } });

    this.width = 200;
    this.height = 200;
  }

  update() {
    super.update();

    this.position.x++;
  }
}
