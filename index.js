import canvaSketch from 'canvas-sketch';
import { math, random, color } from 'canvas-sketch-util';
import colors from 'riso-colors';

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
const strokeRect = ({
  context,
  circle,
  centerX,
  centerY,
  x,
  y,
  h,
  fill,
  stroke,
}) => {
  context.translate(centerX, centerY);
  context.translate(x, y);
  context.globalCompositeOperation =
    random.value() > 0.5 ? 'overlay' : 'source-over';
  context.strokeStyle = stroke;
  context.fillStyle = fill;
  const shadowColor = color.offsetHSL(fill, 0, 0, -20).rgba;
  context.shadowColor = color.style(shadowColor);
  context.shadowOffsetX = -10;
  context.shadowOffsetY = -10;
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(circle.getX, circle.getY);
  context.lineTo(circle.getX, circle.getY + h);
  context.lineTo(0, h);
  context.closePath();
  context.fill();
  context.globalCompositeOperation = 'source-over';
  context.stroke();
};
const drawTriangle = (context, width, height) => {
  context.translate(width * 0.5, height * 0.5);
  context.beginPath();
  context.moveTo(-300, 300);
  context.lineTo(0, -300);
  context.lineTo(300, 300);
  context.closePath();
  context.strokeStyle = '#000';
  context.lineWidth = 5;
  context.stroke();
  context.clip();
};
const sketch = ({ context, width, height }) => {
  const rects = [];
  const rectsColor = [random.pick(colors).hex, random.pick(colors).hex];

  for (let i = 0; i <= 40; i++) {
    rects.push({
      context,
      circle: new Circle(-30, random.range(600, width)),
      centerX: width * 0.5,
      centerY: height * 0.5,
      x: random.range(0, 300),
      y: random.range(0, 300),
      h: random.range(50, 300),
      fill: random.pick(rectsColor),
      stroke: random.pick(rectsColor),
    });
  }

  return ({ context, width, height }) => {
    context.fillStyle = random.pick(colors).hex;
    context.fillRect(0, 0, width, height);
    rects.forEach((item) => {
      context.save();
      drawTriangle(context, width, height);
      strokeRect(item);
      context.restore();
    });
  };
};

canvaSketch(sketch, settings);
