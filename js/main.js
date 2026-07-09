(() => {
  const header = document.querySelector(".site-header");
  const days = document.querySelectorAll(".day");

  const setHeaderOffset = () => {
    if (!header) return;
    const height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty(
      "--header-offset",
      `${height + 24}px`
    );
  };

  setHeaderOffset();
  window.addEventListener("resize", setHeaderOffset);
  window.addEventListener("load", setHeaderOffset);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setHeaderOffset);
  }

  if (!days.length) return;

  if (!("IntersectionObserver" in window)) {
    days.forEach((day) => day.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  days.forEach((day) => observer.observe(day));
})();
