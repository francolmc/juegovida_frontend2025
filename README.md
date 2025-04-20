# **Ejercicio: Implementación del Juego de la Vida en JavaScript**
#### **Objetivo**

Desarrollar una aplicación web del **Juego de la Vida** en **JavaScript**, con una interfaz que permita:
- Definir el tamaño del tablero mediante **inputs**.
- Iniciar y detener la simulación con botones de **"Jugar"** y **"Detener"**.
- Mostrar la evolución de las células en un tablero visual.

#### **Reglas del Juego**

El juego de la vida trata de simular el comportamiento y la vida de un grupo de células que van cambiando sus estados dependiendo de varias reglas, las cuales se detallan a continuación:

1. **Una célula viva con menos de 2 vecinos vivos muere** (por soledad).
2. **Una célula viva con 2 o 3 vecinos vivos sobrevive**.
3. **Una célula viva con más de 3 vecinos vivos muere** (por sobrepoblación).
4. **Una célula muerta con exactamente 3 vecinos vivos revive** (reproducción).

La definición sobre que celdas del tablero serán células vivas inicialmente podrá ser mediante una función aleatoria o que le usuario tenga la posibilidad de marcar con click las celdas que serán células vivas.

---

### **Estructura del Proyecto**

Tu aplicación web debe contener:
1. **HTML**
   - Una sección para configurar el tamaño del tablero.
   - Una sección para definir si se requiere que las células se generaran de forma aleatoria o mediante clicks.
   - Un botón de **"Jugar"** y otro de **"Detener"**.
   - Un elemento `<canvas>` o una tabla `<div>` para visualizar la cuadrícula.

2. **CSS**
   - Estilos para el tablero y las células (puedes usar colores o bordes para diferenciarlas).
   - Diseño responsive para ajustar la vista en distintos dispositivos.

3. **JavaScript**
   - Inicialización del tablero con el tamaño seleccionado.
   - Función para aplicar las reglas del **Juego de la Vida** en cada iteración.
   - Lógica para actualizar la vista en pantalla.
   - Manejo de eventos para los botones de **Jugar** y **Detener**.

