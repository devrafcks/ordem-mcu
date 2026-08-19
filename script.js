(function () {
  var heroBg = document.getElementById("hero-bg");
  var hero = document.getElementById("hero");
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

  if (heroBg && hero && !reduceMotion) {
    var ticking = false;

    function updateParallax() {
      var heroHeight = hero.offsetHeight;
      var scrollY = window.scrollY;

      if (scrollY < heroHeight) {
        var offset = scrollY * 0.35;
        heroBg.style.transform = "translate3d(0, " + offset + "px, 0) scale(1.15)";
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

  var navLinks = document.querySelectorAll(".phase-nav-links a");
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

  // Reading progress bar under the sticky nav
  var navProgress = document.getElementById("nav-progress");
  if (navProgress) {
    var progressTicking = false;
    function updateNavProgress() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      navProgress.style.width = pct + "%";
      progressTicking = false;
    }
    window.addEventListener("scroll", function () {
      if (!progressTicking) {
        window.requestAnimationFrame(updateNavProgress);
        progressTicking = true;
      }
    }, { passive: true });
    updateNavProgress();
  }
})();
