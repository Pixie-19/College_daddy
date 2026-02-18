document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.toLowerCase();
  const isHomePage =
    path === "/" ||
    path.endsWith("/index.html") ||
    path.endsWith("/index.htm");

  if (isHomePage) {
    return;
  }

  const existingButton = document.getElementById("scrollToTopBtn");
  if (existingButton) {
    existingButton.remove();
  }

  if (!document.getElementById("backToTopStyles")) {
    const style = document.createElement("style");
    style.id = "backToTopStyles";
    style.textContent = `
      .back-to-top-btn {
        position: fixed;
        pointer-events: none;
        right: 1.25rem;
        bottom: 1.25rem;
        width: 3rem;
        height: 3rem;
        border: none;
        border-radius: 999px;
        background: var(--primary-color, #009dff);
        color: var(--text-light, #ffffff);
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(12px) scale(0.9);
        transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease, background 0.2s ease;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(0, 157, 255, 0.4);
      }

      .back-to-top-btn.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .back-to-top-btn:hover {
        background: var(--primary-hover, #00c8ff);
        box-shadow: 0 6px 20px rgba(0, 157, 255, 0.5);
      }

      .back-to-top-btn:focus-visible {
        outline: 2px solid var(--text-light, #ffffff);
        outline-offset: 3px;
      }

      @media (max-width: 768px) {
        .back-to-top-btn {
          right: 1rem;
          bottom: 1rem;
          width: 2.75rem;
          height: 2.75rem;
          font-size: 1.1rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "back-to-top-btn";
  button.setAttribute("aria-label", "Back to top");
  button.setAttribute("title", "Back to top");
  button.innerHTML = '<span aria-hidden="true">\u2191</span>';

  const updateVisibility = () => {
    const shouldShow = window.scrollY > 220;
    button.classList.toggle("visible", shouldShow);
    button.setAttribute("aria-hidden", shouldShow ? "false" : "true");
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });

  document.body.appendChild(button);
  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
});
