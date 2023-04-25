class Sprite {
  constructor({ position, imageSrc, frames = { max: 1 } }) {
    this.position = position;

    this.frames = {
      max: frames.max,
      current: 0,
    };

    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw(ctx) {
    const cropWidth = this.image.width / this.frames.max;

    const crop = {
      position: {
        x: cropWidth * this.frames.current,
        y: 0,
      },
      width: cropWidth,
      height: this.image.height,
    };

    ctx.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      this.position.x,
      this.position.y,
      crop.width,
      crop.height
    );
  }
}
