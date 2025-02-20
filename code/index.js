const fs = require('fs');
const sharp = require('sharp');
const { createCanvas, loadImage } = require('canvas');

//paso 1
async function loadImageBuffer(inputPath) {
    return sharp(inputPath).ensureAlpha().toBuffer();
}

// async function loadImageBuffer(imagePath) {
//     const image = await loadImage(imagePath);
//     const canvas = createCanvas(image.width, image.height);
//     const ctx = canvas.getContext('2d');

//     ctx.drawImage(image, 0, 0);
//     return canvas.toBuffer();  // Devuelve la imagen como buffer
// }

//paso 2
async function applyDistortion(inputPath, outputPath, gridSize = 20) {
    const img = await loadImage(inputPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    const cols = Math.ceil(img.width / gridSize);
    const rows = Math.ceil(img.height / gridSize);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let sx = x * gridSize;
            let sy = y * gridSize;
            let dx = sx + Math.sin(y * 0.5) * 5;
            let dy = sy + Math.cos(x * 0.5) * 5;

            ctx.drawImage(img, sx, sy, gridSize, gridSize, dx, dy, gridSize, gridSize);
        }
    }

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log('Imagen distorsionada guardada en:', outputPath);
}



//paso 3
// async function reverseDistortion(inputPath, outputPath, gridSize = 20) {
//     const img = await loadImage(inputPath);
//     const canvas = createCanvas(img.width, img.height);
//     const ctx = canvas.getContext('2d');

//     const cols = Math.ceil(img.width / gridSize);
//     const rows = Math.ceil(img.height / gridSize);

//     for (let y = 0; y < rows; y++) {
//         for (let x = 0; x < cols; x++) {
//             let dx = x * gridSize;
//             let dy = y * gridSize;
//             let sx = dx - Math.sin(y * 0.5) * 5;
//             let sy = dy - Math.cos(x * 0.5) * 5;

//             ctx.drawImage(img, sx, sy, gridSize, gridSize, dx, dy, gridSize, gridSize);
//         }
//     }

//     const buffer = canvas.toBuffer('image/png');
//     fs.writeFileSync(outputPath, buffer);
//     console.log('Imagen restaurada guardada en:', outputPath);
// }


loadImageBuffer("./peon.jpg");
applyDistortion('peon.jpg', 'distorted.png');
// reverseDistortion('distorted.png', 'restored.png');