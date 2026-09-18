/* =========================================================
   PRASANNA DEVI S — PORTFOLIO JS
   Preloader · nav · scroll reveal · typing effect
   3D tilt visuals · glow parallax · contact form
========================================================= */


/* =========================================================
   PRELOADER
========================================================= */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader?.classList.add("hide");
  }, 500);
});

/* Safety net in case the load event is delayed by slow assets */
setTimeout(() => {
  loader?.classList.add("hide");
}, 2200);


/* =========================================================
   FOOTER YEAR
========================================================= */

const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {

  const isOpen = nav.classList.toggle("open");

  menuBtn.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  const icon = menuBtn.querySelector("i");

  icon?.classList.toggle("fa-bars");
  icon?.classList.toggle("fa-xmark");

});


document.querySelectorAll(".nav-link").forEach(link => {

  link.addEventListener("click", () => {

    nav?.classList.remove("open");

    menuBtn?.setAttribute(
      "aria-expanded",
      "false"
    );

    const icon = menuBtn?.querySelector("i");

    icon?.classList.remove("fa-xmark");
    icon?.classList.add("fa-bars");

  });

});


/* =========================================================
   HEADER SCROLL STATE
   ACTIVE NAV
   BACK TO TOP
========================================================= */

const header = document.getElementById("header");
const toTop = document.getElementById("toTop");

const sections = document.querySelectorAll(
  "section[id]"
);

const navLinks = document.querySelectorAll(
  ".nav-link"
);


function onScroll() {

  header?.classList.toggle(
    "scrolled",
    window.scrollY > 40
  );

  toTop?.classList.toggle(
    "show",
    window.scrollY > 500
  );


  const position =
    window.scrollY + 160;


  sections.forEach(section => {

    if (
      position >= section.offsetTop &&
      position <
        section.offsetTop +
        section.offsetHeight
    ) {

      const id = section.id;


      navLinks.forEach(link => {

        link.classList.toggle(
          "active",
          link.getAttribute("href") ===
          `#${id}`
        );

      });

    }

  });

}


window.addEventListener(
  "scroll",
  onScroll,
  { passive: true }
);

onScroll();


/* =========================================================
   BACK TO TOP
========================================================= */

toTop?.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


const revealElements =
  document.querySelectorAll(".reveal");


if (
  "IntersectionObserver" in window &&
  !prefersReducedMotion
) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(el => {

    revealObserver.observe(el);

  });

} else {

  revealElements.forEach(el => {

    el.classList.add("visible");

  });

}


/* =========================================================
   TYPING EFFECT
========================================================= */

const typedEl =
  document.getElementById("typed");


const phrases = [

  "reliable software.",
  "AI-powered tools.",
  "cloud-native systems.",
  "clean, tested code."

];


let phraseIndex = 0;
let charIndex = 0;
let deleting = false;


function typeLoop() {

  if (
    !typedEl ||
    prefersReducedMotion
  ) {
    return;
  }


  const phrase =
    phrases[phraseIndex];


  if (!deleting) {

    charIndex++;

    typedEl.textContent =
      phrase.slice(
        0,
        charIndex
      );


    if (
      charIndex >=
      phrase.length
    ) {

      deleting = true;

      setTimeout(
        typeLoop,
        1500
      );

      return;
    }


  } else {

    charIndex--;

    typedEl.textContent =
      phrase.slice(
        0,
        charIndex
      );


    if (charIndex <= 0) {

      deleting = false;

      phraseIndex =
        (
          phraseIndex + 1
        ) %
        phrases.length;

    }

  }


  setTimeout(
    typeLoop,
    deleting ? 40 : 75
  );

}


if (
  prefersReducedMotion &&
  typedEl
) {

  typedEl.textContent =
    phrases[0];

} else {

  setTimeout(
    typeLoop,
    900
  );

}


/* =========================================================
   HERO 3D TILT
   Signature interactive moment
========================================================= */

const tiltStage =
  document.getElementById(
    "tiltStage"
  );

const tiltCard =
  document.getElementById(
    "tiltCard"
  );


if (!prefersReducedMotion) {


  /* -------------------------------------------------------
     HERO TILT
  ------------------------------------------------------- */

  tiltStage?.addEventListener(
    "mousemove",
    event => {

      if (
        window.innerWidth < 1000 ||
        !tiltCard
      ) {
        return;
      }


      const rect =
        tiltStage.getBoundingClientRect();


      const x =
        (
          event.clientX -
          rect.left
        ) /
        rect.width -
        0.5;


      const y =
        (
          event.clientY -
          rect.top
        ) /
        rect.height -
        0.5;


      tiltCard.style.transform =
        `rotateX(${-y * 18}deg) rotateY(${x * 22}deg)`;

    }
  );


  tiltStage?.addEventListener(
    "mouseleave",
    () => {

      if (tiltCard) {

        tiltCard.style.transform = "";

      }

    }
  );


  /* -------------------------------------------------------
     CARD HOVER TILT
  ------------------------------------------------------- */

  document
    .querySelectorAll(".tilt-hover")
    .forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          if (
            window.innerWidth < 1000
          ) {
            return;
          }


          const rect =
            card.getBoundingClientRect();


          const x =
            (
              event.clientX -
              rect.left
            ) /
            rect.width -
            0.5;


          const y =
            (
              event.clientY -
              rect.top
            ) /
            rect.height -
            0.5;


          card.style.transform =
            `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 8}deg) translateY(-4px)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    });


  /* -------------------------------------------------------
     AMBIENT GLOW PARALLAX
  ------------------------------------------------------- */

  const glowBlue =
    document.getElementById(
      "glowBlue"
    );

  const glowPurple =
    document.getElementById(
      "glowPurple"
    );


  window.addEventListener(
    "mousemove",
    event => {

      if (
        window.innerWidth < 1000
      ) {
        return;
      }


      const x =
        event.clientX /
        window.innerWidth -
        0.5;


      const y =
        event.clientY /
        window.innerHeight -
        0.5;


      if (glowBlue) {

        glowBlue.style.transform =
          `translate(${x * 50}px, ${y * 50}px)`;

      }


      if (glowPurple) {

        glowPurple.style.transform =
          `translate(${x * -40}px, ${y * -40}px)`;

      }

    }
  );

}


/* =========================================================
   CONTACT FORM
   Client-side only
========================================================= */

const contactForm =
  document.getElementById(
    "contactForm"
  );


const formStatus =
  document.getElementById(
    "formStatus"
  );


contactForm?.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const fields = [

      document.getElementById(
        "cName"
      ),

      document.getElementById(
        "cEmail"
      ),

      document.getElementById(
        "cSubject"
      ),

      document.getElementById(
        "cMessage"
      )

    ];


    if (
      fields.some(
        field =>
          !field?.value.trim()
      )
    ) {

      if (formStatus) {

        formStatus.textContent =
          "Please fill in all fields.";

      }

      return;
    }


    if (formStatus) {

      formStatus.textContent =
        "Message ready — connect a backend or email service to receive submissions.";

    }


    contactForm.reset();


    setTimeout(() => {

      if (formStatus) {

        formStatus.textContent = "";

      }

    }, 5000);

  }
);


/* =========================================================
   =========================================================
   3D SKILLS GLOBE
   =========================================================

   THIS IS THE ONLY PART MODIFIED FOR THE NEW 3D VISUAL.

   Features:
   - Proper spherical distribution
   - Four staggered latitude bands
   - Large 3D space
   - Transparent skill labels
   - Front/back depth
   - Auto rotation
   - Mouse drag
   - Touch/swipe
   - Momentum
   - Responsive sizing
   - Reduced-motion support

========================================================= */

(function () {


  /* -------------------------------------------------------
     GET ELEMENTS
  ------------------------------------------------------- */

  const scene =
    document.getElementById(
      "skillsSphereScene"
    );


  const sphere =
    document.getElementById(
      "skillsSphere"
    );


  /* If the skills section doesn't exist,
     safely stop here. */

  if (
    !scene ||
    !sphere
  ) {

    return;

  }


  /* -------------------------------------------------------
     GET ALL SKILL TAGS
  ------------------------------------------------------- */

  const tags =
    Array.from(
      sphere.querySelectorAll(
        ".sphere-tag"
      )
    );


  const count =
    tags.length;


  if (!count) {

    return;

  }


  /* -------------------------------------------------------
     REDUCED MOTION
  ------------------------------------------------------- */

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* -------------------------------------------------------
     SPHERE POINTS
  ------------------------------------------------------- */

  const points = [];


  /* -------------------------------------------------------
     BUILD TRUE 3D SPHERE
     
     Instead of putting every item close together,
     skills are distributed across four latitude bands.

     This produces a much more recognizable globe.
  ------------------------------------------------------- */

  function buildPoints() {


    points.length = 0;


    const bands = [

      {
        lat: -58,
        count: 4,
        offset: 0.0
      },

      {
        lat: -20,
        count: 5,
        offset: 0.5
      },

      {
        lat: 20,
        count: 5,
        offset: 0.0
      },

      {
        lat: 58,
        count: 3,
        offset: 0.5
      }

    ];


    bands.forEach(
      band => {


        const lat =
          band.lat *
          Math.PI /
          180;


        const y =
          Math.sin(lat);


        const ringRadius =
          Math.cos(lat);


        for (
          let j = 0;
          j < band.count;
          j++
        ) {


          const theta =
            (
              (j + band.offset) /
              band.count
            ) *
            Math.PI *
            2;


          points.push({

            x:
              Math.cos(theta) *
              ringRadius,

            y:
              y,

            z:
              Math.sin(theta) *
              ringRadius

          });

        }

      }
    );


    /* -----------------------------------------------------
       FALLBACK FOR ADDITIONAL SKILLS

       If more skills are added to HTML than the standard
       latitude bands contain, automatically distribute the
       remaining skills across the sphere.
    ----------------------------------------------------- */

    for (
      let i = points.length;
      i < count;
      i++
    ) {


      const t =
        i -
        points.length;


      const remaining =
        Math.max(
          1,
          count -
          points.length
        );


      const phi =
        Math.acos(
          1 -
          (
            2 *
            (t + 0.5)
          ) /
          remaining
        );


      const theta =
        t *
        Math.PI *
        (
          3 -
          Math.sqrt(5)
        );


      points.push({

        x:
          Math.sin(phi) *
          Math.cos(theta),

        y:
          Math.cos(phi),

        z:
          Math.sin(phi) *
          Math.sin(theta)

      });

    }

  }


  /* -------------------------------------------------------
     CALCULATE SPHERE RADIUS
  ------------------------------------------------------- */

  function getRadius() {


    const size =
      Math.min(
        scene.clientWidth,
        scene.clientHeight
      );


    return Math.max(
      150,
      size / 2 - 20
    );

  }


  /* -------------------------------------------------------
     POSITION SKILLS
  ------------------------------------------------------- */

  function layoutSphere() {


    buildPoints();


    const radius =
      getRadius();


    tags.forEach(
      (tag, i) => {


        const p =
          points[i];


        if (!p) {
          return;
        }


        /* Store original 3D coordinates */

        tag.dataset.x =
          String(p.x);

        tag.dataset.y =
          String(p.y);

        tag.dataset.z =
          String(p.z);


        /* -------------------------------------------------
           Place skill around the sphere.
           
           The parent element handles the actual rotation.
        ------------------------------------------------- */

        tag.style.transform =
          `translate3d(${p.x * radius}px, ${-p.y * radius}px, ${p.z * radius}px) translate(-50%, -50%)`;

      }
    );

  }


  /* Initial layout */

  layoutSphere();


  /* -------------------------------------------------------
     RESPONSIVE RESIZE
  ------------------------------------------------------- */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {


      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(
          layoutSphere,
          150
        );

    }
  );


  /* =======================================================
     ROTATION STATE
  ======================================================= */

  let rotX = -12;
  let rotY = 0;


  let velX = 0;


  let velY =
    reduceMotion
      ? 0
      : 0.10;


  const autoSpeed =
    velY;


  const friction =
    0.94;


  /* -------------------------------------------------------
     DRAG STATE
  ------------------------------------------------------- */

  let dragging = false;


  let lastPointerX = 0;
  let lastPointerY = 0;


  /* =======================================================
     APPLY ROTATION
  ======================================================= */

  function applyRotation() {


    /* -----------------------------------------------------
       Rotate the entire 3D globe.
    ----------------------------------------------------- */

    sphere.style.transform =
      `rotateX(${rotX}deg) rotateY(${rotY}deg)`;


    /* -----------------------------------------------------
       Convert degrees to radians.
    ----------------------------------------------------- */

    const rx =
      rotX *
      Math.PI /
      180;


    const ry =
      rotY *
      Math.PI /
      180;


    const cosX =
      Math.cos(rx);


    const sinX =
      Math.sin(rx);


    const cosY =
      Math.cos(ry);


    const sinY =
      Math.sin(ry);


    /* -----------------------------------------------------
       DEPTH EFFECT

       Skills closer to the viewer:

       - brighter
       - more visible
       - slightly larger

       Skills behind the globe:

       - more transparent
       - visually farther away
    ----------------------------------------------------- */

    tags.forEach(
      (tag, i) => {


        const p =
          points[i];


        if (!p) {
          return;
        }


        /* Rotate around Y */

        const x1 =
          p.x * cosY +
          p.z * sinY;


        const z1 =
          -p.x * sinY +
          p.z * cosY;


        /* Rotate around X */

        const y2 =
          p.y * cosX -
          z1 * sinX;


        const z2 =
          p.y * sinX +
          z1 * cosX;


        /* -------------------------------------------------
           Convert Z depth into 0 → 1.
        ------------------------------------------------- */

        const front =
          (z2 + 1) / 2;


        /* -------------------------------------------------
           Transparency.

           Rear:
             approximately 18%

           Front:
             approximately 80%
        ------------------------------------------------- */

        const opacity =
          0.18 +
          front * 0.62;


        /* -------------------------------------------------
           Depth scale.
        ------------------------------------------------- */

        const scale =
          0.84 +
          front * 0.16;


        tag.style.opacity =
          opacity.toFixed(3);


        /* -------------------------------------------------
           Z-index makes front labels render above rear
           labels.
        ------------------------------------------------- */

        tag.style.zIndex =
          String(
            Math.round(
              10 +
              front * 100
            )
          );


        tag.style.setProperty(
          "--sphere-depth-scale",
          scale.toFixed(3)
        );

      }
    );

  }


  /* =======================================================
     POINTER DOWN
  ======================================================= */

  function onPointerDown(
    event
  ) {


    dragging = true;


    lastPointerX =
      event.clientX;


    lastPointerY =
      event.clientY;


    /* Stop previous momentum */

    velX = 0;
    velY = 0;


    /* Keep pointer interaction inside the globe */

    scene.setPointerCapture?.(
      event.pointerId
    );

  }


  /* =======================================================
     POINTER MOVE
  ======================================================= */

  function onPointerMove(
    event
  ) {


    if (!dragging) {
      return;
    }


    const dx =
      event.clientX -
      lastPointerX;


    const dy =
      event.clientY -
      lastPointerY;


    /* -----------------------------------------------------
       Horizontal drag = Y rotation
    ----------------------------------------------------- */

    rotY +=
      dx * 0.35;


    /* -----------------------------------------------------
       Vertical drag = X rotation
    ----------------------------------------------------- */

    rotX -=
      dy * 0.35;


    /* Prevent the globe from completely flipping over */

    rotX =
      Math.max(
        -78,
        Math.min(
          78,
          rotX
        )
      );


    /* -----------------------------------------------------
       Momentum velocity
    ----------------------------------------------------- */

    velX =
      dx * 0.35;


    velY =
      -dy * 0.35;


    lastPointerX =
      event.clientX;


    lastPointerY =
      event.clientY;

  }


  /* =======================================================
     POINTER UP
  ======================================================= */

  function onPointerUp() {

    dragging = false;

  }


  /* =======================================================
     POINTER EVENTS
  ======================================================= */

  scene.addEventListener(
    "pointerdown",
    onPointerDown
  );


  window.addEventListener(
    "pointermove",
    onPointerMove
  );


  window.addEventListener(
    "pointerup",
    onPointerUp
  );


  window.addEventListener(
    "pointercancel",
    onPointerUp
  );


  /* =======================================================
     ANIMATION LOOP
  ======================================================= */

  function tick() {


    /* -----------------------------------------------------
       If the user isn't dragging, continue momentum.
    ----------------------------------------------------- */

    if (!dragging) {


      if (
        Math.abs(velX) >
          0.01 ||
        Math.abs(velY) >
          0.01
      ) {


        rotY += velX;

        rotX += velY;


        rotX =
          Math.max(
            -78,
            Math.min(
              78,
              rotX
            )
          );


        /* Slow momentum down */

        velX *= friction;

        velY *= friction;


      } else if (
        !reduceMotion
      ) {


        /* -------------------------------------------------
           Automatic slow rotation when stationary.
        ------------------------------------------------- */

        rotY +=
          autoSpeed;

      }

    }


    /* Update globe */

    applyRotation();


    /* Continue animation */

    requestAnimationFrame(
      tick
    );

  }


  /* First render */

  applyRotation();


  /* Start animation */

  requestAnimationFrame(
    tick
  );


})();