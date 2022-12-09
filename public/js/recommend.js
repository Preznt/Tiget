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
    const length = recommendTitles.length;
    for (let i = 0; i < length; i++) {
      const recommend = recommends[i];
      recommendTitles[i].textContent = recommend.concert_name;
      recommendImgs[i].src = recommend.concert_poster;
      recommendDates[
        i
      ].textContent = `${recommend.start_date} - ${recommend.end_date}`;
    }
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
