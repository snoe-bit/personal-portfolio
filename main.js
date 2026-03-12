/* ═══════════════════════════════════════════════════════════
   main.js — Sinokubonga Bhebe Portfolio
   Features: scroll-reveal, typing terminal, parallax, nav scroll
═══════════════════════════════════════════════════════════ */

'use strict';

// ── Nav: add "scrolled" class after 60px ──────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Scroll Reveal (IntersectionObserver) ─────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => revealObserver.observe(el));

// ── Hero Parallax on mouse move ───────────────────────
const heroBg = document.querySelector('.hero-bg');
const heroContent = document.querySelector('.hero-content');
const heroGlow   = document.querySelector('.hero-glow');

document.addEventListener('mousemove', (e) => {
  const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
  const yPct = (e.clientY / window.innerHeight - 0.5) * 2;

  if (heroBg) {
    heroBg.style.transform = `translate(${xPct * 12}px, ${yPct * 8}px) scale(1.04)`;
  }
  if (heroGlow) {
    heroGlow.style.transform = `translate(${xPct * -20}px, ${yPct * -14}px)`;
  }
  if (heroContent) {
    heroContent.style.transform = `translate(${xPct * -4}px, ${yPct * -3}px)`;
  }
});

// ── Typing Terminal in About section ─────────────────
const typedTextEl   = document.getElementById('typed-text');
const terminalOutput = document.getElementById('terminal-output');
const cursor         = document.getElementById('cursor');

const terminalScript = [
  {
    type: 'input',
    text: 'whoami',
    delay: 900,
    response: [
      { text: 'sinokubonga.bhebe', cls: 'accent' },
      { text: 'CS Student @ NUST Zimbabwe', cls: '' },
    ]
  },
  {
    type: 'input',
    text: 'cat skills.txt',
    delay: 1600,
    response: [
      { text: '→ Java (OOP, Collections, I/O)', cls: '' },
      { text: '→ C# (.NET, LINQ, Generics)', cls: '' },
      { text: '→ SQL, Git, REST APIs', cls: '' },
      { text: '', cls: '' },
    ]
  },
  {
    type: 'input',
    text: './run_passion.sh',
    delay: 1200,
    response: [
      { text: 'Starting: Building cool stuff...', cls: 'kw' },
      { text: '✓ Motivation: 100%', cls: 'ok' },
      { text: '✓ Coffee: loaded', cls: 'ok' },
      { text: '✓ Ready to ship!', cls: 'ok' },
    ]
  },
];

let scriptStarted = false;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text, el, speed = 65) {
  el.textContent = '';
  cursor.style.display = 'inline';
  for (const ch of text) {
    el.textContent += ch;
    await sleep(speed + Math.random() * 30);
  }
}

function addOutputLine(text, cls) {
  const line = document.createElement('p');
  line.className = 't-output-line' + (cls ? ` ${cls}` : '');
  line.textContent = text;
  terminalOutput.appendChild(line);
  // auto-scroll
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function addNewPrompt() {
  const line = document.createElement('p');
  line.className = 't-line';
  line.innerHTML = `<span class="t-prompt">~</span> `;
  terminalOutput.appendChild(line);
  return line;
}

async function runTerminalScript() {
  await sleep(600);
  for (const step of terminalScript) {
    await typeText(step.text, typedTextEl, 65);
    await sleep(220);
    cursor.style.display = 'none';

    // Move typed command into output as a new prompt line
    addOutputLine(`~ ${step.text}`, '');

    typedTextEl.textContent = '';
    cursor.style.display = 'inline';

    await sleep(300);
    for (const line of step.response) {
      await sleep(120);
      addOutputLine(line.text, line.cls);
    }
    await sleep(step.delay);
  }
  // loop after a pause
  await sleep(2500);
  terminalOutput.innerHTML = '';
  runTerminalScript();
}

// Start terminal when #about is visible
const aboutEl = document.getElementById('about');
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !scriptStarted) {
        scriptStarted = true;
        runTerminalScript();
        aboutObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);
if (aboutEl) aboutObserver.observe(aboutEl);

// ── Smooth scroll for all anchor links ───────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Card hover 3D tilt effect ─────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `
      translateY(-10px)
      rotateX(${-y * 8}deg)
      rotateY(${x * 8}deg)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
