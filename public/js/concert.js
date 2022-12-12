document.addEventListener("DOMContentLoaded", () => {
  const headerBox = document.querySelector(".header.box");
  const headerBtns = document.querySelectorAll(".header.box button");

  const rheaderBox = document.querySelector(".region.box");
  const rheaderBtns = document.querySelectorAll(".region.box button");

  const rImgs = document.querySelectorAll("article.concert.region img");
  const rTitles = document.querySelectorAll("article.concert.region div.title");
  const rDates = document.querySelectorAll("article.concert.region div.date");

  const imgView = document.querySelector("div.image-view");
  const imgList = document.querySelector("div.image-list");

  const bannerImgview = (e) => {
    const targetImg = e.target;
    if (targetImg.tagName === "IMG") {
      console.log(targetImg.src);
      const newImg = document.createElement("IMG");
      newImg.src = targetImg.src;
      imgView.appendChild(newImg);

      document.querySelector(".image-view img").classList.add("effect");
      document.querySelector(".image-view img").remove();
    }
  };

  imgList?.addEventListener("mouseover", bannerImgview);

  // 카테고리 변경 클릭시 CSS 변경
  const btnActive = (btns, event) => {
    const btnIndex = event.dataset.index;
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove("active");
    }
    btns[btnIndex].classList.add("active");
  };

  const dataActive = (region) => {
    const length = rImgs.length;
    for (let i = 0; i < length; i++) {
      rImgs[i].src = region[i].concert_poster;
      rTitles[i].textContent = region[i].concert_name;
      rDates[i].textContent = `${region[i].start_date} - ${region[i].end_date}`;
    }
  };
  headerBox?.addEventListener("click", (e) => {
    const event = e.target;
    if (event.tagName === "BUTTON") {
      btnActive(headerBtns, event);

      fetch(`/concert/region/${event.textContent}`)
        .then((res) => res.json)
        .then((bigCa) => console.log(bigCa));
    }
  });

  rheaderBox?.addEventListener("click", (e) => {
    const event = e.target;
    const category = event.textContent;
    const activeType = document.querySelector(
      ".header.box button.active"
    ).textContent;

    console.log(activeType);

    if (event.tagName === "BUTTON") {
      btnActive(rheaderBtns, event);
    }
    fetch(`/concert/region/${activeType}/${category}`)
      .then((res) => res.json())
      .then((region) => dataActive(region));
  });
});
