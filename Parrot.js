class Parrot extends Sprite {
  constructor({ position }) {
    super({ position });
    this.width = 100;
    this.height = 100;
  }

  update() {
    this.position.x++;
  }
}
