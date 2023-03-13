var canvas = document.querySelector('.myCanvas');
var ctx = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;
ctx.canvas.width = width;
ctx.canvas.height = width;

const max_iteration = 1000;

function mandelbrot(c) {
    let z = { x: 0, y: 0}; 
    let i = 0;                   
    do {
            let xtemp = Math.pow(z.x, 2) - Math.pow(z.y, 2) + c.x;
            z.y = 2 * z.x * z.y + c.y;
            z.x = xtemp;
            i++;
    }
    while(i < max_iteration && Math.pow(z.x, 2) + Math.pow(z.y, 2) < 4);
    return [i, Math.pow(z.x, 2) + Math.pow(z.y, 2) <= 2];
}

const x0 = { start: -2.00, end: 0.47 };
const y0 = { start: -1.12, end: 1.12 };

const colors = new Array(16).fill(0).map((_, i) => i === 0 ? '#000' : `#${((1 << 24) * Math.random() | 0).toString(16)}`)

for(let x = 0; x < width; x++) {
    for(let y = 0; y < width; y++) {
        complex = {
            x: x0.start + (x / width) * (x0.end - x0.start),
            y: y0.start + (y / height) * (y0.end - y0.start)
        }

        const [m, isMandelbrotSet] = mandelbrot(complex)
            ctx.fillStyle = colors[isMandelbrotSet ? 0 : (m % colors.length - 1) + 1]
            ctx.fillRect(x, y, 1, 1)
        }
}