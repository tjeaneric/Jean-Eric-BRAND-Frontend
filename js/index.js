/**
 * Professional Portfolio - Minimal JavaScript
 * No excessive animations, just smooth interactions
 */

"use strict";

// ========================
// SMOOTH SCROLL
// ========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========================
// NAVIGATION ACTIVE STATE
// ========================
const sections = document.querySelectorAll(".pro-section");
const navLinks = document.querySelectorAll(".pro-nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href") === `#${current}`) {
      link.style.color = "var(--accent-primary)";
    }
  });
});

// ========================
// HEADER BACKGROUND ON SCROLL
// ========================
const header = document.querySelector(".pro-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.background = "rgba(10, 10, 10, 0.95)";
  } else {
    header.style.background = "rgba(10, 10, 10, 0.8)";
  }
});

// ========================
// CONTACT FORM HANDLING
// ========================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoLink = `mailto:ericjohn415@gmail.com?subject=${subject}&body=${body}`;

    // Open user's email client
    window.location.href = mailtoLink;

    // Reset form after a short delay
    setTimeout(() => {
      contactForm.reset();
    }, 500);
  });
}

// ========================
// INTERSECTION OBSERVER FOR FADE-IN
// ========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe cards and sections
document
  .querySelectorAll(
    ".tech-category, .experience-card, .project-card, .stat-card"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// ========================
// TERMINAL TYPING EFFECT (MINIMAL)
// ========================
const terminalName = document.querySelector(".terminal-name");
if (terminalName) {
  const text = terminalName.textContent;
  terminalName.textContent = "";
  let index = 0;

  function type() {
    if (index < text.length) {
      terminalName.textContent += text.charAt(index);
      index++;
      setTimeout(type, 50);
    }
  }

  // Start typing after a short delay
  setTimeout(type, 500);
}

// ========================
// DYNAMIC COPYRIGHT YEAR
// ========================
const updateCopyrightYear = () => {
  const yearElement = document.querySelector(".footer-content");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    const copyrightText = yearElement.querySelector("p:first-child");
    if (copyrightText) {
      copyrightText.textContent = `Designed & Built by Jean Eric TUYISHIMIRE © ${currentYear}`;
    }
  }
};

// Update copyright year on load
updateCopyrightYear();

// ========================
// CONSOLE SIGNATURE
// ========================
console.log(
  "%c👋 Hello, fellow developer!",
  "color: #00ff88; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cInterested in the code? Check out my GitHub!",
  "color: #0088ff; font-size: 14px;"
);
console.log("%c📧 ericjohn415@gmail.com", "color: #ffffff; font-size: 12px;");
