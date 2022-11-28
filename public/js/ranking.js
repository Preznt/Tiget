document.addEventListener("DOMContentLoaded", () => {
  const btnGenre = document.querySelector(".ranking div.title button.genre");
  const btnPerform = document.querySelector(
    ".ranking div.title button.perform"
  );
  const titleBox = document.querySelector("div.ranking div.title");

  const subtitleBox = document.querySelector("div.ranking div.sub-title");
  const subtitleBtns = document.querySelector(
    "div.ranking div.sub-title button"
  );
  const rankingImgs = document.querySelectorAll("div.ranking div.detail img");

  btnGenre?.addEventListener("click", () => {
    btnPerform.classList.add("non-active");
  });

  subtitleBox?.addEventListener("click", (e) => {
    const event = e.target;
    if (event.tagName === "BUTTON") {
      const subtitleName = event.textContent;
      if (subtitleName === "국내") {
        event.classList.add("active");

        let imgs = [
          "http://image.toast.com/aaaaab/ticketlink/TKL_1/jan_daegu_221020.jpg",
          "http://image.toast.com/aaaaab/ticketlink/TKL_5/ep_pst1109.jpg",
          "http://image.toast.com/aaaaab/ticketlink/TKL_4/cats_pst1107.jpg",
          "http://image.toast.com/aaaaab/ticketlink/TKL_8/poster(220915)b.jpg",
        ];
        imgs.forEach((img, index) => {
          rankingImgs[index].src = img;
        });
        return false;
      } else if (subtitleName === "내한") {
        event.classList.add("active");
        let imgs = [
          "http://tkfile.yes24.com/upload2/perfblog/202211/20221115/20221115-44119.jpg/dims/quality/70/",
          "http://tkfile.yes24.com/upload2/perfblog/202211/20221111/20221111-44100.jpg/dims/quality/70/",
          "http://tkfile.yes24.com/upload2/perfblog/202211/20221116/20221116-44165.jpg/dims/quality/70/",
          "http://tkfile.yes24.com/upload2/perfblog/202209/20220915/20220915-43512.jpg/dims/quality/70/",
        ];
        imgs.forEach((img, index) => {
          rankingImgs[index].src = img;
        });
        return false;
      }
    }
  });
  // window?.addEventListener("scroll", () => {
  //   const top = document.body.scrollTop;

  //   if (top > 50) {
  //     mainHeader.classList.add("active");
  //   } else {
  //     mainHeader.classList.remove("active");
  //   }
  // });
});
