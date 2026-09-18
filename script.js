// ===========================
// MOBILE MENU
// ===========================
const menuBtn = document.getElementById("menuBtn");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobLinks = document.querySelectorAll(".mob-link, .mob-cta");

if (menuBtn && mobileOverlay) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.classList.toggle("open");
    mobileOverlay.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = mobileOverlay.classList.contains("open") ? "hidden" : "";
  });

  mobLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("open");
      mobileOverlay.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.querySelector(".navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });
}

// ===========================
// SCROLL PROGRESS BAR
// ===========================
const progressBar = document.getElementById("progressBar");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = (scrollHeight > 0 ? (scrollTop / scrollHeight * 100) : 0) + "%";
  });
}

// ===========================
// ACTIVE NAV LINK BY CURRENT PAGE
// ===========================
const navLinks = document.querySelectorAll(".nav-links a, .mob-link");
let currentPage = location.pathname.split("/").pop();
if (!currentPage) currentPage = "index.html";
// The Veda case-study page belongs under "Projects" for nav purposes
const activeMatch = currentPage === "veda.html" ? "projects.html" : currentPage;

navLinks.forEach(link => {
  const linkPage = link.getAttribute("href").split("/").pop();
  link.classList.toggle("active", linkPage === activeMatch);
});

// ===========================
// REVEAL ON SCROLL
// ===========================
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===========================
// TYPING EFFECT
// ===========================
const typingEl = document.getElementById("typing");
if (typingEl) {
  const words = ["Frontend Developer", "UI/UX Designer", "SaaS Frontend Specialist", "Problem Solver"];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    typingEl.textContent = words[0];
  } else {
    let i = 0, j = 0, isDeleting = false;

    function type() {
      const current = words[i];
      typingEl.textContent = isDeleting ? current.substring(0, j--) : current.substring(0, j++);

      if (!isDeleting && j === current.length + 1) {
        isDeleting = true;
        return setTimeout(type, 1300);
      }
      if (isDeleting && j < 0) {
        isDeleting = false;
        j = 0;
        i = (i + 1) % words.length;
      }
      setTimeout(type, isDeleting ? 45 : 95);
    }
    type();
  }
}

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const submitBtn = document.getElementById("submitBtn");
  const submitSpinner = document.getElementById("submitSpinner");
  const submitLabel = document.getElementById("submitLabel");
  const formStatus = document.getElementById("formStatus");

  function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const msg = field.querySelector(".error-msg");
    if (message) {
      field.classList.add("invalid");
      if (msg) msg.textContent = message;
    } else {
      field.classList.remove("invalid");
      if (msg) msg.textContent = "";
    }
  }

  function validate() {
    let valid = true;
    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const type = document.getElementById("cf-type").value.trim();
    const message = document.getElementById("cf-message").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) { setError("field-name", "Please enter your name."); valid = false; }
    else setError("field-name", "");

    if (!email) { setError("field-email", "Please enter your email."); valid = false; }
    else if (!emailPattern.test(email)) { setError("field-email", "Please enter a valid email."); valid = false; }
    else setError("field-email", "");

    if (!type) { setError("field-type", "Please select a project type."); valid = false; }
    else setError("field-type", "");

    if (!message) { setError("field-message", "Please add a short message."); valid = false; }
    else setError("field-message", "");

    return valid;
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "";
    formStatus.className = "form-status";

    if (!validate()) {
      formStatus.textContent = "Please fix the highlighted fields.";
      formStatus.classList.add("error");
      return;
    }

    submitBtn.disabled = true;
    submitSpinner.classList.add("show");
    submitLabel.textContent = "Opening email…";

    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const type = document.getElementById("cf-type").value.trim();
    const message = document.getElementById("cf-message").value.trim();

    const subject = encodeURIComponent(`New project inquiry — ${type}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${type}\n\nMessage:\n${message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:mcstevensonchukwunenye@gmail.com?subject=${subject}&body=${body}`;
      submitBtn.disabled = false;
      submitSpinner.classList.remove("show");
      submitLabel.textContent = "Send Message →";
      formStatus.textContent = "Your email app should now be open — just hit send.";
      formStatus.classList.add("success");
    }, 700);
  });
}

// ===========================
// SCREENSHOT LIGHTBOX (support gallery)
// ===========================
const shots = document.querySelectorAll(".support-shot");
const lightbox = document.getElementById("lightbox");

if (shots.length && lightbox) {
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  shots.forEach(shot => {
    shot.addEventListener("click", () => {
      const img = shot.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = img.alt;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
}
