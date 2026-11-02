/**
 * SISTEMI LINEARI - Interactive Quiz System
 * Motore per test di autovalutazione sui sistemi lineari con spiegazioni didattiche passo-passo
 */

const quizData = [
  {
    id: 1,
    topic: "Definizione",
    question: "Che cos'è, per definizione, un sistema di equazioni lineari?",
    options: [
      "Un insieme di equazioni di grado qualsiasi aventi la stessa soluzione",
      "Un insieme di due o più equazioni di primo grado che devono essere soddisfatte contemporaneamente",
      "Una moltiplicazione tra polinomi con termini incogniti",
      "Un'equazione avente un numero infinito di incognite"
    ],
    correct: 1,
    explanation: "Un <strong>sistema lineare</strong> è un insieme di due o più equazioni di primo grado (lineari) nelle stesse incognite, per le quali si cercano le soluzioni che soddisfano <strong>tutte le equazioni contemporaneamente</strong>."
  },
  {
    id: 2,
    topic: "Soluzione",
    question: "Che cosa rappresenta algebricamente la soluzione di un sistema lineare $2 \\times 2$ nelle incognite $x$ e $y$?",
    options: [
      "Un singolo numero reale che annulla la prima equazione",
      "Una coppia ordinata di numeri reali $(x_0, y_0)$ che rende vere entrambe le uguaglianze",
      "La somma dei coefficienti delle due equazioni",
      "Un intervallo continuo di numeri positivi"
    ],
    correct: 1,
    explanation: "La soluzione di un sistema a due incognite è una <strong>coppia ordinata</strong> di numeri reali $(x_0, y_0)$ che, sostituita al posto delle incognite, verifica contemporaneamente entrambe le equazioni del sistema."
  },
  {
    id: 3,
    topic: "Interpretazione Grafica",
    question: "Se nel piano cartesiano le due rette associate alle equazioni di un sistema $2 \\times 2$ sono <strong>parallele e distinte</strong>, il sistema è:",
    options: [
      "Determinato, con 1 soluzione",
      "Indeterminato, con infinite soluzioni",
      "Impossibile, con nessuna soluzione",
      "Omogeneo"
    ],
    correct: 2,
    explanation: "Poiché due rette parallele distinte non hanno <strong>alcun punto in comune</strong>, non esiste alcuna coppia $(x, y)$ che soddisfi entrambe le equazioni: il sistema è quindi <strong>impossibile</strong>."
  },
  {
    id: 4,
    topic: "Condizione sui Coefficienti",
    question: "Dato il sistema in forma normale $\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}$, quale condizione garantisce che sia <strong>determinato</strong>?",
    options: [
      "$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$",
      "$\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$",
      "$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$",
      "$c_1 = 0 \\land c_2 = 0$"
    ],
    correct: 1,
    explanation: "La condizione $\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$ equivale a dire che le due rette hanno <strong>pendenza diversa</strong> ($m_1 \\neq m_2$). Di conseguenza, sono incidenti in un unico punto e il sistema ammette un'unica soluzione (determinato)."
  },
  {
    id: 5,
    topic: "Metodi Risolutivi",
    question: "In quale situazione è particolarmente rapido ed efficace applicare il <strong>metodo di sostituzione</strong>?",
    options: [
      "Solo quando tutti i coefficienti sono numeri irrazionali",
      "Quando almeno una delle incognite ha coefficiente pari a $+1$ o $-1$",
      "Solo quando i termini noti sono entrambi nulli",
      "Quando il determinante di Cramer è zero"
    ],
    correct: 1,
    explanation: "Se un'incognita ha coefficiente $+1$ o $-1$ (ad esempio in $x - 3y = 5$), è facilissimo esplicitarla senza introdurre frazioni ($x = 3y + 5$) per poi sostituirla direttamente nell'altra equazione."
  },
  {
    id: 6,
    topic: "Regola di Cramer",
    question: "Nel metodo di Cramer per un sistema $2 \\times 2$, se il determinante principale $D = 0$ mentre $D_x = 4$ e $D_y = -2$, il sistema è:",
    options: [
      "Determinato con soluzione $(4, -2)$",
      "Indeterminato",
      "Impossibile",
      "Non lineare"
    ],
    correct: 2,
    explanation: "Secondo la regola di Cramer, se $D = 0$ e almeno uno dei determinanti parziali $D_x$ o $D_y$ è <strong>diverso da zero</strong>, i rapporti $\\frac{D_x}{D}$ e $\\frac{D_y}{D}$ comporterebbero una divisione per zero con numeratore non nullo: il sistema è <strong>impossibile</strong>."
  },
  {
    id: 7,
    topic: "Calcolo Diretto",
    question: "Qual è la soluzione del sistema lineare $\\begin{cases} x + y = 7 \\\\ x - y = 3 \\end{cases}$?",
    options: [
      "$(x, y) = (5, 2)$",
      "$(x, y) = (4, 3)$",
      "$(x, y) = (2, 5)$",
      "$(x, y) = (10, 4)$"
    ],
    correct: 0,
    explanation: "Sommando membro a membro con il metodo di riduzione: $(x+y) + (x-y) = 7+3 \\implies 2x = 10 \\implies x = 5$. Sostituendo nella prima equazione: $5 + y = 7 \\implies y = 2$. La soluzione è $(5, 2)$."
  },
  {
    id: 8,
    topic: "Equazione Matriciale",
    question: "Nel formalismo matriciale $A\\mathbf{x} = \\mathbf{b}$, sotto quale condizione è possibile calcolare la soluzione unica tramite la matrice inversa $\\mathbf{x} = A^{-1}\\mathbf{b}$?",
    options: [
      "Sempre, per qualsiasi matrice",
      "Solo se la matrice $A$ è quadrata e il suo determinante è diverso da zero ($\\det(A) \\neq 0$)",
      "Solo se il vettore dei termini noti $\\mathbf{b}$ è nullo",
      "Solo se la matrice ha tutti elementi positivi"
    ],
    correct: 1,
    explanation: "La matrice inversa $A^{-1}$ esiste se e solo se la matrice quadrata $A$ è <strong>invertibile (o non singolare)</strong>, condizione che equivale ad avere $\\det(A) \\neq 0$."
  },
  {
    id: 9,
    topic: "Sistemi Indeterminati",
    question: "Considera il sistema $\\begin{cases} 2x - y = 3 \\\\ 4x - 2y = 6 \\end{cases}$. Cosa possiamo affermare sulle sue soluzioni?",
    options: [
      "Ha un'unica soluzione data da $(0, -3)$",
      "È impossibile poiché $4/2 = -2/(-1)$",
      "È indeterminato perché la seconda equazione è esattamente il doppio della prima: le rette coincidono e ci sono $\\infty$ soluzioni",
      "Ha esattamente due soluzioni distinte"
    ],
    correct: 2,
    explanation: "Poiché la seconda equazione si ottiene moltiplicando la prima per 2, le due equazioni sono equivalenti e descrivono la <strong>stessa retta</strong>. Il sistema ammette $\\infty^1$ soluzioni (sistema indeterminato)."
  },
  {
    id: 10,
    topic: "Estensione 3x3",
    question: "Nello spazio tridimensionale $\\mathbb{R}^3$, che cosa rappresenta geometricamente una singola equazione lineare a 3 incognite $ax + by + cz = d$?",
    options: [
      "Una retta nello spazio",
      "Un piano nello spazio",
      "Una sfera centrata nell'origine",
      "Un singolo punto $(x, y, z)$"
    ],
    correct: 1,
    explanation: "In tre dimensioni, un'equazione lineare di primo grado $ax + by + cz = d$ rappresenta l'equazione cartesiana di un <strong>piano</strong>. Risolvere un sistema $3 \\times 3$ significa trovare l'intersezione comune di tre piani nello spazio!"
  }
];

class QuizApp {
  constructor() {
    this.currentIndex = 0;
    this.score = 0;
    this.container = document.getElementById('quizQuestionsContainer');
    this.progressBar = document.getElementById('quizProgressBar');
    this.statusText = document.getElementById('quizStatusText');
    this.scoreText = document.getElementById('quizLiveScore');
    this.resultsCard = document.getElementById('quizResultsCard');
    this.restartBtn = document.getElementById('restartQuizBtn');

    if (this.container) {
      this.init();
    }
  }

  init() {
    this.renderCurrentQuestion();
    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => this.restart());
    }
  }

  renderCurrentQuestion() {
    const q = quizData[this.currentIndex];
    const total = quizData.length;

    const percent = Math.round(((this.currentIndex) / total) * 100);
    if (this.progressBar) this.progressBar.style.width = `${percent}%`;
    if (this.statusText) this.statusText.textContent = `Quesito ${this.currentIndex + 1} di ${total}`;
    if (this.scoreText) this.scoreText.textContent = `Punteggio: ${this.score}/${this.currentIndex}`;

    let html = `
      <div class="question-card">
        <div class="q-number">Argomento: ${q.topic}</div>
        <div class="q-text">${q.question}</div>
        <div class="options-grid">
    `;

    const prefixes = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
      html += `
        <button class="option-btn" data-index="${idx}">
          <span class="opt-letter">${prefixes[idx]}</span>
          <span class="option-label">${opt}</span>
        </button>
      `;
    });

    html += `
        </div>
        <div class="feedback-box" id="feedbackBox"></div>
        <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
          <button class="btn btn-quiz" id="nextQuestionBtn" style="display: none; width: auto; padding: 10px 22px;">
            ${this.currentIndex === total - 1 ? 'Visualizza Risultati Finali ➔' : 'Prossimo Quesito ➔'}
          </button>
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    if (window.renderMathInElement) {
      window.renderMathInElement(this.container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      });
    }

    const optionBtns = this.container.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-index'));
        this.handleAnswer(selectedIdx, optionBtns);
      });
    });

    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentIndex++;
        if (this.currentIndex < total) {
          this.renderCurrentQuestion();
        } else {
          this.showFinalResults();
        }
      });
    }
  }

  handleAnswer(selectedIdx, buttons) {
    const q = quizData[this.currentIndex];
    const isCorrect = selectedIdx === q.correct;
    const feedbackBox = document.getElementById('feedbackBox');
    const nextBtn = document.getElementById('nextQuestionBtn');

    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.correct) {
        b.classList.add('correct');
      } else if (idx === selectedIdx && !isCorrect) {
        b.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      this.score++;
      feedbackBox.className = 'feedback-box callout callout-success';
      feedbackBox.innerHTML = `<strong>Corretto! Ottimo lavoro.</strong><br>${q.explanation}`;
    } else {
      feedbackBox.className = 'feedback-box callout callout-danger';
      feedbackBox.innerHTML = `<strong>Risposta non corretta.</strong><br>${q.explanation}`;
    }

    feedbackBox.style.display = 'block';
    if (nextBtn) nextBtn.style.display = 'inline-flex';

    if (window.renderMathInElement) {
      window.renderMathInElement(feedbackBox, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      });
    }

    if (this.scoreText) this.scoreText.textContent = `Punteggio: ${this.score}/${this.currentIndex + 1}`;
  }

  showFinalResults() {
    this.container.style.display = 'none';
    if (this.resultsCard) {
      this.resultsCard.style.display = 'block';
      const total = quizData.length;
      const scoreNum = document.getElementById('finalScoreNumber');
      const feedbackTitle = document.getElementById('resultsFeedbackTitle');
      const feedbackDesc = document.getElementById('resultsFeedbackDesc');

      if (scoreNum) scoreNum.textContent = this.score;

      const percentage = (this.score / total) * 100;
      let title = '';
      let desc = '';

      if (percentage >= 90) {
        title = "🏆 Eccellente! Maestro dell'Algebra Lineare!";
        desc = "Hai dimostrato una comprensione perfetta dei sistemi lineari, della loro geometria e dei metodi algebrici e matriciali.";
      } else if (percentage >= 70) {
        title = "👏 Ottimo risultato! Solida preparazione!";
        desc = "Conosci bene i concetti chiave. Rivedi i pochi punti incerti consultando le sezioni di approfondimento.";
      } else if (percentage >= 50) {
        title = "📚 Buona base, ma serve ancora un po' di ripasso!";
        desc = "Rileggi con attenzione i metodi di risoluzione e la regola di Cramer per consolidare i passaggi.";
      } else {
        title = "💪 Non scoraggiarti! Rivedi le sezioni e riprova!";
        desc = "Ti consigliamo di consultare la sezione di Definizione geometrica e provare il visualizzatore interattivo.";
      }

      if (feedbackTitle) feedbackTitle.textContent = title;
      if (feedbackDesc) feedbackDesc.textContent = desc;
      if (this.progressBar) this.progressBar.style.width = '100%';
    }
  }

  restart() {
    this.currentIndex = 0;
    this.score = 0;
    if (this.resultsCard) this.resultsCard.style.display = 'none';
    if (this.container) this.container.style.display = 'block';
    this.renderCurrentQuestion();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('quizQuestionsContainer')) {
    window.quizApp = new QuizApp();
  }
});
