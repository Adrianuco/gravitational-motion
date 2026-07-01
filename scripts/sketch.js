let universo;
let sol;
let tierra;
let contadorCuerposAgregados = 0;

const ESCALA = 1e-9;
// 1 metro real = 0.000000001 px

let trayectoria = [];

function setup() {
  const canvas = createCanvas(1000, 700);
  canvas.parent("canvas-container");

  inicializarFormularioCuerpo();

  universo = new Universo();

  // SOL
  sol = new CuerpoCeleste("Sol", 1.989e30, 0, 0, 0, 0, 30, "yellow");

  // TIERRA
  tierra = new CuerpoCeleste(
    "Tierra",
    5.972e24,

    // distancia al Sol
    150e9,
    0,

    // velocidad orbital
    0,
    29885,

    10,
    "blue",
  );

  luna = new CuerpoCeleste(
    "Luna",
    7.342e22,
    150e9 + 384400e3,
    0,
    tierra.vx,
    tierra.vy + 1022,
    5,
    "gray",
  );

  universo.agregarCuerpo(sol);
  universo.agregarCuerpo(tierra);
  universo.agregarCuerpo(luna);

  universo.pausado = true;
  pausar();
}

function draw() {
  background(10);

  translate(width / 2, height / 2);

  universo.actualizar();

  dibujarTrayectoria();

  for (let cuerpo of universo.cuerpos) {
    dibujarCuerpo(cuerpo);
  }
}

function pausar() {
  const canvas = document.getElementById("defaultCanvas0");

  canvas.addEventListener("click", () => {
    universo.pausado = !universo.pausado;
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

  circle(cuerpo.x * ESCALA, cuerpo.y * ESCALA, cuerpo.radio);
}

function dibujarTrayectoria() {
  trayectoria.push({
    x: tierra.x * ESCALA,
    y: tierra.y * ESCALA,
  });

  stroke(150);
  noFill();

  beginShape();

  for (let punto of trayectoria) {
    vertex(punto.x, punto.y);
  }

  endShape();
}
