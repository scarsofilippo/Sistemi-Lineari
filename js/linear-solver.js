/**
 * SISTEMI LINEARI - Interactive 2-Lines Canvas Visualizer
 * Disegna 2 rette cartesiane a1*x + b1*y = c1 e a2*x + b2*y = c2
 * e ne calcola graficamente l'intersezione.
 */

class LinearSystemVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.view = { xMin: -7, xMax: 7, yMin: -5, yMax: 5 };

    // Coefficienti iniziali:
    // r1: 2x + y = 4  -> y = -2x + 4
    // r2: x - y = -1  -> y = x + 1
    // Soluzione: 3x = 3 -> x=1, y=2
    this.coeffs = {
      a1: 2, b1: 1, c1: 4,
      a2: 1, b2: -1, c2: -1
    };

    this.init();
  }

  init() {
    this.setupResize();
    this.setupInputs();
    this.draw();
  }

  setupResize() {
    const resize = () => {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
      this.displayWidth = rect.width;
      this.displayHeight = rect.height;
      this.draw();
    };

    window.addEventListener('resize', resize);
    resize();
  }

  setupInputs() {
    ['a1', 'b1', 'c1', 'a2', 'b2', 'c2'].forEach(key => {
      const el = document.getElementById(`slider_${key}`);
      const badge = document.getElementById(`badge_${key}`);
      if (el) {
        el.value = this.coeffs[key];
        el.addEventListener('input', (e) => {
          this.coeffs[key] = parseFloat(e.target.value);
          if (badge) badge.textContent = this.coeffs[key];
          this.draw();
        });
      }
    });

    window.setSystemPreset = (a1, b1, c1, a2, b2, c2) => {
      this.coeffs = { a1, b1, c1, a2, b2, c2 };
      ['a1', 'b1', 'c1', 'a2', 'b2', 'c2'].forEach(key => {
        const el = document.getElementById(`slider_${key}`);
        const badge = document.getElementById(`badge_${key}`);
        if (el) el.value = this.coeffs[key];
        if (badge) badge.textContent = this.coeffs[key];
      });
      this.draw();
    };
  }

  worldToScreen(x, y) {
    const w = this.displayWidth;
    const h = this.displayHeight;
    const sx = ((x - this.view.xMin) / (this.view.xMax - this.view.xMin)) * w;
    const sy = h - ((y - this.view.yMin) / (this.view.yMax - this.view.yMin)) * h;
    return { x: sx, y: sy };
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.displayWidth;
    const h = this.displayHeight;

    // Colori Dark Slate Neon
    const colors = {
      bg: '#090d16',
      grid: 'rgba(255, 255, 255, 0.07)',
      axis: '#64748b',
      text: '#94a3b8',
      r1: '#38bdf8',     // Sky Blue neon
      r2: '#f472b6',     // Pink / Rose neon
      point: '#fbbf24',  // Amber / Gold
    };

    // Pulizia e sfondo
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, w, h);

    // Griglia cartesiana
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.grid;
    ctx.font = '10px monospace';
    ctx.fillStyle = colors.text;

    for (let x = Math.ceil(this.view.xMin); x <= Math.floor(this.view.xMax); x++) {
      if (x === 0) continue;
      const pt = this.worldToScreen(x, 0);
      ctx.beginPath();
      ctx.moveTo(pt.x, 0);
      ctx.lineTo(pt.x, h);
      ctx.stroke();
      ctx.fillText(x.toString(), pt.x - 4, pt.y + 14);
    }

    for (let y = Math.ceil(this.view.yMin); y <= Math.floor(this.view.yMax); y++) {
      if (y === 0) continue;
      const pt = this.worldToScreen(0, y);
      ctx.beginPath();
      ctx.moveTo(0, pt.y);
      ctx.lineTo(w, pt.y);
      ctx.stroke();
      ctx.fillText(y.toString(), pt.x + 6, pt.y + 3);
    }

    // Assi cartesiani
    const origin = this.worldToScreen(0, 0);
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = colors.axis;

    // Asse X
    ctx.beginPath();
    ctx.moveTo(0, origin.y);
    ctx.lineTo(w, origin.y);
    ctx.stroke();

    // Asse Y
    ctx.beginPath();
    ctx.moveTo(origin.x, 0);
    ctx.lineTo(origin.x, h);
    ctx.stroke();

    // Etichette assi
    ctx.fillStyle = colors.axis;
    ctx.fillText('x', w - 12, origin.y - 8);
    ctx.fillText('y', origin.x + 8, 14);
    ctx.fillText('0', origin.x - 10, origin.y + 14);

    // Funzione helper per disegnare retta ax + by = c
    const drawLine = (a, b, c, color, isDashed = false) => {
      ctx.save();
      ctx.lineWidth = 2.8;
      ctx.strokeStyle = color;
      if (isDashed) ctx.setLineDash([6, 6]);

      ctx.beginPath();
      if (Math.abs(b) > 0.0001) {
        // y = (c - ax) / b
        const x1 = this.view.xMin;
        const y1 = (c - a * x1) / b;
        const x2 = this.view.xMax;
        const y2 = (c - a * x2) / b;
        const pt1 = this.worldToScreen(x1, y1);
        const pt2 = this.worldToScreen(x2, y2);
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
      } else if (Math.abs(a) > 0.0001) {
        // x = c / a (Retta verticale)
        const xVal = c / a;
        const pt1 = this.worldToScreen(xVal, this.view.yMin);
        const pt2 = this.worldToScreen(xVal, this.view.yMax);
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const { a1, b1, c1, a2, b2, c2 } = this.coeffs;

    // Disegna Retta 1 e Retta 2
    drawLine(a1, b1, c1, colors.r1);
    drawLine(a2, b2, c2, colors.r2);

    // Calcolo intersezione e determinanti
    const D = a1 * b2 - a2 * b1;
    const Dx = c1 * b2 - c2 * b1;
    const Dy = a1 * c2 - a2 * c1;

    const infoStatus = document.getElementById('geoStatusText');
    const infoPoint = document.getElementById('geoPointText');

    if (Math.abs(D) > 0.000001) {
      const x = Dx / D;
      const y = Dy / D;

      // Se il punto cade nell'intervallo visibile, disegnalo
      if (x >= this.view.xMin && x <= this.view.xMax && y >= this.view.yMin && y <= this.view.yMax) {
        const pt = this.worldToScreen(x, y);

        // Linee tratteggiate verso gli assi
        ctx.save();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = colors.text;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pt.x, origin.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.lineTo(origin.x, pt.y);
        ctx.stroke();
        ctx.restore();

        // Cerchio punto intersezione
        ctx.fillStyle = colors.point;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Etichetta P(x, y)
        const label = `P(${x.toFixed(2)}, ${y.toFixed(2)})`;
        ctx.fillStyle = '#1e293b';
        const txtW = ctx.measureText(label).width + 12;
        ctx.fillRect(pt.x + 8, pt.y - 20, txtW, 20);
        ctx.strokeStyle = colors.point;
        ctx.strokeRect(pt.x + 8, pt.y - 20, txtW, 20);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, pt.x + 14, pt.y - 6);
      }

      if (infoStatus) infoStatus.innerHTML = '<span style="color: #34d399; font-weight: 700;">Rette Incidenti: Sistema Determinato</span> (D ≠ 0)';
      if (infoPoint) infoPoint.innerHTML = `Punto di Intersezione Unico: <strong>P(${x.toFixed(2)}, ${y.toFixed(2)})</strong>`;
    } else {
      if (Math.abs(Dx) < 0.000001 && Math.abs(Dy) < 0.000001) {
        if (infoStatus) infoStatus.innerHTML = '<span style="color: #fbbf24; font-weight: 700;">Rette Coincidenti: Sistema Indeterminato</span>';
        if (infoPoint) infoPoint.innerHTML = 'Le due equazioni rappresentano la medesima retta: <strong>infiniti punti comuni</strong>.';
      } else {
        if (infoStatus) infoStatus.innerHTML = '<span style="color: #f87171; font-weight: 700;">Rette Parallele Distinte: Sistema Impossibile</span>';
        if (infoPoint) infoPoint.innerHTML = 'Le due rette hanno la stessa pendenza ma intercette diverse: <strong>nessun punto comune</strong>.';
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('linearCanvas')) {
    window.linearVis = new LinearSystemVisualizer('linearCanvas');
  }
});
