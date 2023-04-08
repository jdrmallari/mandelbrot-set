var canvas = document.querySelector('.myCanvas');
var ctx = canvas.getContext('2d');
const width = ctx.canvas.width = window.innerWidth;
const height = ctx.canvas.height = window.innerHeight;

const max_iteration = 50;

// f_{c}(z)=z^{2}+c
function mandelbrot(c) {
    let z = { x: 0, y: 0 }; i = 0;
    // run at least once                 
    do {
            let xtemp = Math.pow(z.x, 2) - Math.pow(z.y, 2) + c.x;
            z.y = 2 * z.x * z.y + c.y;
            z.x = xtemp;
            i++;
    }
    while(i < max_iteration && Math.pow(z.x, 2) + Math.pow(z.y, 2) <= 4); // 
    return [i, Math.pow(z.x, 2) + Math.pow(z.y, 2) <= 4];
}

// mandelbrot x scale
const x0 = { min: -2.00, max: 0.47 };
// mandelbrot y scale
const y0 = { min: -1.12, max: 1.12 };

// generate array of random colours
const colours = new Array(16).fill(0).map((_, i) => i === 0 ? '#000' : `#${Math.floor(Math.random()*16777215 | 0).toString(16)}`)

// go through every pixel on window
for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {

        complexNumber = {
            // scaled to lie in x0 range
            x: x0.min + (x / width) * (x0.max - x0.min),
            // scaled to lie in y0 range
            y: y0.min + (y / height) * (y0.max - y0.min)
        }

        const [m, isMandelbrotSet] = mandelbrot(complexNumber)
        // assign colour to each value of the number of executed iterations if mandelbrot set 
        ctx.fillStyle = colours[isMandelbrotSet ? 0 : (m % colours.length - 1) + 1]
        ctx.fillRect(x, y, 1, 1)
    }
}