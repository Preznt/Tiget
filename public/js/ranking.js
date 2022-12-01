document.addEventListener("DOMContentLoaded", () => {
  const btnGenre = document.querySelector("div.title button.genre");
  const btnPerform = document.querySelector("div.title button.perform");
  const titleBox = document.querySelector("div.ranking div.title");

  const subtitleBox = document.querySelector("div.ranking div.sub-title");
  const subtitleBtns = document.querySelectorAll(
    ".ranking div.sub-title button"
  );
  const rankingImgs = document.querySelectorAll("div.ranking div.detail img");

  // 공연, 장르별 클릭시 카테고리 변경
  titleBox?.addEventListener("click", (e) => {
    const event = e.target;
    if (event.tagName === "BUTTON") {
      const titleName = event.textContent;
      if (titleName === "장르별 랭킹") {
        btnPerform.classList.add("non-active");
        btnGenre.style.color = "black";
        const genre = ["KPOP", "발라드", "인디"];
        for (let i = 0; i < subtitleBtns.length; i++) {
          subtitleBox[i].textContent = genre[i];
        }
      } else {
        btnPerform.classList.remove("non-active");
        btnGenre.style.color = "#ccc";
        const concert = ["국내", "내한", "페스티벌"];
        for (let i = 0; i < subtitleBtns.length; i++) {
          subtitleBox[i].textContent = concert[i];
        }
      }
    }
  });

  // 공연별 카테고리에 대한 데이터 보여주기
  subtitleBox?.addEventListener("click", (e) => {
    const event = e.target;
    if (event.tagName === "BUTTON") {
      const subtitleName = event.textContent;
      if (subtitleName === "국내") {
        event.classList.add("active");
        subtitleBtns[1].classList.remove("active");
        subtitleBtns[2].classList.remove("active");
        // subtitleBtns[2].classList.toggle("active");

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
        subtitleBtns[0].classList.remove("active");
        subtitleBtns[2].classList.remove("active");
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
});
