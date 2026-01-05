"use strict";

// ========================
// NAVIGATION HANDLING
// ========================
const navLinks = document.querySelectorAll(".pro-nav-link");
const menuToggle = document.querySelector(".pro-menu-toggle");
const nav = document.querySelector(".pro-nav-links");

const closeMenu = () => {
  menuToggle.classList.remove("active");
  nav.classList.remove("active");
  document.body.classList.remove("no-scroll");
};

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    // Defensively check for a valid anchor link before querying the DOM
    const target = href && href.startsWith("#") && href.length > 1 ? document.querySelector(href) : null;

    if (nav.classList.contains("active")) {
      closeMenu();
    }

    if (target) {
      // Use a timeout to ensure the menu is closed before scrolling
      setTimeout(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300); // 300ms matches the CSS transition
    }
  });
});

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  nav.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

// ========================
// NAVIGATION ACTIVE STATE ON SCROLL
// ========================
const sections = document.querySelectorAll(".pro-section");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
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
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !message) {
      formStatus.textContent = "Please fill out all fields.";
      formStatus.className = "form-status error";
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.className = "form-status error";
        return;
    }

    formStatus.textContent = "Opening your email client...";
    formStatus.className = "form-status success";

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nFrom Email: ${email}\n\nMessage:\n${message}`
    );
    const mailtoLink = `mailto:ericjohn415@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    // Reset form and status after a short delay
    setTimeout(() => {
      contactForm.reset();
      formStatus.textContent = "";
      formStatus.className = "form-status";
    }, 3000);
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