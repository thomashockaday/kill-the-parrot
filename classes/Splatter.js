class Splatter extends Sprite {
  constructor({ position, size }) {
    super({ position, imageSrc: "sprites/splatter.png", frames: { max: 6 } });

    this.width = size;
    this.height = size;
  }
}
