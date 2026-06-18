const revealElements = document.querySelectorAll('.reveal');
const portraitImage = document.querySelector('.portrait-image');
const portraitFallback = document.querySelector('.portrait-fallback');

if (portraitImage && portraitFallback) {
  portraitImage.addEventListener('error', () => {
    portraitImage.style.display = 'none';
    portraitFallback.classList.remove('is-hidden');
  });

  portraitImage.addEventListener('load', () => {
    portraitFallback.classList.add('is-hidden');
  });

  if (portraitImage.complete && portraitImage.naturalWidth > 0) {
    portraitFallback.classList.add('is-hidden');
  }
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p:last-child');

if (footerText) {
  footerText.textContent = `Built as a single-page portfolio from your resume details. ${currentYear}.`;
}
