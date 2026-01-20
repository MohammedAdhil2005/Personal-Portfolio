
document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     CUSTOM SMOOTH SCROLL
  ================================ */
  function smoothScroll(target, duration = 900) {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;

    const start = window.pageYOffset;
    const end =
      target.getBoundingClientRect().top + start - navbarHeight;

    let startTime = null;

    function ease(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      window.scrollTo(
        0,
        start + (end - start) * ease(progress)
      );

      if (progress < 1) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  }

  /* NAVBAR LINK SCROLL */
  document.querySelectorAll('.navbar a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      console.log("clicked", link.getAttribute('href'));

      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) smoothScroll(target);
    });
  });

});



/* ===============================
   HERO BUTTONS
================================ */
document.querySelector('.btn.primary')?.addEventListener('click', () => {
  const projects = document.querySelector('#projects');
  if (projects) smoothScroll(projects);
});

document.querySelector('.btn.outline')?.addEventListener('click', () => {
  const contact = document.querySelector('#contact');
  if (contact) smoothScroll(contact);
});

document.querySelector('.scroll')?.addEventListener('click', () => {
  const about = document.querySelector('#about');
  if (about) smoothScroll(about);
});

/* ===============================
   ACTIVE NAV ON SCROLL
================================ */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - window.innerHeight / 3;
    const bottom = top + sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
});

/* ===============================
   STAGGER REVEAL ANIMATION
================================ */
const revealItems = document.querySelectorAll(
  '.skill-card, .service-card, .project-card, .exp-card, .cert-card, .info-card, .contact-form, .info-box'
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('reveal');
        }, index * 120); // stagger effect like video
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach(el => observer.observe(el));

/* ===============================
   THEME TOGGLE
================================ */
const themeBtn = document.querySelector('.theme');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  themeBtn.textContent = isLight ? '🌙' : '☀️';
});


/* ===============================
   CONTACT FORM FEEDBACK (WORKING)
================================ */
const form = document.querySelector('.contact-form');

form?.addEventListener('submit', async e => {
  e.preventDefault(); // handle submission manually
  const btn = form.querySelector('button');
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.8';

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#2ecc71';
      form.reset();
    } else {
      btn.textContent = 'Send Message ➤';
      btn.style.background = '#e63946';
      alert('Oops! Something went wrong. Please try again.');
    }
  } catch (error) {
    btn.textContent = 'Send Message ➤';
    btn.style.background = '#e63946';
    alert('Network error. Please try again.');
  }

  setTimeout(() => {
    btn.textContent = 'Send Message ➤';
    btn.style.background = '#e63946';
    btn.style.opacity = '1';
  }, 2000);
});

/* ===============================
   RESUME DOWNLOAD BUTTON
================================ */
document.querySelector('.download-btn')?.addEventListener('click', () => {
  window.open('assets/ADHIL CORE RESUME.pdf', '_blank');
});

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("Please fill all the details before sending!");
    return false; // stop sending
  }

  alert("Message sent successfully!");
  return true; // allow send
}