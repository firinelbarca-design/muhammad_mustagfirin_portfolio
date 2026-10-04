const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.work-card');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxClose = document.getElementById('lightboxClose');
const workButtons = document.querySelectorAll('.work-image');

document.getElementById('year').textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;

    cards.forEach(card => {
      const categories = card.dataset.category.split(' ');
      const show = selected === 'all' || categories.includes(selected);
      card.classList.toggle('hidden', !show);
    });
  });
});

function openLightbox(button) {
  lightboxImage.src = button.dataset.full;
  lightboxImage.alt = button.querySelector('img').alt;
  lightboxTitle.textContent = button.dataset.title;
  lightboxDescription.textContent = button.dataset.description;
  const parent = button.closest('.work-card');
  lightboxCategory.textContent = parent.querySelector('.work-info span').textContent;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  lightboxImage.src = '';
}

workButtons.forEach(button => button.addEventListener('click', () => openLightbox(button)));
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});
