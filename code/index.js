const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function applyDistortion(inputPath, outputPath, mapPath, gridSize = 20, seed = 1234) {
    const img = await loadImage(inputPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    const cols = Math.ceil(img.width / gridSize);
    const rows = Math.ceil(img.height / gridSize);

    let rng = seededRandom(seed);
    let distortionMap = [];

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let sx = x * gridSize;
            let sy = y * gridSize;

            // Aplicar transformación con valores controlados
            let dx = sx + Math.round((Math.sin(y * 0.3) * 10) + (rng() * gridSize - gridSize / 2));
            let dy = sy + Math.round((Math.cos(x * 0.3) * 10) + (rng() * gridSize - gridSize / 2));

            dx = Math.max(0, Math.min(img.width - gridSize, dx));
            dy = Math.max(0, Math.min(img.height - gridSize, dy));

            distortionMap.push({ sx, sy, dx, dy });

            ctx.drawImage(img, sx, sy, gridSize, gridSize, dx, dy, gridSize, gridSize);
        }
    }

    fs.writeFileSync(mapPath, JSON.stringify(distortionMap));

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log('Imagen distorsionada guardada en:', outputPath);
}

async function reverseDistortion(inputPath, outputPath, mapPath, gridSize = 20) {
    const img = await loadImage(inputPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    const distortionMap = JSON.parse(fs.readFileSync(mapPath));

    for (let { sx, sy, dx, dy } of distortionMap) {
        ctx.drawImage(img, dx, dy, gridSize, gridSize, sx, sy, gridSize, gridSize);
    }

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log('Imagen restaurada guardada en:', outputPath);
}

function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return function () {
        x = (x * 9301 + 49297) % 233280;
        return x / 233280;
    };
}
//distorcionar imagen PRUEBA 1
//applyDistortion('peon.jpg', 'peondistorcionado.jpg', 'distortion_map.json', 20, 1234);
// Restaurar la imagen usando el mapa de distorsión
 //reverseDistortion('peondistorcionado.jpg', 'peon_restaurado.jpg', 'distortion_map.json', 20);

    //------distorcionar imagen PRUEBA 2
//applyDistortion('peon2.jpg', 'peondistorcionado2.jpg', 'distortion_map2.json', 20, 1234);
// -----Restaurar la imagen usando el mapa de distorsión
reverseDistortion('peondistorcionado2.jpg', 'peon_restaurado2.jpg', 'distortion_map2.json', 20);
