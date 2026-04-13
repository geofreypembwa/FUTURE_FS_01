// ===== NAVBAR: Hide/Show on Scroll =====
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 100) {
    nav.style.transform = 'translateY(-100%)';
    nav.style.transition = 'transform 0.3s ease';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
});

// ===== ACTIVE NAV LINK on Scroll =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '#e0e0e0';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#00d4ff';
    }
  });
});

// ===== FADE IN SECTIONS on Scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// ===== TYPING EFFECT in Hero =====
const heroText = "Computer Science Student | Aspiring Software Developer & AI Engineer";
const typingEl = document.querySelector('#hero p');
typingEl.textContent = '';
let i = 0;

function type() {
  if (i < heroText.length) {
    typingEl.textContent += heroText.charAt(i);
    i++;
    setTimeout(type, 35);
  }
}

window.addEventListener('load', type);
// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.style.display = 'block';
  form.reset();
  setTimeout(() => {
    formSuccess.style.display = 'none';
  }, 4000);
});