document.addEventListener("DOMContentLoaded", () => {
  const headerBox = document.querySelector(".header.box");
  const headerBtns = document.querySelectorAll(".header.box button");

  const rheaderBox = document.querySelector(".region.box");
  const rheaderBtns = document.querySelectorAll(".region.box button");

  headerBox?.addEventListener("click", (e) => {
    const btn = e.target;
    const btnIndex = btn.dataset.index;
    if (btn.tagName === "BUTTON") {
      for (let i = 0; i < headerBtns.length; i++) {
        headerBtns[i].classList.remove("active");
      }
      headerBtns[btnIndex].classList.add("active");
    }
  });

  rheaderBox?.addEventListener("click", (e) => {
    const btn = e.target;
    const btnIndex = btn.dataset.index;
    if (btn.tagName === "BUTTON") {
      for (let i = 0; i < rheaderBtns.length; i++) {
        rheaderBtns[i].classList.remove("active");
      }
      rheaderBtns[btnIndex].classList.add("active");
    }
  });
});
