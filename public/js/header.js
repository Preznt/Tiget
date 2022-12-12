document.addEventListener("DOMContentLoaded", () => {
  const scroll = document?.querySelector(".ranking");
  const sec = document?.querySelector("section.scroll");
  const header = document?.querySelector("header");
  const pathname = location.pathname;

  if (pathname !== "/main") {
    header.classList.add("active");
  }

  sec?.addEventListener("scroll", () => {
    let y = scroll.getBoundingClientRect();
    if (pathname === "/main" && y.y <= 200) {
      header.classList.add("active");
      header.style.animation = "0.3s ease-out changeBg";
    } else {
      header.classList.remove("active");
    }
  });
});
