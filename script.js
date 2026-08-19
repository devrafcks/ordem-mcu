(function () {
  var heroBg = document.getElementById("hero-bg");
  var hero = document.getElementById("hero");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
