document.addEventListener("DOMContentLoaded", () => {
  const btnGenre = document.querySelector("div.title button.genre");
  const btnPerform = document.querySelector("div.title button.perform");
  const titleBox = document.querySelector("div.ranking div.title");

  const subtitleBox = document.querySelector("div.ranking div.sub-title");
  let subtitleBtns = document.querySelectorAll(".ranking div.sub-title button");
  const rankingImgs = document.querySelectorAll("div.ranking div.detail img");
  const rankingTitles = document.querySelectorAll(
    ".ranking div.detail div.title"
  );
  const rankingDates = document.querySelectorAll(
    ".ranking div.detail div.date"
  );
  const rankingURL = document.querySelectorAll(".ranking div.detail a");

  const genre = ["POP", "발라드", "인디", "재즈", "락"];
  const genreCode = ["G0001", "G0004", "G0013", "G0010", "G0002"];
  const concert = ["국내", "내한", "페스티벌"];

  // 공연, 장르별 클릭시 카테고리 변경
  titleBox?.addEventListener("click", async (e) => {
    const event = e.target;
    if (event.tagName === "BUTTON") {
      const titleName = event.textContent;

      if (titleName === "장르별 랭킹") {
        btnPerform.classList.add("non-active");
        btnPerform.classList.add("hover");
        btnGenre.classList.remove("hover");
        btnGenre.style.color = "black";
        subtitleBox.textContent = "";

        // 장르별 카테고리 생성
        for (let i = 0; i < genre.length; i++) {
          const btn = document.createElement("BUTTON");
          btn.textContent = genre[i];
          btn.dataset.index = i + 1;
          btn.id = genreCode[i];
          subtitleBox.appendChild(btn);
        }
        const response = await fetch(`/concert/genre/G0001`);
        const joinGenre = await response.json();
        const gConcerts = await joinGenre.map((concert) => {
          return concert.f_concert;
        });
        console.log(gConcerts);
        dataActive(gConcerts);
      } else {
        btnPerform.classList.remove("non-active");
        btnPerform.classList.remove("hover");
        btnGenre.classList.add("hover");
        btnGenre.style.color = "#ccc";
        subtitleBox.textContent = "";

        // 카테고리 생성
        for (let i = 0; i < concert.length; i++) {
          const btn = document.createElement("BUTTON");
          btn.textContent = concert[i];
          btn.dataset.index = i + 1;
          subtitleBox.appendChild(btn);
        }
        fetch(`/concert/국내`)
          .then((res) => res.json())
          .then((concerts) => {
            // console.log(concerts);
            dataActive(concerts);
          });
      }
    }

    subtitleBtns = document.querySelectorAll(".ranking div.sub-title button");
    subtitleBtns[0].classList.add("active");
  });

  // 공연별 카테고리 버튼 클릭했을 때 css 변경
  const btnActive = (event) => {
    const btnIndex = event.dataset.index;
    // console.log(btnIndex);
    for (let btn of subtitleBtns) {
      btn.classList.remove("active");
    }
    subtitleBtns[btnIndex - 1].classList.add("active");
  };

  //  카테고리별로 데이터 보여주기
  const dataActive = (concerts) => {
    console.log(concerts);

    const length = rankingTitles.length;
    for (let i = 0; i < length; i++) {
      const concert = concerts[i];
      rankingTitles[i].textContent = concert.concert_name;
      rankingImgs[i].src = concert.concert_poster;
      rankingDates[
        i
      ].textContent = `${concert.start_date} - ${concert.end_date}`;
      console.log(concert.concert_code);
      rankingURL[
        i
      ].href = `http://localhost:3002/detail/${concert.concert_code}`;
    }
  };

  // 해당 카테고리에 대한 데이터 가져오기
  subtitleBox?.addEventListener("click", (e) => {
    const event = e.target;
    if (event.tagName === "BUTTON") {
      btnActive(event);
      const category = event.textContent;
      const gCategory = event.id;
      console.log(gCategory);

      if (gCategory) {
        fetch(`/concert/genre/${gCategory}`)
          .then((res) => res.json())
          .then((genre) =>
            genre.map((concert) => {
              return concert.f_concert;
            })
          )
          .then((concerts) => dataActive(concerts));
      } else {
        fetch(`/concert/${category}`)
          .then((res) => res.json())
          .then((concerts) => {
            // console.log(concerts);
            dataActive(concerts);
          });
      }
    }
  });
  // };
});
