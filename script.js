(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector(".scroll-progress span");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -3% 0px" });
    reveals.forEach((element) => revealObserver.observe(element));

    let revealFrame = null;
    const revealPassedElements = () => {
      revealFrame = null;
      reveals.forEach((element) => {
        if (element.classList.contains("is-visible")) return;
        if (element.getBoundingClientRect().top > window.innerHeight * 0.97) return;
        element.classList.add("is-visible");
        revealObserver.unobserve(element);
      });
    };
    window.addEventListener("scroll", () => {
      if (revealFrame !== null) return;
      revealFrame = window.requestAnimationFrame(revealPassedElements);
    }, { passive: true });
    window.requestAnimationFrame(revealPassedElements);
  }

  const preview = document.querySelector(".index-preview");
  const previewImage = preview?.querySelector("img");
  const petoryPreview = preview?.querySelector(".petory-preview");
  document.querySelectorAll(".project-list a").forEach((link) => {
    const updatePreview = () => {
      if (!previewImage || !petoryPreview) return;
      const image = link.dataset.preview;
      if (image) {
        previewImage.src = image;
        previewImage.alt = link.dataset.alt || "";
        previewImage.hidden = false;
        petoryPreview.hidden = true;
      } else {
        previewImage.hidden = true;
        petoryPreview.hidden = false;
      }
    };
    link.addEventListener("mouseenter", updatePreview);
    link.addEventListener("focus", updatePreview);
  });

  if (!reducedMotion && !coarsePointer) {
    const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
    let ticking = false;
    const updateParallax = () => {
      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const strength = Number(item.dataset.parallax || 0.02);
        const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * strength;
        item.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateParallax);
    }, { passive: true });
    updateParallax();
  }
})();
