window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("intro-logo").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }, 3500); // Delay to match fade-out
});


document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let interval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      dots[i].classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startAutoSlide() {
    interval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(parseInt(dot.dataset.index));
      startAutoSlide();
    });
  });

  // Start the carousel
  showSlide(0);
  startAutoSlide();
});

