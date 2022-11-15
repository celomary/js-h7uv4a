import canvasSketch from 'canvas-sketch';
import { math } from 'canvas-sketch-util';
const settings = {
  dimensions: [1080, 1080],
};

const getX = (degree, radius) => Math.cos(math.DegToRad(degree)) * radius;
const getY = (degree, radius) => Math.sin(math.DegToRad(degree)) * radius;


const sketch = () => {
  let x, y, w, h, xi, yi,;
  return ({ context, width, height }) => {
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, width, height);
    x = width * 0.5;
    y = height * 0.5;
    w = width * 0.5;
    context.save();
    xi = getX(30, w);
    yi = getY(30, w);

    context.translate(x - xi * 0.5, y - yi *0.5);
    context.strokeStyle = 'black';
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(xi, yi);
    context.stroke();
    context.restore();
  };
};

canvasSketch(sketch, settings);
