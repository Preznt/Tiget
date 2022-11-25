document.addEventListener("DOMContentLoaded", () => {
  const rankBox = document.querySelector("div.ranking");
  const mainHeader = document.querySelector("header.main");
  const pageView1 = document.querySelector("div.ranking");
  const pageView2 = document.querySelector("section.calendar.container");
  const pageView3 = document.querySelector("section.main3");
  const navButtons = document.querySelector("div.main.button.box button");

  navButtons?.addEventListener("click", (e) => {
    const button = e.target;
    const btnClass = button.textContent;
    if (btnClass == "캘린더") {
      let location = pageView1.offsetTop;
      window.scrollTo({ top: location - 100, behavior: "smooth" });
    }
  });
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
