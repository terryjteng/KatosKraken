// corebound.js

document.addEventListener('DOMContentLoaded', () => {
  // Navbar glow on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Hide all modals on page load
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'none';
  });

  // Setup modal triggers using inline onclick or optional [data-modal-target]
  document.querySelectorAll('.character-card').forEach(card => {
    const inlineHandler = card.getAttribute('onclick');
    if (!inlineHandler) {
      const modalId = card.dataset.modalTarget;
      if (modalId) {
        card.addEventListener('click', () => showModal(modalId));
      }
    }
  });
});

// Show a specific modal
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'flex';
}

// Close a specific modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
}

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
