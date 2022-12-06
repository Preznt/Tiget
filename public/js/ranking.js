document.addEventListener("DOMContentLoaded", () => {
  const btnGenre = document.querySelector("div.title button.genre");
  const btnPerform = document.querySelector("div.title button.perform");
  const titleBox = document.querySelector("div.ranking div.title");

  const subtitleBox = document.querySelector("div.ranking div.sub-title");
  const subtitleBtns = document.querySelectorAll(
    ".ranking div.sub-title button"
  );
  const rankingImgs = document.querySelectorAll("div.ranking div.detail img");

  const genre = ["POP", "발라드", "인디", "재즈", "락/메탈"];
  const concert = ["국내", "내한", "페스티벌"];

  // 공연, 장르별 클릭시 카테고리 변경
  titleBox?.addEventListener("click", (e) => {
    const event = e.target;
    if (event.tagName === "BUTTON") {
      const titleName = event.textContent;

      if (titleName === "장르별 랭킹") {
        btnPerform.classList.add("non-active");
        btnGenre.style.color = "black";
        subtitleBox.textContent = "";

        for (let i = 0; i < genre.length; i++) {
          const btn = document.createElement("BUTTON");
          btn.textContent = genre[i];
          btn.dataset.index = i + 1;
          subtitleBox.appendChild(btn);
        }
      } else {
        btnPerform.classList.remove("non-active");
        btnGenre.style.color = "#ccc";
        subtitleBox.textContent = "";

        for (let i = 0; i < concert.length; i++) {
          const btn = document.createElement("BUTTON");
          btn.textContent = concert[i];
          btn.dataset.index = i + 1;
          subtitleBox.appendChild(btn);
        }
      }
    }
  });

  // 예시 데이터
  let imgs = [];

  const internalImgs = [
    "http://image.toast.com/aaaaab/ticketlink/TKL_1/jan_daegu_221020.jpg",
    "http://image.toast.com/aaaaab/ticketlink/TKL_5/ep_pst1109.jpg",
    "http://image.toast.com/aaaaab/ticketlink/TKL_4/cats_pst1107.jpg",
    "http://image.toast.com/aaaaab/ticketlink/TKL_8/poster(220915)b.jpg",
  ];
  const externalImgs = [
    "http://tkfile.yes24.com/upload2/perfblog/202211/20221115/20221115-44119.jpg/dims/quality/70/",
    "http://tkfile.yes24.com/upload2/perfblog/202211/20221111/20221111-44100.jpg/dims/quality/70/",
    "http://tkfile.yes24.com/upload2/perfblog/202211/20221116/20221116-44165.jpg/dims/quality/70/",
    "http://tkfile.yes24.com/upload2/perfblog/202209/20220915/20220915-43512.jpg/dims/quality/70/",
  ];

  const festivalImgs = [
    "http://tkfile.yes24.com/upload2/perfblog/202209/20220915/20220915-43512.jpg/dims/quality/70/",
    "http://tkfile.yes24.com/upload2/perfblog/202209/20220915/20220915-43512.jpg/dims/quality/70/",
    "http://tkfile.yes24.com/upload2/perfblog/202209/20220915/20220915-43512.jpg/dims/quality/70/",
    "http://tkfile.yes24.com/upload2/perfblog/202209/20220915/20220915-43512.jpg/dims/quality/70/",
  ];

  // 공연별 카테고리 버튼 클릭했을 때 css 변경
  const btnActive = (event) => {
    const btnIndex = event.dataset.index;
    for (let btn of subtitleBtns) {
      btn.classList.remove("active");
    }
    subtitleBtns[btnIndex - 1].classList.add("active");
  };

  // 공연별 카테고리에 대한 데이터 보여주기
  const dataActive = (event) => {
    const subtitleName = event.textContent;
    for (let i = 0; i < subtitleBtns.length; i++) {
      if (subtitleName == concert[i]) {
        btnActive(event);
        // switch (i) {
        //   case "0":
        //     imgs = imgs;
        //     break;
        //   case "1":
        //     imgs = internalImgs;
        //     break;
        //   case "2":
        //     imgs = festivalImgs;
        //     break;
        // }
        if (i == "0") {
          imgs = internalImgs;
        } else if (i == "1") {
          imgs = externalImgs;
        } else {
          imgs = festivalImgs;
        }

        // console.log(imgs);
        imgs.forEach((img, index) => {
          rankingImgs[index].src = img;
        });
        return false;
      }
    }
  };

  subtitleBox?.addEventListener("click", (e) => {
    const event = e.target;
    if (event.tagName === "BUTTON") {
      dataActive(event);
    }
  });
});
