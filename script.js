// ===========================
// MOBILE MENU
// ===========================
const menuBtn = document.getElementById("menuBtn");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobLinks = document.querySelectorAll(".mob-link");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  mobileOverlay.classList.toggle("open");
  document.body.style.overflow = mobileOverlay.classList.contains("open") ? "hidden" : "";
});

mobLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    mobileOverlay.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ===========================
// SCROLL PROGRESS BAR
// ===========================
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById("progressBar").style.width = (scrollTop / scrollHeight * 100) + "%";
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// ===========================
// REVEAL ON SCROLL
// ===========================
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===========================
// TYPING EFFECT
// ===========================
const words = ["Web Developer", "Virtual Assistant", "Customer Support Pro"];
let i = 0, j = 0, isDeleting = false;

function type() {
  const current = words[i];
  const el = document.getElementById("typing");

  el.textContent = isDeleting ? current.substring(0, j--) : current.substring(0, j++);

  if (!isDeleting && j === current.length + 1) {
    isDeleting = true;
    return setTimeout(type, 1200);
  }

  if (isDeleting && j < 0) {
    isDeleting = false;
    j = 0;
    i = (i + 1) % words.length;
  }

  setTimeout(type, isDeleting ? 45 : 95);
}

type();

// ===========================
// SCROLL TO CONTACT
// ===========================
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// ===========================
// PROJECT FILTER
// ===========================
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card[data-cat]");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const show = filter === "all" || card.dataset.cat === filter;
      card.classList.toggle("hidden", !show);
      // re-trigger reveal animation
      if (show) {
        card.classList.remove("visible");
        setTimeout(() => card.classList.add("visible"), 10);
      }
    });
  });
});
