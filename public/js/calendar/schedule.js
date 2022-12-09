document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.querySelector("div.calendar");
  const tbody = document.querySelector(".calendar .tbody");
  const bgBlur = document.querySelector("div.bg_blur");
  const modal = document.querySelector(".calendar.modal");
  const btnDetail = document.querySelector("a#btn_info");
  const btnTicketing = document.querySelector("a#btn_ticketing");
  const btnClose = document.querySelector("button.modal.btn_close");
  let thisCode;

  const modalOpen = () => {
    modal.classList.add("visible");
    bgBlur.classList.add("active");
  };

  const modalClose = () => {
    modal.classList.remove("visible");
    bgBlur.classList.remove("active");
  };

  const showDetail = (code, list) => {
    const image = document.querySelector(".modal.image");
    const name = document.querySelector(".name");
    const start = document.querySelector(".start_date");
    const end = document.querySelector(".end_date");
    const place = document.querySelector(".place");

    // 클릭한 콘서트의 code 와 일치하는 데이터만 배열로 반환
    let data = list.filter((e) => {
      return e.concert_code == code;
    });
    data = data[0];

    image.src = `${data.concert_poster}`;
    name.textContent = data.concert_name;
    start.textContent = data.start_date;
    end.textContent = data.end_date;
    place.textContent = data.concert_place;
  };

  // 이벤트 버블링 이용, schedule 클릭 시 modal 창과 bgBlur 띄우기
  calendar?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "schedule") {
      modalOpen();
    }
  });
  tbody?.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.className === "schedule") {
      thisCode = target.dataset.code;
      showDetail(thisCode, conData);
    }
  });

  // bgBlur나 modal 창의 close 버튼 클릭 시 modal 창과 bgBlur 닫기
  bgBlur?.addEventListener("click", () => {
    modalClose();
  });
  btnClose?.addEventListener("click", () => {
    modalClose();
  });

  btnDetail?.addEventListener("click", () => {
    location.href = `/detail/${thisCode}`;
  });
  btnTicketing?.addEventListener("click", () => {
    btnTicketing.href = `${data.concert_ticketing}`;
    btnTicketing.target = "_blank";
  });
});
