document.addEventListener("DOMContentLoaded", () => {
  const rankBox = document.querySelector("div.ranking");

  rankBox.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
    }
  });

  window.addEventListener("scroll", () => {
    let top =
      window.scrollY ||
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    if (top > 50) {
      fixedNav.classList.add("active");
    } else {
      fixedNav.classList.remove("active");
    }
  });
});
