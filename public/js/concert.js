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
      const newA = document.createElement("A");

      newImg.src = targetImg.src;
      newA.href = targetImg.closest("a").href;
      newA.appendChild(newImg);
      imgView.append(newA);

      document.querySelector(".image-view a").remove();
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
      imgs[i].closest(
        "a"
      ).href = `http://localhost:3002/detail/${banner[i].concert_code}`;
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
      cImgs[i].closest(
        "a"
      ).href = `http://localhost:3002/detail/${concert[i].concert_code}`;
    }
  };

  headerBox?.addEventListener("click", async (e) => {
    const event = e.target;
    if (event.tagName === "BUTTON") {
      btnActive(headerBtns, event);
      const response = await fetch(`/concert/${event.textContent}`);
      const resJson = await response.json();
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

  // 페이지네인션 구현중
  const contents = document.querySelector("article.concert.info ul.contents");
  const buttons = document.querySelector("article.concert.info div.buttons");

  const numOfContent = 40;
  const maxContent = 10;
  const maxButton = 4;
  const maxPage = Math.ceil(numOfContent / maxContent);
  let page = 1;

  const makeContent = (id, region) => {
    const content = document.createElement("a");
    content.classList.add("content");
    content.innerHTML = `
      <img src= ${region[id - 1].concert_poster}/>
      <div class="content__title">${region[id - 1].concert_name}</span>
      <div class="content__name">${region[id - 1].concert_loc}</span>
      <div class="content__date">2022.01.01</span>
    `;
    return content;
  };

  const makeButton = (id) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.dataset.num = id;
    button.innerText = id;
    button.addEventListener("click", (e) => {
      Array.prototype.forEach.call(buttons.children, (button) => {
        if (button.dataset.num) button.classList.remove("active");
      });
      e.target.classList.add("active");
      renderContent(parseInt(e.target.dataset.num));
    });
    return button;
  };

  const renderContent = (page) => {
    // 목록 리스트 초기화
    while (contents.hasChildNodes()) {
      contents.removeChild(contents.lastChild);
    }

    // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
    for (
      let id = (page - 1) * maxContent + 1;
      id <= page * maxContent && id <= numOfContent;
      id++
    ) {
      fetch(`/concert/국내`)
        .then((res) => res.json())
        .then((region) => contents.appendChild(makeContent(id, region)));
    }
  };

  const renderButton = (page) => {
    // 버튼 리스트 초기화
    while (buttons.hasChildNodes()) {
      buttons.removeChild(buttons.lastChild);
    }
    // 화면에 최대 5개의 페이지 버튼 생성
    for (let id = page; id < page + maxButton && id <= maxPage; id++) {
      buttons.appendChild(makeButton(id));
    }
    // 첫 버튼 활성화(class="active")
    buttons.children[0].classList.add("active");

    buttons.prepend(prev);
    buttons.append(next);

    // 이전, 다음 페이지 버튼이 필요한지 체크
    if (page - maxButton < 1) buttons.removeChild(prev);
    if (page + maxButton > maxPage) buttons.removeChild(next);
  };

  const render = (page) => {
    renderContent(page);
    renderButton(page);
  };
  render(page);
});
