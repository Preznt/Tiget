document.addEventListener("DOMContentLoaded", () => {
  const scroll = document?.querySelector(".ranking");
  const sec = document?.querySelector("section.scroll");
  const header = document?.querySelector("header");
  const pathname = location.pathname;

  if (pathname !== "/main") {
    header.classList.add("active");
    header.style.animation = "none";
  }
  if (pathname === "/main") {
    sec?.addEventListener("scroll", () => {
      let y = scroll?.getBoundingClientRect();
      if (y.y <= 200) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    });
  }
});
