document.addEventListener("DOMContentLoaded", () => {
  const slide = document.querySelector(".curl");
  const gradient = document.querySelector(".mosaic.gradient");
  const entrance = document.querySelector("a.entrance");
  // slide?.addEventListener("mouseover", () => {
  //   gradient.style.display = "block";
  // });
  // slide?.addEventListener("mouseout", () => {
  //   gradient.style.display = "none";
  // });

  slide?.addEventListener("click", (e) => {
    const target = e.target;
    if ((target.tagName = "A")) {
      document.location.href = `${entrance.href}`;
    }
  });
});
