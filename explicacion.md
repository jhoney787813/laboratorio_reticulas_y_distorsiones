🎬 Explicación Simple de la Implementación de Código de Retículas

📌 ¿Qué hace este código?
Este código toma una imagen, la divide en cuadritos (retículas) y los mueve un poco en diferentes direcciones para distorsionarla. Luego, con el mismo patrón, podemos revertir la distorsión y recuperar la imagen original.

📌 ¿Cómo funciona?

Cargamos la imagen 📷

Usamos sharp y canvas para leer la imagen y prepararla para su transformación.
Aplicamos la distorsión 🎨

Separamos la imagen en pequeños bloques (como un rompecabezas).
Movemos cada bloque usando funciones matemáticas (sin y cos) para que se vean desplazados.
Guardamos la imagen distorsionada.
Recuperamos la imagen original 🔄

Si conocemos la misma fórmula usada para distorsionar, podemos invertir el proceso y reconstruir la imagen original.
📌 ¿Para qué sirve?

Seguridad digital 🔒: Se puede usar para esconder información en imágenes.

Esteganografía 🕵️‍♂️: Permite ocultar datos dentro de imágenes de forma que solo quien sepa la clave pueda recuperarlos.

Forense digital 🧐: Los investigadores pueden analizar imágenes manipuladas para detectar cambios o revertir modificaciones.

📌 Ejemplo práctico
Imagina que tomas una foto y la distorsionas con este código antes de compartirla. Solo alguien con el mismo código puede verla correctamente. ¡Es como un filtro de privacidad en las imágenes!

## Explicaciòn de algoritmos

# Algoritmos Utilizados en la Distorsión con Retículas

## 📌 Introducción
Este documento explica los algoritmos utilizados para distorsionar y recuperar imágenes mediante retículas y transformaciones trigonométricas. Este método permite ocultar información visualmente sin pérdida de datos.

## 1️⃣ Algoritmo de División en Retículas

### **¿Qué hace?**
Este algoritmo divide la imagen en pequeños bloques o "celdas" de tamaño fijo (por ejemplo, 20x20 píxeles). Luego, mueve cada celda a una nueva posición calculada matemáticamente.

### **Pasos**
1. **Definir el tamaño de la cuadrícula (`gridSize`)**  
   - Ejemplo: Si la imagen es de 400x400 píxeles y `gridSize = 20`, se divide en una matriz de **20x20 celdas**.

2. **Recorrer cada celda y aplicar la transformación**  
   - Para cada celda, obtenemos su posición original `(sx, sy)`.
   - Calculamos su nueva posición `(dx, dy)`.
   - Copiamos los píxeles desde `(sx, sy)` hasta `(dx, dy)`, desplazando el contenido de la imagen.

---

## 2️⃣ Algoritmo de Transformación con Seno y Coseno

### **¿Qué hace?**
Se usa una función matemática para mover cada celda de manera no aleatoria, pero sí en un patrón predecible basado en **seno** (`sin`) y **coseno** (`cos`).

### **Fórmulas Utilizadas**
```javascript
 dx = sx + Math.sin(y * 0.5) * 5;
 dy = sy + Math.cos(x * 0.5) * 5;
```
- `Math.sin(y * 0.5) * 5` → Mueve las celdas horizontalmente según su posición en la imagen.
- `Math.cos(x * 0.5) * 5` → Mueve las celdas verticalmente.
- El factor `5` controla la magnitud del desplazamiento.

### **Ejemplo Visual de Transformación**
Si `sin(y)` y `cos(x)` generan valores entre `-1` y `1`, multiplicarlos por `5` crea un desplazamiento en ambas direcciones, produciendo una especie de efecto ondulado.

---

## 3️⃣ Algoritmo de Reversión de la Distorsión

### **¿Cómo recuperamos la imagen?**
Si conocemos la misma función matemática usada para distorsionar, podemos invertir el proceso aplicando las mismas fórmulas en sentido contrario.

1. **Volver a recorrer la imagen en la misma cuadrícula**
2. **Mover las celdas a sus posiciones originales usando la inversa del desplazamiento**

Como la distorsión es un **mapeo determinista** (cada píxel tiene una transformación fija), podemos revertirla con precisión.

---

## 📌 Resumen de los Algoritmos

| Algoritmo | Propósito | Característica Clave |
|-----------|----------|----------------------|
| **División en Retículas** | Separa la imagen en bloques pequeños | Estructura la distorsión en partes manejables |
| **Transformación con Seno y Coseno** | Mueve cada bloque en un patrón matemático | Asegura que la distorsión sea predecible y reversible |
| **Reversión de la Distorsión** | Recupera la imagen original aplicando la transformación inversa | Garantiza que la imagen pueda ser reconstruida |

Con estos algoritmos, logramos ocultar información visualmente y luego restaurarla sin pérdida de calidad.

