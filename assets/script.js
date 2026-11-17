document.getElementById('year').textContent = new Date().getFullYear();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.reveal').forEach((el, i) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
    delay: (i % 4) * 0.05
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

const discordCopy = document.getElementById('discordCopy');
if (discordCopy) {
  const hint = discordCopy.querySelector('.swipe-hint');
  const defaultHint = hint.textContent;
  discordCopy.addEventListener('click', async () => {
    const value = discordCopy.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      const temp = document.createElement('textarea');
      temp.value = value;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }
    discordCopy.classList.add('copied');
    hint.textContent = '¡copiado!';
    setTimeout(() => {
      discordCopy.classList.remove('copied');
      hint.textContent = defaultHint;
    }, 1800);
  });
}
