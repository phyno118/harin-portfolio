(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector(".scroll-progress span");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const cursorRing = document.querySelector(".custom-cursor-ring");
  const cursorDot = document.querySelector(".custom-cursor-dot");

  let pageReadyTimer = null;
  const showPage = () => {
    window.clearTimeout(pageReadyTimer);
    document.body.classList.remove("is-ready");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        pageReadyTimer = window.setTimeout(() => {
          document.body.classList.add("is-ready");
        }, reducedMotion ? 0 : 160);
      });
    });
  };
  showPage();
  window.addEventListener("pageshow", (event) => {
    document.body.classList.remove("is-leaving");
    if (event.persisted) showPage();
  });

  if (!coarsePointer && !reducedMotion && cursorRing && cursorDot) {
    document.body.classList.add("has-custom-cursor");
    let pointerX = -40;
    let pointerY = -40;
    let ringX = -40;
    let ringY = -40;
    let cursorStarted = false;

    const renderCursor = () => {
      ringX += (pointerX - ringX) * 0.2;
      ringY += (pointerY - ringY) * 0.2;
      cursorRing.style.setProperty("--cursor-x", `${ringX.toFixed(2)}px`);
      cursorRing.style.setProperty("--cursor-y", `${ringY.toFixed(2)}px`);
      window.requestAnimationFrame(renderCursor);
    };

    document.addEventListener("pointermove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!cursorStarted) {
        ringX = pointerX;
        ringY = pointerY;
        cursorStarted = true;
      }
      cursorDot.style.setProperty("--cursor-x", `${pointerX}px`);
      cursorDot.style.setProperty("--cursor-y", `${pointerY}px`);
      cursorRing.classList.add("is-visible");
      cursorDot.classList.add("is-visible");
      const interactive = event.target.closest("a, button, .project-hero, .result-card, .petory-board li");
      cursorRing.classList.toggle("is-hovering", Boolean(interactive));
    }, { passive: true });

    document.addEventListener("pointerdown", () => cursorRing.classList.add("is-pressed"));
    document.addEventListener("pointerup", () => cursorRing.classList.remove("is-pressed"));
    document.documentElement.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("is-visible", "is-hovering", "is-pressed");
      cursorDot.classList.remove("is-visible");
    });
    window.addEventListener("blur", () => {
      cursorRing.classList.remove("is-visible", "is-hovering", "is-pressed");
      cursorDot.classList.remove("is-visible");
    });
    window.requestAnimationFrame(renderCursor);
  }

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

  if (nav && "IntersectionObserver" in window) {
    const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
    const sectionLinks = new Map(navLinks.map((link) => [
      document.querySelector(link.getAttribute("href")),
      link
    ]).filter(([section]) => section));
    const projectLink = nav.querySelector('a[href="#project-index"]');
    ["#lumirin", "#cgv", "#petory", "#flowly"].forEach((selector) => {
      const section = document.querySelector(selector);
      if (section && projectLink) sectionLinks.set(section, projectLink);
    });
    const navObserver = new IntersectionObserver((entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!activeEntry) return;
      navLinks.forEach((link) => link.classList.remove("is-active"));
      sectionLinks.get(activeEntry.target)?.classList.add("is-active");
    }, { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.15, 0.4] });
    sectionLinks.forEach((_, section) => navObserver.observe(section));
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
  let previewTimer = null;
  document.querySelectorAll(".project-list a").forEach((link) => {
    const updatePreview = () => {
      if (!previewImage || !petoryPreview) return;
      const image = link.dataset.preview;
      window.clearTimeout(previewTimer);
      preview.classList.add("is-changing");
      preview.setAttribute("aria-busy", "true");
      previewTimer = window.setTimeout(() => {
        if (image) {
          previewImage.src = image;
          previewImage.alt = link.dataset.alt || "";
          previewImage.hidden = false;
          petoryPreview.hidden = true;
        } else {
          previewImage.hidden = true;
          petoryPreview.hidden = false;
        }
        window.requestAnimationFrame(() => {
          preview.classList.remove("is-changing");
          preview.removeAttribute("aria-busy");
        });
      }, reducedMotion ? 0 : 180);
    };
    link.addEventListener("mouseenter", updatePreview);
    link.addEventListener("focus", updatePreview);
  });

  document.querySelectorAll(".button").forEach((button) => {
    const release = () => button.classList.remove("is-pressed");
    button.addEventListener("pointerdown", () => button.classList.add("is-pressed"));
    button.addEventListener("pointerup", release);
    button.addEventListener("pointerleave", release);
    button.addEventListener("blur", release);
  });

  if (!reducedMotion) {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (!link || event.defaultPrevented || link.target === "_blank" || link.hasAttribute("download")) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;
      event.preventDefault();
      document.body.classList.remove("is-ready");
      document.body.classList.add("is-leaving");
      window.setTimeout(() => {
        window.location.href = destination.href;
      }, 560);
    });
  }

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
