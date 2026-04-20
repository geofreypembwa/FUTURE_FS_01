// ===== EMAILJS INIT =====
emailjs.init("02gVOA-azCFSaCSvL");

// ===== ELEMENTS =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-link");
const typingText = document.getElementById("typing-text");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// ===== MOBILE MENU =====
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu when clicking nav links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const isClickInsideMenu = navLinks.contains(e.target);
    const isClickHamburger = hamburger.contains(e.target);

    if (!isClickInsideMenu && !isClickHamburger) {
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
    }
  });
}

// ===== NAVBAR HIDE/SHOW ON SCROLL =====
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (navbar) {
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
  }

  lastScroll = currentScroll;
});

// ===== ACTIVE NAV LINK =====
window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// ===== REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  "section, .project-card, .stat, .skill-card, .contact-item, .resume-item"
);

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

// ===== TYPING EFFECT =====
const roles = [
  "Computer Science Student",
  "Aspiring Software Developer",
  "Future Full-Stack Engineer",
  "Builder of Real-World Solutions"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentRole = roles[roleIndex];
  const displayedText = isDeleting
    ? currentRole.substring(0, charIndex--)
    : currentRole.substring(0, charIndex++);

  typingText.textContent = displayedText;

  let speed = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === currentRole.length + 1) {
    speed = 1400;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 250;
  }

  setTimeout(typeEffect, speed);
}

window.addEventListener("load", typeEffect);

// ===== CONTACT FORM WITH EMAILJS =====
if (form && formStatus) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.textContent = "Sending message...";
    formStatus.style.color = "#00d4ff";

    emailjs
      .sendForm("service_nf13mo5", "template_3pb4nzj", this)
      .then(() => {
        formStatus.textContent = "✅ Message sent successfully!";
        formStatus.style.color = "#25d366";
        form.reset();
      })
      .catch((error) => {
        formStatus.textContent = "❌ Failed to send message. Please try again.";
        formStatus.style.color = "#ff4d4d";
        console.error("EmailJS Error:", error);
      });
  });
}
