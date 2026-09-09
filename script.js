const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Mobile menu
function toggleMenu(){
  $('#navLinks').classList.toggle('active');
}
$$('.nav-links a').forEach(link => link.addEventListener('click', () => $('#navLinks').classList.remove('active')));

// Header + scroll progress + back to top
const header = document.querySelector('header');
const topBtn = $('#topBtn');
const progress = $('#scrollProgress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${percent}%`;
  header.classList.toggle('scrolled', window.scrollY > 30);
  topBtn.style.display = window.scrollY > 500 ? 'grid' : 'none';
}, {passive:true});
function topFunction(){ window.scrollTo({top:0, behavior:'smooth'}); }

// Typing animation
const typing = $('.typing-text');
const words = ['IT Student', 'Web Developer', 'UI Creator', 'Problem Solver', 'Tech Explorer'];
let wordIndex = 0, charIndex = 0, deleting = false;
function typeLoop(){
  const word = words[wordIndex];
  typing.textContent = deleting ? word.slice(0, --charIndex) : word.slice(0, ++charIndex);
  let speed = deleting ? 55 : 90;
  if(!deleting && charIndex === word.length){ deleting = true; speed = 1300; }
  if(deleting && charIndex === 0){ deleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 350; }
  setTimeout(typeLoop, speed);
}
typeLoop();

// Reveal-on-scroll
const revealTargets = $$('section, .service-card, .project-card, .skill-card, .timeline-item, .edu-card, .cert-card, .achievement-card, .testimonial-card, .gallery-item, .about-box, .contact-info, .contact-form');
revealTargets.forEach((el, i) => { el.classList.add('reveal'); el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`; });
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('show'); revealObserver.unobserve(entry.target); } });
}, {threshold:.08});
revealTargets.forEach(el => revealObserver.observe(el));

// Active navigation section
const sections = $$('section[id]');
const navItems = $$('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s => sectionObserver.observe(s));

// Animated skill bars when visible
const bars = $$('.progress-bar');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.style.transform='scaleX(1)'; barObserver.unobserve(entry.target); } });
});
bars.forEach(bar => { bar.style.transform='scaleX(0)'; barObserver.observe(bar); });

// Cursor glow on desktop
const glow = $('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

// Magnetic buttons
$$('.magnetic').forEach(btn => {
  btn.addEventListener('pointermove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.12}px, ${(e.clientY-r.top-r.height/2)*.12}px)`;
  });
  btn.addEventListener('pointerleave', () => btn.style.transform = 'translate(0,0)');
});

// Theme switch
const themeToggle = $('#themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '☀' : '◐';
});

// Contact form
function sendMessage(event){
  event.preventDefault();
  const button = event.target.querySelector('button');
  const old = button.innerHTML;
  button.innerHTML = 'Message Sent ✓';
  button.disabled = true;
  setTimeout(() => { event.target.reset(); button.innerHTML = old; button.disabled = false; }, 1800);
}

// 3D tilt on cards
$$('.project-card, .service-card, .cert-card, .achievement-card').forEach(card => {
  card.addEventListener('pointermove', e => {
    if(window.innerWidth < 700) return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(700px) rotateX(${y*-5}deg) rotateY(${x*6}deg) translateY(-8px)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform='');
});
