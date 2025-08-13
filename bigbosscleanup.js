// bigbosscleanup.js
document.addEventListener("DOMContentLoaded", () => {
  // Lightbox preview for concept art images (keep if you’re using it)
  const images = document.querySelectorAll(".concept-gallery img");
  images.forEach((img) => {
    img.addEventListener("click", () => {
      const lightbox = document.createElement("div");
      lightbox.id = "lightbox";
      Object.assign(lightbox.style, {
        position: "fixed",
        top: 0, left: 0, width: "100%", height: "100%",
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: "1000"
      });
      const enlarged = document.createElement("img");
      enlarged.src = img.src;
      Object.assign(enlarged.style, {
        maxWidth: "90%", maxHeight: "90%",
        border: "5px solid white", borderRadius: "10px"
      });
      lightbox.appendChild(enlarged);
      lightbox.addEventListener("click", () => lightbox.remove());
      document.body.appendChild(lightbox);
    });
  });

  // Optional: mobile menu toggle if your theme has a burger
  const burger = document.querySelector(".bbc-burger");
  const mobile = document.querySelector(".mobile-navbar");
  if (burger && mobile) {
    burger.addEventListener("click", () => {
      const open = mobile.style.display === "block";
      mobile.style.display = open ? "none" : "block";
      burger.setAttribute("aria-expanded", String(!open));
    });
    mobile.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        mobile.style.display = "none";
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
