document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.querySelector("div.calendar");
  const tbody = document.querySelector(".calendar .tbody");
  const bgBlur = document.querySelector("div.bg_blur");
  const modal = document.querySelector(".calendar.modal");
  const btnDetail = document.querySelector("a#btn_info");
  const btnTicketing = document.querySelector("a#btn_ticketing");
  const btnClose = document.querySelector("button.modal.btn_close");
  const bookmark = document.querySelector("#input_bookmark");

  // 사용자가 선택한 스케줄의 concert_code 전역변수
  let thisCode;

  const modalOpen = () => {
    modal.classList.add("visible");
    bgBlur.classList.add("active");
  };

  const modalClose = () => {
    modal.classList.remove("visible");
    bgBlur.classList.remove("active");
  };

  const showInfo = async (code) => {
    const fetchOption = {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: { "Content-Type": "application/json" },
    };
    await fetch("/main/info", fetchOption)
      .then((res) => res.json())
      .then((json) => ddd(json));
  };

  const ddd = (data) => {
    let { conInfo, interCon } = data;
    conInfo = conInfo[0];
    const image = document.querySelector(".modal.image");
    const name = document.querySelector(".name");
    const start = document.querySelector(".start_date");
    const end = document.querySelector(".end_date");
    const place = document.querySelector(".place");

    image.src = `${conInfo.concert_poster}`;
    name.textContent = conInfo.concert_name;
    start.textContent = conInfo.start_date;
    end.textContent = conInfo.end_date;
    place.textContent = conInfo.concert_place;
    if (interCon === true) {
      bookmark.checked = true;
    }
    if (interCon === false || null) {
      bookmark.checked = false;
    }
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
      const data = showInfo(thisCode);
    }
  });

  // bgBlur나 modal 창의 close 버튼 클릭 시 modal 창과 bgBlur 닫기
  bgBlur?.addEventListener("click", () => {
    modalClose();
  });
  btnClose?.addEventListener("click", () => {
    modalClose();
  });

  // modal 화면 내 버튼 클릭 이벤트
  btnDetail?.addEventListener("click", () => {
    location.href = `/detail/${thisCode}`;
  });

  btnTicketing?.addEventListener("click", () => {
    btnTicketing.href = `${data.concert_ticketing}`;
    btnTicketing.target = "_blank";
  });

  bookmark?.addEventListener("click", async () => {
    const value = bookmark.checked;
    const fetchOption = {
      method: "POST",
      body: JSON.stringify({ value, thisCode }),
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch("/main/bookmark", fetchOption);
    if (result === "insert") {
      bookmark.checked = true;
    }
    if (result === "delete") {
      bookmark.checked = false;
    }
  });
});
