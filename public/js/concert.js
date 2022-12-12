document.addEventListener("DOMContentLoaded", () => {
  const headerBox = document.querySelector(".header.box");
  const headerBtns = document.querySelectorAll(".header.box button");

  const rheaderBox = document.querySelector(".region.box");
  const rheaderBtns = document.querySelectorAll(".region.box button");

  const imgView = document.querySelector("div.image-view");
  const imgList = document.querySelector("div.image-list");

  const bannerImgview = (e) => {
    const targetImg = e.target;
    if (targetImg.tagName === "IMG") {
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

  const bannerActive = (banner) => {
    const bannerImg = document.querySelector(".image-view img");
    const imgs = document.querySelectorAll(".image-list img");
    const length = imgs.length;

    bannerImg.src = banner[0].concert_poster;
    for (let i = 0; i < length; i++) {
      imgs[i].src = banner[i].concert_poster;
    }
  };

  const rDataActive = (region) => {
    if (!region) {
    }
    const rImgs = document.querySelectorAll("article.concert.region img");
    const rTitles = document.querySelectorAll(
      "article.concert.region div.title"
    );
    const rDates = document.querySelectorAll("article.concert.region div.date");
    const length = rImgs.length;
    for (let i = 0; i < length; i++) {
      rImgs[i].src = region[i].concert_poster;
      rTitles[i].textContent = region[i].concert_name;
      rDates[i].textContent = `${region[i].start_date} - ${region[i].end_date}`;
    }
  };

  const cDataActive = (concert) => {
    const cImgs = document.querySelectorAll("article.concert.info img");
    const cTitles = document.querySelectorAll("article.concert.info div.title");
    const cDates = document.querySelectorAll("article.concert.info div.date");
    const length = cImgs.length;

    for (let i = 0; i < length; i++) {
      cImgs[i].src = concert[i].concert_poster;
      cTitles[i].textContent = concert[i].concert_name;
      cDates[
        i
      ].textContent = `${concert[i].start_date} - ${concert[i].end_date}`;
    }
  };
  headerBox?.addEventListener("click", async (e) => {
    const event = e.target;
    if (event.tagName === "BUTTON") {
      btnActive(headerBtns, event);
      const response = await fetch(`/concert/${event.textContent}`);
      const resJson = await response.json();
      console.log(resJson);

      cDataActive(resJson);
      bannerActive(resJson);
    }
  });

  rheaderBox?.addEventListener("click", (e) => {
    const event = e.target;
    const category = event.textContent;
    const headerTitle = document.querySelector(".header.box h1").textContent;

    if (event.tagName === "BUTTON") {
      btnActive(rheaderBtns, event);
    }
    if (headerTitle == "공연") {
      fetch(`/concert/region/${category}`)
        .then((res) => res.json())
        .then((region) => rDataActive(region));
    } else {
      fetch(`/concert/festival/${category}`)
        .then((res) => res.json())
        .then((region) => rDataActive(region));
    }
  });
});
