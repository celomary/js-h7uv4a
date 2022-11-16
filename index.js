import canvaSketch from 'canvas-sketch';
import { math } from 'canvas-sketch-util';

class Circle {
  constructor(angle, radius) {
    this.angle = math.degToRad(angle);
    this.radius = radius;
  }

  get getX() {
    return Math.cos(this.angle) * this.radius;
  }

  get getY() {
    return Math.sin(this.angle) * this.radius;
  }
}

const settings = {
  dimensions: [1080, 1080],
};
const strokeRect = ({ context, circle, h, fill, stroke }) => {
  console.log(context);
  context.save();
  context.translate(centerX, centerY);
  context.strokeStyle = stroke;
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(circle.getX, circle.getY);
  context.lineTo(circle.getX, circle.getY + h);
  context.lineTo(0, h);
  context.closePath();
  context.stroke();
  context.restore();
};
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, width, height);

    const w = width * 0.5;
    const h = height * 0.1;
    const circle = new Circle(-30, w);
    strokeRect({
      context,
      circle,
      w,
      h,
      fill: 'red',
      stroke: 'blue',
    });
  };
};

canvaSketch(sketch, settings);
