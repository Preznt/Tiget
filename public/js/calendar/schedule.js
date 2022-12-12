document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.querySelector("div.calendar");
  const tbody = document.querySelector(".calendar .tbody");
  const bgBlur = document.querySelector("div.bg_blur");
  const modal = document.querySelector(".calendar.modal");
  const btnDetail = document.querySelector("a#btn_info");
  const btnTicketing = document.querySelector("a#btn_ticketing");
  const btnClose = document.querySelector("button.modal.btn_close");
  const bookmark = document.querySelector("#bookmark");
  const favoriteList = document.querySelector("div.ticket_shape.content");

  const image = document.querySelector(".modal.image");
  const name = document.querySelector(".name");
  const start = document.querySelector(".start_date");
  const end = document.querySelector(".end_date");
  const place = document.querySelector(".place");

  // 사용자가 선택한 스케줄의 concert_code 전역변수
  let thisCode;

  // calendar 찜 목록 표시
  const showIntCon = async () => {
    await fetch("/main/favorites")
      .then((res) => res.json())
      .then((json) => {
        let lists = json.interConList;
        favoriteList.textContent = "";
        if (lists !== null) {
          for (let ele of lists) {
            let a = document.createElement("a");
            a.textContent = ele.concert_name;
            a.href = `/detail/${ele.concert_code}`;
            favoriteList.appendChild(a);
          }
        }
      });
  };

  // 렌더링 시 실행
  showIntCon();

  // 다른 페이지에서 찜하고 메인페이지로 되돌아오면 반영되지 않는다
  // window.addEventListener("pageshow", (e) => {
  //   if (e.persisted) {
  //     showIntCon();
  //   }
  // });

  const modalOpen = () => {
    modal.classList.add("visible");
    bgBlur.classList.add("active");
  };

  const modalClose = () => {
    modal.classList.remove("visible");
    bgBlur.classList.remove("active");

    image.src = "";
    name.textContent = "";
    start.textContent = "";
    end.textContent = "";
    place.textContent = "";
  };

  // 클릭한 concert code 와 유저 bookmark 체크 후 modal 표시
  const chkInfo = async (code) => {
    const fetchOption = {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: { "Content-Type": "application/json" },
    };
    await fetch("/main/info", fetchOption)
      .then((res) => res.json())
      .then((json) => showInfo(json));
  };

  const showInfo = (data) => {
    let { conInfo, interCon } = data;
    conInfo = conInfo[0];

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
      const data = chkInfo(thisCode);
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

  bookmark?.addEventListener("click", async (e) => {
    const value = bookmark.checked;
    const fetchOption = {
      method: "POST",
      body: JSON.stringify({ value, thisCode }),
      headers: { "Content-Type": "application/json" },
    };
    await fetch("/main/bookmark", fetchOption)
      .then((res) => res.text())
      .then((text) => {
        if (text === "insert") {
          bookmark.checked = true;
          showIntCon();
          return false;
        }
        if (text === "delete") {
          bookmark.checked = false;
          showIntCon();
          return false;
        }
        if (text === "failed") {
          alert("로그인 후 이용해주세요");
          bookmark.checked = false;
          return false;
        }
      });
  });
});
