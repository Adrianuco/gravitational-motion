class CuerpoCeleste {
  constructor(nombre, masa, x, y, vx, vy, radio, color) {
    this.nombre = nombre;
    this.masa = masa;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.ax = 0;
    this.ay = 0;
    this.radio = radio;
    this.color = color;
    this.trayectoria = [];
  }

  calcularDistancia(otroCuerpo) {
    const dx = otroCuerpo.x - this.x;
    const dy = otroCuerpo.y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  calcularFuerzaGravitatoria(otroCuerpo) {
    const G = 6.67e-11;

    const dx = otroCuerpo.x - this.x;
    const dy = otroCuerpo.y - this.y;

    const distancia = Math.sqrt(dx ** 2 + dy ** 2);

    if (distancia === 0) {
      return { fx: 0, fy: 0 };
    }

    const rx = dx / distancia;
    const ry = dy / distancia;

    const fuerza = (G * (this.masa * otroCuerpo.masa)) / distancia ** 2;

    return {
      fx: fuerza * rx,
      fy: fuerza * ry,
    };
  }

  aplicarFuerza(F) {
    this.ax += F.fx / this.masa;
    this.ay += F.fy / this.masa;
  }

  actualizarVelocidad(dt) {
    this.vx += this.ax * dt;
    this.vy += this.ay * dt;
  }

  actualizarPosicion(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  reiniciarAceleracion() {
    this.ax = 0;
    this.ay = 0;
  }

  actualizar(dt) {
    this.actualizarVelocidad(dt);
    this.actualizarPosicion(dt);
  }
}

class Universo {
  constructor() {
    this.cuerpos = [];
    this.dt = 86400 / 2;
    this.t = 0;
    this.pausado = true;
  }

  agregarCuerpo(cuerpo) {
    this.cuerpos.push(cuerpo);
  }

  calcularFuerzas() {
    for (let cuerpo of this.cuerpos) {
      cuerpo.reiniciarAceleracion();
    }

    for (let i = 0; i < this.cuerpos.length; i++) {
      for (let j = i + 1; j < this.cuerpos.length; j++) {
        const cuerpoA = this.cuerpos[i];
        const cuerpoB = this.cuerpos[j];

        const fuerza = cuerpoA.calcularFuerzaGravitatoria(cuerpoB);

        cuerpoA.aplicarFuerza(fuerza);
        cuerpoB.aplicarFuerza({ fx: -fuerza.fx, fy: -fuerza.fy });
      }
    }
  }

  actualizarCuerpos() {
    for (let cuerpo of this.cuerpos) {
      cuerpo.actualizar(this.dt);
    }
  }

  actualizar() {
    if (this.pausado) return;

    this.calcularFuerzas();
    this.actualizarCuerpos();
    this.t += this.dt;
  }
}
