# **Laboratorio: Aplicar y Revertir una Distorsión en una Imagen con Retículas en macOS**

## **Universidad Politécnico Grancolombiano**  
**Especialización en Seguridad de la Información**  
**Materia:** Criptografía Simétrica  
**Docente:** José Alfonso Valencia Rodríguez  
**Autor:** Jhon Edison Hincapié  
**Año:** 2025  

## 📌 **Introducción**
La manipulación de imágenes mediante retículas es una técnica que permite distorsionar una imagen de forma reversible. Esta técnica es útil en diversos campos, como la **seguridad de la información**, el **procesamiento de imágenes** y la **criptografía visual**.

En este laboratorio, aprenderás a aplicar y revertir una distorsión en una imagen utilizando **Node.js** en un ambiente macOS. La distorsión se realiza mediante la división de la imagen en una cuadrícula (grid) y el desplazamiento de sus segmentos. Luego, aplicaremos la transformación inversa para recuperar la imagen original.

---

## 🎯 **Justificación y Aplicaciones en Seguridad de la Información**

Las retículas y distorsiones en imágenes pueden aplicarse en varios escenarios de seguridad:
- **Marcado de agua invisible**: Protección de derechos de autor.
- **Cifrado visual**: Ocultación de información en imágenes.
- **Estrategias de esteganografía**: Inclusión de datos dentro de imágenes que solo pueden ser revelados mediante una transformación específica.

La capacidad de recuperar la imagen original después de una transformación es clave en estos casos.

---

## ✅ **Ventajas y Desventajas de la Técnica**

### **Ventajas**
- **Seguridad de la información**: Permite ocultar datos en imágenes de manera efectiva.
- **Reversibilidad**: Se puede restaurar la imagen original si se conoce el algoritmo de distorsión.
- **Bajo impacto en calidad**: Si la distorsión es controlada, la imagen no pierde demasiada calidad visual.
- **Aplicaciones versátiles**: Útil en criptografía visual, esteganografía y marca de agua digital.

### **Desventajas**
- **Dependencia del algoritmo**: Si el algoritmo no es robusto, la restauración puede ser imperfecta.
- **Vulnerabilidad ante ataques**: Técnicas avanzadas de análisis forense pueden detectar y revertir distorsiones.
- **Requiere almacenamiento extra**: En algunos casos, es necesario almacenar metadatos sobre la distorsión aplicada.
- **No es completamente indetectable**: Métodos de análisis de imágenes pueden revelar alteraciones en los píxeles.

---

## 🔍 **Influencia en el Análisis Forense**

El análisis forense digital se encarga de la recuperación y examen de información en dispositivos electrónicos. En este contexto, el uso de distorsiones por retículas tiene implicaciones importantes:

- **Detección de manipulación**: Los investigadores pueden aplicar técnicas de análisis de imágenes para detectar patrones de distorsión sospechosos.
- **Recuperación de datos ocultos**: Métodos de procesamiento inverso pueden permitir la reconstrucción parcial o total de la imagen original.
- **Evidencia en investigaciones criminales**: Si una imagen ha sido manipulada con fines maliciosos, las técnicas forenses pueden intentar restaurarla para obtener pruebas.
- **Uso de IA y aprendizaje automático**: Algoritmos avanzados pueden detectar y revertir alteraciones sin necesidad de conocer el algoritmo exacto de distorsión.

El conocimiento y uso de estas técnicas tanto para ocultar como para recuperar información es clave en la ciberseguridad y el análisis forense digital.

---

## 🔧 **Requisitos Previos**

### **Instalación de Dependencias en macOS**
Antes de comenzar, asegúrate de tener **Node.js** instalado. Si no lo tienes, instálalo con:

```sh
brew install node
```

Ahora, crea un directorio para el proyecto y accede a él:

```sh
mkdir laboratorio-reticulas && cd laboratorio-reticulas
```

Inicializa un proyecto de Node.js:

```sh
npm init -y
```

Instala las dependencias necesarias:

```sh
npm install sharp canvas fs
```

---

## 🖼️ **Paso 1: Cargar una Imagen en Node.js**

Crea un archivo `index.js` y agrega el siguiente código para cargar una imagen:

```javascript
const fs = require('fs');
const sharp = require('sharp');
const { createCanvas, loadImage } = require('canvas');

async function loadImageBuffer(inputPath) {
    return sharp(inputPath).ensureAlpha().toBuffer();
}
```

Coloca una imagen llamada `input.jpg` en la carpeta del proyecto.

---

## 🎨 **Paso 2: Aplicar la Distorsión con Retículas**

Añade la siguiente función en `index.js` para distorsionar la imagen:

```javascript
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

applyDistortion('input.jpg', 'distorted.png');
```

Ejecuta el script con:

```sh
node index.js
```


## 🔄 Paso 3: Aplicar la Transformación Inversa

Agrega la siguiente función a index.js para restaurar la imagen original:

```javascript
async function reverseDistortion(inputPath, outputPath, gridSize = 20) {
    const img = await loadImage(inputPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    const cols = Math.ceil(img.width / gridSize);
    const rows = Math.ceil(img.height / gridSize);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let dx = x * gridSize;
            let dy = y * gridSize;
            let sx = dx - Math.sin(y * 0.5) * 5;
            let sy = dy - Math.cos(x * 0.5) * 5;

            ctx.drawImage(img, sx, sy, gridSize, gridSize, dx, dy, gridSize, gridSize);
        }
    }

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log('Imagen restaurada guardada en:', outputPath);
}

reverseDistortion('distorted.png', 'restored.png');

```
Ejecuta el script nuevamente:

node index.js


[-> Ver Explicación Simple de la Implementación](https://github.com/jhoney787813/laboratorio_reticulas_y_distorsiones/blob/main/explicacion.md)

---

## 📚 **Conclusión**
Hemos aplicado una distorsión en la imagen basada en retículas y luego la hemos revertido exitosamente. Este proceso puede ser utilizado para ocultar información en imágenes y luego recuperarla con la transformación inversa.

---

## 📌 **Referencias**
- **Node.js**: https://nodejs.org/
- **Sharp (Manipulación de imágenes)**: https://sharp.pixelplumbing.com/
- **Canvas para Node.js**: https://www.npmjs.com/package/canvas
- **Aplicaciones en Esteganografía**: https://www.sciencedirect.com/topics/computer-science/steganography

