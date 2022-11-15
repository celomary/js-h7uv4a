import canvasSketch from 'canvas-sketch';
import { math, random } from 'canvas-sketch-util';
const settings = {
  dimensions: [1080, 1080],
};

const getX = (degree, radius) => Math.cos(math.degToRad(degree)) * radius;
const getY = (degree, radius) => Math.sin(math.degToRad(degree)) * radius;

const drawSkewedRect = (context, x, y, w, h, angle = 0) => {
  let xi, yi;
  xi = getX(angle, w);
  yi = getY(angle, w);
  context.save();
  context.translate(x - xi * 0.5, y - yi * 0.5);
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(xi, yi);
  context.lineTo(xi, yi + h);
  context.lineTo(0, h);
  context.closePath();
  context.stroke();
  context.restore();
};
const sketch = () => {
  let x, y, w, h;
  return ({ context, width, height }) => {
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, width, height);
    x = width * 0.5;
    y = height * 0.5;
    w = width * 0.5;
    h = height * 0.1;

    context.strokeStyle = 'black';
    for (let num = 0; num < 20; num++) {
      drawSkewedRect(context, x, y, w, h, 0);
    }
  };
};

canvasSketch(sketch, settings);
