// bigboss.js

document.addEventListener("DOMContentLoaded", () => {
  // Lightbox preview for concept art images
  const images = document.querySelectorAll(".concept-gallery img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      const lightbox = document.createElement("div");
      lightbox.id = "lightbox";
      lightbox.style.position = "fixed";
      lightbox.style.top = 0;
      lightbox.style.left = 0;
      lightbox.style.width = "100%";
      lightbox.style.height = "100%";
      lightbox.style.background = "rgba(0, 0, 0, 0.8)";
      lightbox.style.display = "flex";
      lightbox.style.alignItems = "center";
      lightbox.style.justifyContent = "center";
      lightbox.style.zIndex = "1000";

      const enlarged = document.createElement("img");
      enlarged.src = img.src;
      enlarged.style.maxWidth = "90%";
      enlarged.style.maxHeight = "90%";
      enlarged.style.border = "5px solid white";
      enlarged.style.borderRadius = "10px";
      lightbox.appendChild(enlarged);

      lightbox.addEventListener("click", () => {
        lightbox.remove();
      });

      document.body.appendChild(lightbox);
    });
  });

  // Optional: Add animated scroll effects later if needed
});
