document.addEventListener("DOMContentLoaded", () => {
  const subtitleBox = document.querySelector(".recommend div.sub-title");
  const subtitleBtns = document.querySelectorAll(
    ".recommend div.sub-title button"
  );

  const recommendImgs = document.querySelectorAll(".recommend div.detail img");
  const recommendTitles = document.querySelectorAll(
    ".recommend div.detail div.title"
  );
  const recommendDates = document.querySelectorAll(
    ".recommend div.detail div.date"
  );

  // 공연별 카테고리 버튼 클릭했을 때 css 변경
  const btnActive = (event) => {
    const btnIndex = event.dataset.index;
    console.log(btnIndex);
    for (let btn of subtitleBtns) {
      btn.classList.remove("active");
    }
    subtitleBtns[btnIndex - 1].classList.add("active");
  };

  //  카테고리별로 데이터 보여주기
  const dataActive = (recommends) => {
    const posterLinks = recommends.map((recommend) => {
      return recommend.concert_poster;
    });

    const concertTitles = recommends.map((recommend) => {
      return recommend.concert_name;
    });

    const concertdates = recommends.map((recommend) => {
      return `${recommend.start_date} - ${recommend.end_date}`;
    });

    // console.log(concertdates);

    posterLinks.forEach((poster, index) => {
      recommendImgs[index].src = poster;
    });

    concertTitles.forEach((title, index) => {
      recommendTitles[index].textContent = title;
    });

    concertdates.forEach((date, index) => {
      recommendDates[index].textContent = date;
    });
  };

  // 해당 카테고리에 대한 데이터 가져오기
  subtitleBox?.addEventListener("click", (e) => {
    const event = e.target;
    if (event.tagName === "BUTTON") {
      btnActive(event);
      const category = event.textContent;
      console.log(category);
      fetch(`/concert/recommend/${category}`)
        .then((res) => res.json())
        .then((recommend) => dataActive(recommend));
    }
  });
});
