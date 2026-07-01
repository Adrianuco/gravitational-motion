# Simulación de Movimiento Gravitacional

> Simulación interactiva de órbitas y atracción gravitatoria de cuerpos celestes en tiempo real, desarrollada con JavaScript y p5.js utilizando la Ley de Gravitación Universal de Newton.

---

## 📖 Descripción

Este proyecto implementa una simulación orbital interactiva que permite visualizar el comportamiento de múltiples cuerpos celestes bajo la influencia de la fuerza gravitatoria.

La simulación permite:

- **Estrella Central Personalizable**: Modificar el nombre, la masa, el radio y el color de la estrella central (por defecto, el Sol).
- **Agregar Cuerpos Celestes**: Configurar masa, distancia inicial, velocidad inicial, radio y color para añadir nuevos cuerpos.
- **Planetas del Sistema Solar**: Incorporar de forma rápida y sencilla los planetas del Sistema Solar.
- **Visualización de Trayectorias**: Dibujar el rastro orbital recorrido por cada cuerpo celeste.
- **Vectores Físicos**: Visualizar los vectores de velocidad (color verde) y fuerza gravitatoria (color rojo) en tiempo real al pausar la simulación.
- **Escalado Dinámico**: Ajustar automáticamente la escala del canvas para mantener visibles todos los cuerpos celestes activos en el sistema.
- **Control de Tiempo e Interacción**: Pausar o reanudar la simulación simplemente haciendo clic sobre el canvas, y observar el tiempo transcurrido medido en días.

---

## 🎯 Objetivo del Proyecto

Demostrar mediante simulación los principios físicos de:

- **Ley de Gravitación Universal de Newton**.
- **Comportamiento Vectorial** de fuerzas de atracción mutua y velocidad orbital.

---

## ⚙️ Tecnologías Utilizadas

### Lenguajes e Interfaz

- **JavaScript**: Lógica física, clases y control de la simulación.
- **HTML5**: Estructura de la web y controles de entrada de datos.
- **CSS**: Diseño de la interfaz de usuario.

### Librerías

- **p5.js**: Renderizado gráfico interactivo y manejo del canvas.

### Herramientas

- Visual Studio Code
- GitHub

---

## 🧠 Fundamento Físico

### Ley de Gravitación Universal

La atracción mutua entre dos cuerpos cualesquiera con masa se modela según la ecuación de Newton:

```txt
F = G · (m₁ · m₂) / d²
```

Donde:

- `G` es la constante de gravitación universal: `6.67 × 10⁻¹¹ N·m²/kg²`.
- `m₁` y `m₂` son las masas de los cuerpos celestes.
- `d` es la distancia euclidiana entre sus centros.

---

### Componentes Vectoriales de la Fuerza

Para cada par de cuerpos, la fuerza de atracción se descompone en los ejes X e Y:

```txt
dx = x₂ - x₁
dy = y₂ - y₁
d = √[dx² + dy²]

Fx = F · (dx / d)
Fy = F · (dy / d)
```

---

### Aceleración, Velocidad y Posición (Método de Euler)

Para cada paso de tiempo `dt`

**1. Aceleración**

```txt
ax = Fx / m
ay = Fy / m
```

**2. Velocidad**

```txt
vx += ax · dt
vy += ay · dt
```

**3. Posición**

```txt
x += vx · dt
y += vy · dt
```

---

## 🏗️ Estructura del Proyecto

```text
gravitational-movement/
│
├── index.html
│
├── scripts/
│   ├── objects.js
│   └── sketch.js
│
├── style.css
│
└── README.md
```

### objects.js

Contiene la definición de las clases que gobiernan la simulación física:

- **`CuerpoCeleste`**: Administra el estado de un cuerpo
- **`Universo`**: Modela el espacio que contiene los cuerpos, calcula las fuerzas de atracción mutua de manera cruzada para todos los elementos y actualiza sus posiciones e incrementa el contador de tiempo `t` utilizando un diferencial de tiempo `dt`.

### sketch.js

Controla la interacción con la página web y el renderizado con p5.js:

- Inicializa el canvas.
- Administra el bucle de renderizado `draw()`, aplicando el escalado dinámico.
- Dibuja los cuerpos celestes, sus trayectorias y los vectores de velocidad (verde) y fuerza (rojo) al estar pausado.
- Maneja los eventos de los botones para agregar planetas predeterminados, actualizar el sol o restablecer la simulación a su estado inicial.

---

## 🚀 Cómo Ejecutar el Proyecto

### 1. Clonar el repositorio

```txt
git clone https://github.com/Adrianuco/gravitational-movement.git
```

### 2. Abrir el proyecto

```txt
cd gravitational-movement
```

### 3. Iniciar un servidor local

- Con la extensión **Live Server** de VS Code: haz clic derecho en `index.html` y selecciona **Open with Live Server**.
- O con Python en la terminal:
  ```txt
  python -m http.server 8000
  ```
  y abre `http://localhost:8000` en tu navegador.

---

## 🎮 Uso

1. **Configurar el Sol**: Cambia el nombre, la masa, el radio o el color del astro central si lo deseas y presiona **Actualizar Estrella**.
2. **Agregar Planetas Reales**: Haz clic sobre cualquiera de los planetas del Sistema Solar (por ejemplo, _Tierra_ o _Marte_) para añadirlos al instante con sus características orbitales reales.
3. **Agregar Planetas Personalizados**: Llena el formulario de "Agregar Cuerpo Celeste" especificando su masa, distancia a la estrella (en metros), velocidad tangencial inicial (en m/s), tamaño y color. Presiona **Agregar**.
4. **Pausar/Reanudar**: Haz clic directamente sobre la zona del canvas negro para pausar la simulación y observar detalladamente los vectores de velocidad y fuerza gravitatoria. Haz clic de nuevo para reanudar.
5. **Restablecer**: Presiona el botón **Restablecer** en cualquier momento para reiniciar el universo y limpiar todos los planetas.

---

## 📊 Características Implementadas

- [x] Atracción gravitatoria mutua basada en física de Newton.
- [x] Clases de JavaScript organizadas (`CuerpoCeleste` y `Universo`).
- [x] Planetas del Sistema Solar preconfigurados con datos reales.
- [x] Visualización en tiempo real del rastro orbital.
- [x] Representación vectorial de velocidad y fuerza.
- [x] Auto-escalado del canvas para mantener los cuerpos visibles.
- [x] Contador de tiempo simulado en días.

---

## 📚 Referencias

- [Documentación oficial de p5.js](https://p5js.org/reference/)
- Ley de Gravitación Universal de Isaac Newton.

---

## 👨‍💻 Autores

- Adriano Almanza
- Denis Gabriel
- Yader García

Desarrollado como proyecto académico para la asignatura de Física Aplicada.
