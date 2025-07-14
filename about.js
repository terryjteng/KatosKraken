document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll('.about-content h3');

  headers.forEach((header) => {
    header.addEventListener('mouseenter', () => {
      header.style.color = '#fff';
    });
    header.addEventListener('mouseleave', () => {
      header.style.color = '#f267a1';
    });
  });
});
