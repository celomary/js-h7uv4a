import canvasSketch from 'canvas-sketch';
import { math, random, color } from 'canvas-sketch-util';
import colors from 'riso-colors';

const settings = {
  dimensions: [1080, 1080],
};

const getX = (degree, radius) => Math.cos(math.degToRad(degree)) * radius;
const getY = (degree, radius) => Math.sin(math.degToRad(degree)) * radius;

const drawSkewedRect = (
  context,
  x,
  y,
  w,
  h,
  angle = 30,
  fill = 'blue',
  stroke = 'black'
) => {
  let xi, yi;
  xi = getX(angle, w);
  yi = getY(angle, w);
  context.save();
  context.strokeStyle = stroke;
  context.fillStyle = fill;
  context.lineWidth = 10;
  const shadowColor = color.offsetHSL(fill, 0, 0, -20).rgba;
  shadowColor[3] = .5
  context.shadowColor = color.style(shadowColor)
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.translate(x - xi * 0.5, y - yi * 0.5);
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(xi, yi);
  context.lineTo(xi, yi + h);
  context.lineTo(0, h);
  context.closePath();
  context.stroke();
  context.fill();
  context.restore();
};
const sketch = ({ width, height }) => {
  let x, y, w, h;
  const rect = [];
  const colorRect = [
    random.pick(colors).hex,
    random.pick(colors).hex,
    random.pick(colors).hex,
  ];

  console.log(random.pick(colors));
  for (let num = 0; num < 20; num++) {
    rect.push({
      x: random.range(0, width),
      y: random.range(0, height),
      w: width * 0.5,
      h: height * 0.1,
      fill: random.pick(colors).hex,
      stroke: random.pick(colors).hex,
      angle: -30,
    });
  }

  return ({ context, width, height }) => {
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, width, height);
    rect.forEach(({ x, y, w, h, angle, fill, stroke }) => {
      drawSkewedRect(context, x, y, w, h, angle, fill, stroke);
    });
  };
};

canvasSketch(sketch, settings);
