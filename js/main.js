/**
 * SISTEMI LINEARI - Main JavaScript & Risolutore 2x2 Istantaneo
 */

document.addEventListener('DOMContentLoaded', () => {
  initHubSolver();
});

function initHubSolver() {
  const a1 = document.getElementById('a1Input');
  const b1 = document.getElementById('b1Input');
  const c1 = document.getElementById('c1Input');
  const a2 = document.getElementById('a2Input');
  const b2 = document.getElementById('b2Input');
  const c2 = document.getElementById('c2Input');
  const resultBox = document.getElementById('hubSolverResult');

  if (!a1 || !b1 || !c1 || !a2 || !b2 || !c2 || !resultBox) return;

  function toFraction(val) {
    if (Math.abs(val - Math.round(val)) < 0.0001) return Math.round(val).toString();
    for (let d = 2; d <= 20; d++) {
      const n = Math.round(val * d);
      if (Math.abs(val - n / d) < 0.001) {
        return `${n}/${d}`;
      }
    }
    return val.toFixed(2);
  }

  function solve() {
    const v_a1 = parseFloat(a1.value) || 0;
    const v_b1 = parseFloat(b1.value) || 0;
    const v_c1 = parseFloat(c1.value) || 0;
    const v_a2 = parseFloat(a2.value) || 0;
    const v_b2 = parseFloat(b2.value) || 0;
    const v_c2 = parseFloat(c2.value) || 0;

    // Calcolo determinanti di Cramer
    const D = v_a1 * v_b2 - v_a2 * v_b1;
    const Dx = v_c1 * v_b2 - v_c2 * v_b1;
    const Dy = v_a1 * v_c2 - v_a2 * v_c1;

    let html = '';

    if (Math.abs(D) > 0.000001) {
      const x = Dx / D;
      const y = Dy / D;
      html = `
        <div style="color: #34d399; font-weight: 700; font-size: 1rem; margin-bottom: 4px;">
          ✓ SISTEMA DETERMINATO (1 Soluzione Unica)
        </div>
        <div>Determinante Principale: <strong>D = ${D.toFixed(2).replace(/\.00$/, '')}</strong> (D ≠ 0)</div>
        <div>Determinanti Parziali: Dx = ${Dx.toFixed(2).replace(/\.00$/, '')}, Dy = ${Dy.toFixed(2).replace(/\.00$/, '')}</div>
        <div style="margin-top: 6px; padding: 6px 10px; background: rgba(16, 185, 129, 0.15); border-left: 3px solid #10b981; border-radius: 4px;">
          Soluzione: <strong>(x, y) = (${toFraction(x)}, ${toFraction(y)})</strong> [circa (${x.toFixed(2)}, ${y.toFixed(2)})]
        </div>
        <div style="font-size: 0.82rem; color: #94a3b8; margin-top: 4px;">
          Interpretazione geometrica: le due rette sono <strong>incidenti</strong> nel punto P(${toFraction(x)}, ${toFraction(y)}).
        </div>
      `;
    } else {
      // D = 0
      if (Math.abs(Dx) < 0.000001 && Math.abs(Dy) < 0.000001) {
        html = `
          <div style="color: #fbbf24; font-weight: 700; font-size: 1rem; margin-bottom: 4px;">
            ⚠️ SISTEMA INDETERMINATO (Infinite Soluzioni)
          </div>
          <div>D = 0, Dx = 0, Dy = 0</div>
          <div style="margin-top: 6px; padding: 6px 10px; background: rgba(245, 158, 11, 0.15); border-left: 3px solid #f59e0b; border-radius: 4px;">
            I coefficienti e i termini noti sono proporzionali: le due rette sono <strong>coincidenti</strong>.
          </div>
          <div style="font-size: 0.82rem; color: #94a3b8; margin-top: 4px;">
            Ogni punto della retta è una soluzione per il sistema.
          </div>
        `;
      } else {
        html = `
          <div style="color: #f87171; font-weight: 700; font-size: 1rem; margin-bottom: 4px;">
            ✗ SISTEMA IMPOSSIBILE (Nessuna Soluzione)
          </div>
          <div>D = 0 ma Dx = ${Dx.toFixed(1)} ≠ 0 oppure Dy = ${Dy.toFixed(1)} ≠ 0</div>
          <div style="margin-top: 6px; padding: 6px 10px; background: rgba(239, 68, 68, 0.15); border-left: 3px solid #ef4444; border-radius: 4px;">
            I coefficienti delle incognite sono proporzionali ma i termini noti no: le rette sono <strong>parallele e distinte</strong>.
          </div>
          <div style="font-size: 0.82rem; color: #94a3b8; margin-top: 4px;">
            Non esiste alcun punto di intersezione comune.
          </div>
        `;
      }
    }

    resultBox.innerHTML = html;
  }

  [a1, b1, c1, a2, b2, c2].forEach(input => {
    input.addEventListener('input', solve);
  });

  // Preimpostazioni
  window.setSolverPreset = function(v1, v2, v3, v4, v5, v6) {
    a1.value = v1; b1.value = v2; c1.value = v3;
    a2.value = v4; b2.value = v5; c2.value = v6;
    solve();
  };

  solve();
}
