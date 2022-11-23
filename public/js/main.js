document.addEventListener("DOMContentLoaded", () => {
  const rankBox = document.querySelector("div.ranking");
  const mainHeader = document.querySelector("header.main");

  // rankBox?.addEventListener("click", (e) => {
  //   const target = e.target;
  //   if (target.tagName === "BUTTON") {
  //   }
  // });

  window?.addEventListener("scroll", () => {
    const top = document.body.scrollTop;

    if (top > 50) {
      mainHeader.classList.add("active");
    } else {
      mainHeader.classList.remove("active");
    }
  });

  // window.onscroll = scrollF();

  // function scrollF() {
  //   if (document.body.scrollTop > 50) {
  //     mainHeader.classList.add("active");
  //   } else {
  //     mainHeader.classList.remove("active");
  //   }
  // }
});
