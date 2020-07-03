const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
var scale = window.devicePixelRatio;
canvas.width = Math.floor(width * scale);
canvas.height = Math.floor(height * scale)

context.lineJoin = 'round';
context.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let degrees = 0.0;
const radians = () => degrees * Math.PI / 180.0;

function draw(e) {
    if (!isDrawing) { return; }

    const lineWidthSpeed = 3.0
    const lineWidthMagnitude = ((Math.cos(radians() * lineWidthSpeed) + 1) / 2);
    const lineWidth = (lineWidthMagnitude * 90) + 10;

    const hueSpeed = 1.0;
    const color = `hsl(${degrees * hueSpeed}, 100%, 50%)`;

    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX * scale, e.offsetY * scale);
    context.stroke();

    degrees = (degrees + 1.0) % 360.0;

    [lastX, lastY] = [e.offsetX * scale, e.offsetY * scale];
}

canvas.addEventListener('pointerdown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX * scale, e.offsetY * scale];
});
canvas.addEventListener('pointerup', () => isDrawing = false);
canvas.addEventListener('pointerout', () => isDrawing = false);
canvas.addEventListener('pointermove', draw)