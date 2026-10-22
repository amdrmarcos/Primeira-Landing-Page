// ============================================================
// Script interativo — Dra. Ana Lima · Fonoaudióloga
// ============================================================

// ---- NAVBAR: adiciona classe 'scrolled' ao rolar ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- MENU HAMBURGER (mobile) ----
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Anima os spans
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Fecha menu ao clicar em um link
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ---- REVEAL ON SCROLL (Intersection Observer) ----
const revealTargets = document.querySelectorAll(
  '.trat-card, .dep-card, .info-card, .sobre-img-frame, .sobre-text-col, .sobre-destaques'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => observer.observe(el));

// Atraso escalonado para os cards de tratamento
document.querySelectorAll('.trat-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});

// ---- CONTAGEM ANIMADA nas stats do hero ----
function animateCount(el, target, suffix = '', duration = 1800) {
  const startTime = performance.now();
  const start = 0;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const frame = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(start + easeOut(progress) * target);
    el.textContent = (value === target && suffix === '+') ? `+${value}` : `${value}${suffix}`;
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(document.querySelector('#stat-1 strong'), 500, '+');
      animateCount(document.querySelector('#stat-2 strong'), 8, '+');
      animateCount(document.querySelector('#stat-3 strong'), 100, '%');
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// ---- FORMULÁRIO: feedback de envio ----
const form = document.getElementById('contato-form');
const btnEnviar = document.getElementById('btn-enviar-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('input-nome').value.trim();
  const email = document.getElementById('input-email').value.trim();

  if (!nome || !email) {
    shakeElement(btnEnviar);
    return;
  }

  btnEnviar.textContent = 'Enviando... ⏳';
  btnEnviar.disabled = true;

  setTimeout(() => {
    btnEnviar.textContent = 'Mensagem enviada! 💕';
    btnEnviar.style.background = 'linear-gradient(135deg, #6bbf8e, #3f9e6a)';
    form.reset();
    setTimeout(() => {
      btnEnviar.textContent = 'Enviar mensagem';
      btnEnviar.style.background = '';
      btnEnviar.disabled = false;
    }, 3500);
  }, 1200);
});

function shakeElement(el) {
  el.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-6px)' },
    { transform: 'translateX(6px)' },
    { transform: 'translateX(-4px)' },
    { transform: 'translateX(4px)' },
    { transform: 'translateX(0)' },
  ], { duration: 400, easing: 'ease' });
}

// ---- SMOOTH ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.style.color = 'var(--rose-500)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
