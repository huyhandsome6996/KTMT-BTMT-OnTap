/* ==========================================================================
   KTMT-BTMT OnTap - Common JavaScript utilities
   ========================================================================== */

// ----- Bit manipulation helpers -----
const Bit = {
  /** Convert decimal to binary string with specified width */
  toBin(num, width = 8) {
    if (num < 0) {
      // For negative numbers, use two's complement
      return (num >>> 0).toString(2).padStart(width, '1').slice(-width);
    }
    return num.toString(2).padStart(width, '0');
  },

  /** Convert decimal to hex string with specified width */
  toHex(num, width = 2) {
    return num.toString(16).toUpperCase().padStart(width, '0');
  },

  /** Convert binary string to decimal */
  binToDec(binStr) {
    return parseInt(binStr, 2);
  },

  /** Convert hex string to decimal */
  hexToDec(hexStr) {
    return parseInt(hexStr, 16);
  },

  /** XOR two binary strings of equal length */
  xor(a, b) {
    let result = '';
    for (let i = 0; i < a.length; i++) {
      result += (a[i] === b[i]) ? '0' : '1';
    }
    return result;
  },

  /** Invert all bits of a binary string */
  invert(binStr) {
    return binStr.split('').map(b => b === '0' ? '1' : '0').join('');
  },

  /** Two's complement of a binary string */
  twosComplement(binStr) {
    const inverted = this.invert(binStr);
    // Add 1
    let arr = inverted.split('').reverse().map(Number);
    let carry = 1;
    for (let i = 0; i < arr.length && carry; i++) {
      const sum = arr[i] + carry;
      arr[i] = sum % 2;
      carry = Math.floor(sum / 2);
    }
    return arr.reverse().join('');
  },

  /** Render a binary string as bit boxes */
  renderBits(binStr, options = {}) {
    const { highlight = [], error = [], labels = false } = options;
    const wrapper = document.createElement('div');
    wrapper.className = 'bit-row';

    const bits = binStr.split('');
    bits.forEach((b, i) => {
      const bitEl = document.createElement('div');
      bitEl.className = 'bit ' + (b === '1' ? 'one' : 'zero');
      if (highlight.includes(i)) bitEl.classList.add('highlight');
      if (error.includes(i)) bitEl.classList.add('error');
      bitEl.textContent = b;
      bitEl.title = `Bit ${bits.length - 1 - i} (vị trí ${i})`;
      wrapper.appendChild(bitEl);
    });

    if (labels) {
      const labelRow = document.createElement('div');
      labelRow.style.display = 'flex';
      labelRow.style.gap = '4px';
      labelRow.style.justifyContent = 'center';
      bits.forEach((_, i) => {
        const lbl = document.createElement('div');
        lbl.className = 'bit-label';
        lbl.style.width = '36px';
        lbl.textContent = bits.length - 1 - i;
        labelRow.appendChild(lbl);
      });
      wrapper.appendChild(labelRow);
    }
    return wrapper;
  }
};

// ----- Number system conversion -----
const NumSys = {
  /** Detailed decimal -> binary conversion (returns steps array) */
  decToBinSteps(num) {
    const steps = [];
    let n = num;
    while (n > 0) {
      const q = Math.floor(n / 2);
      const r = n % 2;
      steps.push({ dividend: n, quotient: q, remainder: r });
      n = q;
    }
    if (steps.length === 0) steps.push({ dividend: 0, quotient: 0, remainder: 0 });
    return steps;
  },

  /** Detailed decimal -> hex conversion */
  decToHexSteps(num) {
    const steps = [];
    let n = num;
    const hexDigits = '0123456789ABCDEF';
    while (n > 0) {
      const q = Math.floor(n / 16);
      const r = n % 16;
      steps.push({ dividend: n, quotient: q, remainder: r, hexDigit: hexDigits[r] });
      n = q;
    }
    if (steps.length === 0) steps.push({ dividend: 0, quotient: 0, remainder: 0, hexDigit: '0' });
    return steps;
  },

  /** Convert decimal fraction to binary (returns steps + result) */
  decFracToBin(frac, maxBits = 20) {
    const steps = [];
    let f = frac;
    let result = '';
    for (let i = 0; i < maxBits; i++) {
      const product = f * 2;
      const intPart = Math.floor(product);
      steps.push({ input: f, product, intPart, remainder: product - intPart });
      result += intPart;
      f = product - intPart;
      if (f === 0) break;
    }
    return { steps, result };
  }
};

// ----- Quiz helper -----
class Quiz {
  constructor(containerId, questions) {
    this.container = document.getElementById(containerId);
    this.questions = questions;
    this.answers = {};
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.questions.forEach((q, qi) => {
      const block = document.createElement('div');
      block.className = 'quiz';
      block.innerHTML = `<div class="quiz-question">Câu ${qi + 1}: ${q.question}</div>`;
      const opts = document.createElement('div');
      opts.className = 'quiz-options';
      q.options.forEach((opt, oi) => {
        const el = document.createElement('div');
        el.className = 'quiz-option';
        el.innerHTML = `<span class="quiz-letter">${String.fromCharCode(65 + oi)}.</span> ${opt}`;
        el.onclick = () => this.select(qi, oi, el);
        opts.appendChild(el);
      });
      block.appendChild(opts);

      const feedback = document.createElement('div');
      feedback.className = 'quiz-feedback';
      feedback.id = `quiz-feedback-${qi}`;
      block.appendChild(feedback);

      this.container.appendChild(block);
    });
  }

  select(qIdx, optIdx, el) {
    // Clear previous selection in same question
    const siblings = el.parentElement.querySelectorAll('.quiz-option');
    siblings.forEach(s => s.classList.remove('selected', 'correct', 'wrong'));

    el.classList.add('selected');
    const q = this.questions[qIdx];
    const feedback = document.getElementById(`quiz-feedback-${qIdx}`);
    feedback.className = 'quiz-feedback show';

    if (optIdx === q.correct) {
      el.classList.add('correct');
      feedback.classList.add('correct');
      feedback.innerHTML = `✓ Đúng! ${q.explanation || ''}`;
    } else {
      el.classList.add('wrong');
      feedback.classList.add('wrong');
      feedback.innerHTML = `✗ Chưa đúng. ${q.explanation || 'Hãy xem lại lý thuyết ở trên.'}`;
    }
  }
}

// ----- Step-by-step reveal -----
class StepReveal {
  constructor(containerId, stepsData) {
    this.container = document.getElementById(containerId);
    this.steps = stepsData;
    this.current = 0;
    this.render();
  }

  render() {
    this.container.innerHTML = '';

    const list = document.createElement('ol');
    list.className = 'steps';
    this.steps.forEach((step, i) => {
      const li = document.createElement('li');
      li.id = `${this.container.id}-step-${i}`;
      li.classList.add('hidden');
      li.innerHTML = `<span class="step-title">${step.title}</span>${step.content}`;
      list.appendChild(li);
    });
    this.container.appendChild(list);

    const controls = document.createElement('div');
    controls.className = 'visualizer-controls';
    controls.innerHTML = `
      <button class="btn" onclick="window.${this.container.id}.prev()">← Bước trước</button>
      <button class="btn btn-success" onclick="window.${this.container.id}.next()">Bước sau →</button>
      <button class="btn btn-ghost" onclick="window.${this.container.id}.showAll()">Hiện tất cả</button>
      <button class="btn btn-secondary" onclick="window.${this.container.id}.reset()">↺ Làm lại</button>
    `;
    this.container.appendChild(controls);

    const progress = document.createElement('div');
    progress.className = 'progress-bar';
    progress.innerHTML = `<div class="progress-bar-fill" id="${this.container.id}-progress" style="width: 0%"></div>`;
    this.container.appendChild(progress);

    // Expose globally for onclick
    window[this.container.id] = this;
    this.update();
  }

  next() {
    if (this.current < this.steps.length) {
      this.current++;
      this.update();
    }
  }

  prev() {
    if (this.current > 0) {
      this.current--;
      this.update();
    }
  }

  showAll() {
    this.current = this.steps.length;
    this.update();
  }

  reset() {
    this.current = 0;
    this.update();
  }

  update() {
    this.steps.forEach((_, i) => {
      const el = document.getElementById(`${this.container.id}-step-${i}`);
      if (i < this.current) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
    const progress = document.getElementById(`${this.container.id}-progress`);
    if (progress) {
      progress.style.width = `${(this.current / this.steps.length) * 100}%`;
    }
  }
}

// ----- Calculator input helper -----
function attachCalculator(btnId, inputId, calcFn, outputId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.onclick = () => {
    const input = document.getElementById(inputId).value.trim();
    const output = document.getElementById(outputId);
    try {
      const result = calcFn(input);
      output.className = 'result-box';
      output.innerHTML = result;
    } catch (e) {
      output.className = 'result-box error';
      output.innerHTML = `<span class="result-label">Lỗi:</span> ${e.message}`;
    }
  };
}

// ----- Tab switching -----
function setupTabs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const tabs = container.querySelectorAll('.tab');
  const contents = container.querySelectorAll('.tab-content');
  tabs.forEach((tab, i) => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      if (contents[i]) contents[i].classList.add('active');
    };
  });
}

// ----- KaTeX auto-render (if KaTeX is loaded) -----
function renderMath() {
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false
    });
  }
}

// ----- Initialize on page load -----
document.addEventListener('DOMContentLoaded', () => {
  renderMath();
  // Auto-setup any tab containers
  document.querySelectorAll('[data-tabs]').forEach(c => setupTabs(c.id));
});
