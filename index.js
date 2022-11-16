import canvaSketch from 'canvas-sketch';

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    context.save();
    context.translate(centerX, centerY);
    const rectWidth = 300;
    const rectHeight = 50;
    context.fillStyle = '#000';
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(-rectWidth / 2, -rectHeight / 2);
    context.lineTo(rectWidth, -rectHeight / 2);
    context.lineTo(rectWidth, rectHeight);
    context.lineTo(-rectWidth / 2, rectHeight);
    context.closePath();
    context.stroke();
  };
};

canvaSketch(sketch, settings);
