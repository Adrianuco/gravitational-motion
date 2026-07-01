let universo;
let sol;
let tierra;
let contadorCuerposAgregados = 0;

let escala = 1e-9;
// 1 metro real = escala px

function setup() {
  const canvas = createCanvas(1000, 700);
  canvas.parent("canvas-container");

  inicializarFormularioCuerpo();
  inicializarPlanetasPredeterminados();
  inicializarFormularioEstrella();

  const btnRestablecer = document.getElementById("btnRestablecer");
  if (btnRestablecer) {
    btnRestablecer.addEventListener("click", restablecerSimulacion);
  }

  universo = new Universo();

  // SOL (Estrella central)
  sol = new CuerpoCeleste("Sol", 1.989e30, 0, 0, 0, 0, 30, "#ffcc00");

  universo.agregarCuerpo(sol);

  actualizarEscala();

  universo.pausado = true;
  pausar();
}

function draw() {
  background(10);

  translate(width / 2, height / 2);

  universo.actualizar();

  // Actualizar indicador de tiempo
  const cardTiempo = document.querySelector(".card-tiempo");
  if (cardTiempo) {
    cardTiempo.textContent = `Tiempo: ${universo.t} s`;
  }

  // Dibujar trayectorias y cuerpos
  for (let cuerpo of universo.cuerpos) {
    if (cuerpo !== sol) {
      dibujarTrayectoriaDeCuerpo(cuerpo);
    }
    dibujarCuerpo(cuerpo);
  }
}

function pausar() {
  const canvas = document.getElementById("defaultCanvas0");

  canvas.addEventListener("click", () => {
    universo.pausado = !universo.pausado;
  });
}

const DATOS_PLANETAS = {
  mercurio: { nombre: "Mercurio", masa: 3.285e23, distancia: 57.9e9, velocidad: 47870, radio: 5, color: "#888888" },
  venus: { nombre: "Venus", masa: 4.867e24, distancia: 108.2e9, velocidad: 35020, radio: 8, color: "#e3bb76" },
  tierra: { nombre: "Tierra", masa: 5.972e24, distancia: 149.6e9, velocidad: 29780, radio: 10, color: "#2f6fed" },
  marte: { nombre: "Marte", masa: 6.39e23, distancia: 227.9e9, velocidad: 24070, radio: 6, color: "#c1440e" },
  jupiter: { nombre: "Júpiter", masa: 1.898e27, distancia: 778.5e9, velocidad: 13070, radio: 22, color: "#b07f35" },
  saturno: { nombre: "Saturno", masa: 5.683e26, distancia: 1434e9, velocidad: 9690, radio: 18, color: "#e2bf7d" },
  urano: { nombre: "Urano", masa: 8.681e25, distancia: 2871e9, velocidad: 6810, radio: 14, color: "#4b70dd" },
  neptuno: { nombre: "Neptuno", masa: 1.024e26, distancia: 4495e9, velocidad: 5430, radio: 14, color: "#274687" }
};

function inicializarPlanetasPredeterminados() {
  const botones = document.querySelectorAll(".planeta-btn");
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const key = boton.getAttribute("data-planeta");
      const datos = DATOS_PLANETAS[key];
      if (datos && universo) {
        // distancia en el eje X, velocidad inicial en el eje Y (órbita circular)
        const cuerpo = new CuerpoCeleste(
          datos.nombre,
          datos.masa,
          datos.distancia,
          0,
          0,
          datos.velocidad,
          datos.radio,
          datos.color
        );
        universo.agregarCuerpo(cuerpo);
        actualizarEscala();
        contadorCuerposAgregados += 1;
        actualizarMensajeAgregado(
          `Cuerpo agregado: ${datos.nombre} (#${contadorCuerposAgregados})`
        );
      }
    });
  });
}

function inicializarFormularioCuerpo() {
  const botonAgregar = document.getElementById("btnAgregarCuerpo");

  if (!botonAgregar) {
    return;
  }

  botonAgregar.addEventListener("click", agregarCuerpoDesdeFormulario);
}

function agregarCuerpoDesdeFormulario() {
  if (!universo) {
    return;
  }

  const nombre = obtenerTexto("cuerpoNombre", "Cuerpo");
  const masa = obtenerNumero("cuerpoMasa", 1e20);
  const x = obtenerNumero("distancia", 0);
  const y = 0;
  const vx = 0;
  const vy = obtenerNumero("velocidad", 0);
  const radio = Math.max(1, obtenerNumero("cuerpoRadio", 8));
  const color = obtenerTexto("cuerpoColor", "#6ea8fe");

  const cuerpo = new CuerpoCeleste(nombre, masa, x, y, vx, vy, radio, color);
  universo.agregarCuerpo(cuerpo);
  actualizarEscala();

  contadorCuerposAgregados += 1;
  actualizarMensajeAgregado(
    `Cuerpo agregado: ${nombre} (#${contadorCuerposAgregados})`,
  );
}

function obtenerNumero(id, valorPorDefecto) {
  const input = document.getElementById(id);

  if (!input || input.value.trim() === "") {
    return valorPorDefecto;
  }

  const valor = Number(input.value);
  return Number.isFinite(valor) ? valor : valorPorDefecto;
}

function obtenerTexto(id, valorPorDefecto) {
  const input = document.getElementById(id);

  if (!input) {
    return valorPorDefecto;
  }

  const valor = input.value.trim();
  return valor === "" ? valorPorDefecto : valor;
}

function actualizarMensajeAgregado(texto) {
  const mensaje = document.getElementById("agregado-message");

  if (!mensaje) {
    return;
  }

  mensaje.textContent = texto;
}

function dibujarCuerpo(cuerpo) {
  fill(cuerpo.color);
  noStroke();

  circle(cuerpo.x * escala, cuerpo.y * escala, cuerpo.radio);
}

function dibujarTrayectoriaDeCuerpo(cuerpo) {
  if (!universo.pausado) {
    cuerpo.trayectoria.push({
      x: cuerpo.x,
      y: cuerpo.y
    });

    if (cuerpo.trayectoria.length > 800) {
      cuerpo.trayectoria.shift();
    }
  }

  stroke(cuerpo.color);
  strokeWeight(1);
  noFill();

  beginShape();
  for (let punto of cuerpo.trayectoria) {
    vertex(punto.x * escala, punto.y * escala);
  }
  endShape();
}

function actualizarEscala() {
  if (!universo || universo.cuerpos.length === 0) return;

  let maxDist = 0;
  for (let cuerpo of universo.cuerpos) {
    let d = Math.max(Math.abs(cuerpo.x), Math.abs(cuerpo.y));
    if (d > maxDist) {
      maxDist = d;
    }
  }

  if (maxDist > 0) {
    // El radio máximo visible es el mínimo entre mitad del ancho y del alto.
    // Damos un 15% de margen (multiplicador 0.85) para que no queden pegados al borde.
    const maxVisiblePx = Math.min(width, height) / 2 * 0.85;
    escala = maxVisiblePx / maxDist;
  }
}

function restablecerSimulacion() {
  universo = new Universo();
  contadorCuerposAgregados = 0;

  const form = document.querySelector(".data-container");
  if (form) {
    form.reset();
  }

  const nombre = obtenerTexto("estrellaNombre", "Sol");
  const masa = obtenerNumero("estrellaMasa", 1.989e30);
  const radio = Math.max(1, obtenerNumero("estrellaRadio", 30));
  const color = obtenerTexto("estrellaColor", "#ffcc00");

  sol = new CuerpoCeleste(nombre, masa, 0, 0, 0, 0, radio, color);
  universo.agregarCuerpo(sol);

  actualizarEscala();
  actualizarMensajeAgregado("");

  universo.pausado = true;
}

function inicializarFormularioEstrella() {
  const btn = document.getElementById("btnActualizarEstrella");
  if (btn) {
    btn.addEventListener("click", actualizarEstrellaDesdeFormulario);
  }
}

function actualizarEstrellaDesdeFormulario() {
  if (!sol) return;

  const nombre = obtenerTexto("estrellaNombre", "Sol");
  const masa = obtenerNumero("estrellaMasa", 1.989e30);
  const radio = Math.max(1, obtenerNumero("estrellaRadio", 30));
  const color = obtenerTexto("estrellaColor", "#ffcc00");

  sol.nombre = nombre;
  sol.masa = masa;
  sol.radio = radio;
  sol.color = color;

  const msg = document.getElementById("estrella-message");
  if (msg) {
    msg.textContent = "Estrella actualizada con éxito.";
    setTimeout(() => { msg.textContent = ""; }, 3000);
  }

  actualizarEscala();
}



