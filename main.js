
/* =========================================================
   PRASANNADEVI S — PORTFOLIO MAIN.JS
   Supports the updated Home, About and Contact sections.
   Preserves existing sections and their interactions.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  /* =======================================================
     1. PAGE LOAD
     ======================================================= */

  document.body.classList.add("page-loaded");

  /* =======================================================
     2. STICKY HEADER
     ======================================================= */

  const header = $(".site-header") || $("header");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 30);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =======================================================
     3. MOBILE NAVIGATION
     ======================================================= */

  const menuBtn = $("#menuBtn");
  const nav = $("#nav") || $(".navigation");

  function closeMenu() {
    if (!nav) return;

    nav.classList.remove("open", "active");

    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "false");

      const icon = $("i, svg", menuBtn);
      if (icon) {
        icon.classList.remove("fa-xmark", "fa-times");
        icon.classList.add("fa-bars");
      }
    }
  }

  if (menuBtn && nav) {
    menuBtn.setAttribute("aria-label", "Toggle navigation");
    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", () => {
      const isOpen =
        nav.classList.contains("open") ||
        nav.classList.contains("active");

      if (isOpen) {
        closeMenu();
      } else {
        nav.classList.add("open", "active");
        menuBtn.setAttribute("aria-expanded", "true");

        const icon = $("i, svg", menuBtn);
        if (icon) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        }
      }
    });

    $$("#nav a, .navigation a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("open") ||
        nav.classList.contains("active")
      ) {
        if (
          !nav.contains(event.target) &&
          !menuBtn.contains(event.target)
        ) {
          closeMenu();
        }
      }
    });
  }

  /* =======================================================
     4. SMOOTH SCROLLING
     ======================================================= */

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = $(href);
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start",
      });

      if (window.location.hash !== href) {
        history.replaceState(null, "", href);
      }
    });
  });

  /* =======================================================
     5. HERO TYPING ANIMATION
     ======================================================= */

  const typedElement = $("#typed");

  if (typedElement) {
    const words = [
      "AI-powered tools.",
      "cloud applications.",
      "intelligent systems.",
      "reliable software.",
    ];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      typedElement.textContent = words[0];
    } else {
      let wordIndex = 0;
      let characterIndex = 0;
      let deleting = false;

      function typeNextCharacter() {
        const word = words[wordIndex];

        if (!deleting) {
          characterIndex++;
          typedElement.textContent = word.slice(0, characterIndex);

          if (characterIndex >= word.length) {
            deleting = true;
            window.setTimeout(typeNextCharacter, 1600);
            return;
          }

          window.setTimeout(typeNextCharacter, 75);
        } else {
          characterIndex--;
          typedElement.textContent = word.slice(0, characterIndex);

          if (characterIndex <= 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            window.setTimeout(typeNextCharacter, 350);
            return;
          }

          window.setTimeout(typeNextCharacter, 35);
        }
      }

      typeNextCharacter();
    }
  }

  /* =======================================================
     6. SCROLL REVEAL ANIMATIONS
     ======================================================= */

  const revealElements = $$(
    ".reveal, .reveal-left, .reveal-right"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible", "show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible", "show");
    });
  }

  /* =======================================================
     7. ACTIVE NAVIGATION LINK
     ======================================================= */

  const sections = $$("main section[id], section[id]");

  const navLinks = $$("#nav a[href^='#'], .navigation a[href^='#']");

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      const matches = link.getAttribute("href") === `#${id}`;

      link.classList.toggle("active", matches);

      if (matches) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length) {
          setActiveLink(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* =======================================================
     8. BACK-TO-TOP BUTTON
     ======================================================= */

  const toTop = $("#toTop") || $("#backToTop");

  function updateBackToTop() {
    if (!toTop) return;

    const show = window.scrollY > 450;
    toTop.classList.toggle("visible", show);
    toTop.classList.toggle("show", show);
    toTop.setAttribute("aria-hidden", String(!show));
  }

  if (toTop) {
    updateBackToTop();

    window.addEventListener(
      "scroll",
      updateBackToTop,
      { passive: true }
    );

    toTop.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
      });
    });
  }

  /* =======================================================
     9. CONTACT FORM
     ======================================================= */

  const contactForm =
    $("#contactForm") ||
    $(".contact-form") ||
    $("#contact form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      // Keep normal HTML/FormSubmit submission enabled.
      // Do not preventDefault(): doing so would stop delivery.
      const submitButton = $(
        'button[type="submit"], input[type="submit"]',
        contactForm
      );

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        event.preventDefault();
        return;
      }

      if (submitButton) {
        submitButton.dataset.originalText =
          submitButton.tagName === "INPUT"
            ? submitButton.value
            : submitButton.textContent;

        submitButton.disabled = true;

        if (submitButton.tagName === "INPUT") {
          submitButton.value = "Sending...";
        } else {
          submitButton.textContent = "Sending...";
        }

        // Restore the button if submission is cancelled or
        // the browser stays on this page.
        window.setTimeout(() => {
          if (!document.hidden && submitButton.isConnected) {
            submitButton.disabled = false;

            if (submitButton.tagName === "INPUT") {
              submitButton.value =
                submitButton.dataset.originalText || "Send message";
            } else {
              submitButton.textContent =
                submitButton.dataset.originalText || "Send message";
            }
          }
        }, 5000);
      }
    });
  }

  /* =======================================================
     10. CURRENT YEAR IN FOOTER
     ======================================================= */

  const yearElement = $("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =======================================================
     11. EXTERNAL LINKS SECURITY
     ======================================================= */

  $$('a[target="_blank"]').forEach((link) => {
    const relValues = new Set(
      (link.getAttribute("rel") || "")
        .split(/\s+/)
        .filter(Boolean)
    );

    relValues.add("noopener");
    relValues.add("noreferrer");

    link.setAttribute("rel", [...relValues].join(" "));
  });

  /* =======================================================
     12. PROFILE IMAGE FALLBACK
     ======================================================= */

  const profileImages = $$(".hx-photo img, .about-photo");

  profileImages.forEach((img) => {
    img.addEventListener("error", () => {
      img.classList.add("image-unavailable");
      console.warn(
        "Profile image could not be loaded. Check the image filename and path."
      );
    });
  });

  /* =======================================================
     13. PROJECT CARD HOVER EFFECT
     ======================================================= */

  const projectCards = $$(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-hovered");
    });
  });

  /* =======================================================
     14. IMAGE AND LINK ACCESSIBILITY
     ======================================================= */

  $$("img").forEach((img) => {
    if (!img.hasAttribute("loading") && !img.closest(".hx-stage")) {
      img.loading = "lazy";
    }

    if (!img.hasAttribute("decoding")) {
      img.decoding = "async";
    }
  });

  /* =======================================================
     HOME — 3D TILT (reference design)
     ======================================================= */

  const hxStage = $("#tiltStage");
  const hxCard = $("#tiltCard");

  if (
    hxStage &&
    hxCard &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    hxStage.addEventListener("mousemove", (event) => {
      if (window.innerWidth < 1000) return;

      const rect = hxStage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      hxCard.style.transform =
        `rotateX(${-y * 18}deg) rotateY(${x * 22}deg)`;
    });

    hxStage.addEventListener("mouseleave", () => {
      hxCard.style.transform = "";
    });
  }

  console.log("Portfolio JavaScript initialized successfully.");
});
