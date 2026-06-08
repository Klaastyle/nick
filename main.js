// Sticky header shadow
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navMenu').classList.toggle('open');
});
document.querySelectorAll('.nav-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navMenu').classList.remove('open'));
});

// FAQ accordion
function toggleFaq(btn) {
  const item = btn.parentElement;
  const answer = item.querySelector('.faq-a');
  const icon = btn.querySelector('.faq-icon');
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-icon').forEach(i => { i.textContent = '+'; });
  if (!isOpen) { answer.classList.add('open'); icon.textContent = '−'; }
}

// Scroll reveal
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity .65s ease, transform .65s ease; }
  .reveal.visible { opacity: 1; transform: none; }
`;
document.head.appendChild(style);

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.08 });

document.querySelectorAll('.service-card, .testi-card, .benefit, .faq-item, .about-text-col, .hybrid-text, .contact-info').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

// Contact form
function submitContact(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  const msgs = { en: '✓ Message sent — I will be in touch soon.', es: '✓ Mensaje enviado — me pondré en contacto pronto.', ca: '✓ Missatge enviat — em posaré en contacte aviat.' };
  const orig = btn.textContent;
  btn.textContent = msgs[currentLang] || msgs.en;
  btn.style.background = '#6b8f71';
  setTimeout(() => { btn.textContent = translations[currentLang]?.form_btn || orig; btn.style.background = ''; e.target.reset(); }, 4000);
}
