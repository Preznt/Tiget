document.addEventListener("DOMContentLoaded", () => {
  const scroll = document.querySelector(".ranking");
  const sec = document.querySelector("section.scroll");
  const header = document.querySelector("header");
  sec.addEventListener("scroll", () => {
    let y = scroll.getBoundingClientRect();
    if (y.y <= 100) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });
});
