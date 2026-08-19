(function () {
  var heroBg = document.getElementById("hero-bg");
  var hero = document.getElementById("hero");
  var heroNebula = document.getElementById("hero-nebula");
  var heroCanvas = document.getElementById("hero-canvas");
  var heroTitle = document.getElementById("hero-title");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Split hero title into per-letter spans for the staggered entrance animation
  if (heroTitle) {
    var counter = 0;
    (function splitChars(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === Node.TEXT_NODE) {
          var frag = document.createDocumentFragment();
          child.textContent.split("").forEach(function (ch) {
            var span = document.createElement("span");
            span.className = "title-char";
            span.style.setProperty("--i", counter++);
            span.textContent = ch === " " ? " " : ch;
            frag.appendChild(span);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          splitChars(child);
        }
      });
    })(heroTitle);
  }

  // Animated starfield + nebula/parallax drift behind the hero
  if (heroCanvas && hero && !reduceMotion) {
    var ctx = heroCanvas.getContext("2d");
    var stars = [];
    var starCount = 160;
    var w, h, dpr;

    function resizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.offsetWidth;
      h = hero.offsetHeight;
      heroCanvas.width = w * dpr;
      heroCanvas.height = h * dpr;
      heroCanvas.style.width = w + "px";
      heroCanvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeStars() {
      stars = [];
      for (var i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.3,
          depth: Math.random() * 0.8 + 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.005
        });
      }
    }

    resizeCanvas();
    makeStars();

    function drawStars(time) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var twinkle = 0.55 + Math.sin(time * s.speed * 60 + s.phase) * 0.45;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (0.7 + s.depth * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + Math.max(0, twinkle * s.depth).toFixed(3) + ")";
        ctx.fill();
      }
    }

    var animId;
    function animateStars() {
      drawStars(Date.now() * 0.001);
      animId = window.requestAnimationFrame(animateStars);
    }
    animateStars();

    var resizeTicking = false;
    window.addEventListener("resize", function () {
      if (!resizeTicking) {
        window.requestAnimationFrame(function () {
          resizeCanvas();
          makeStars();
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    });

    // Subtle mouse parallax on the nebula and starfield layers
    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      var mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      var my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      heroCanvas.style.transform = "translate3d(" + (mx * -10) + "px," + (my * -10) + "px,0)";
      heroNebula.style.transform = "translate3d(" + (mx * 16) + "px," + (my * 16) + "px,0)";
    });
  }

  if (heroBg && hero && !reduceMotion) {
    var ticking = false;

    function updateParallax() {
      var heroHeight = hero.offsetHeight;
      var scrollY = window.scrollY;

      if (scrollY < heroHeight) {
        var offset = scrollY * 0.35;
        heroBg.style.transform = "translate3d(0, " + offset + "px, 0) scale(1.15)";
        if (heroNebula) {
          heroNebula.style.opacity = String(Math.max(0, 1 - scrollY / heroHeight));
        }
      }
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    updateParallax();
  }

  var navLinks = document.querySelectorAll(".phase-nav a");
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute("href"));
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var index = sections.indexOf(entry.target);
        if (index === -1) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          navLinks[index].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });

    sections.forEach(function (section) {
      if (section) observer.observe(section);
    });
  }
})();
