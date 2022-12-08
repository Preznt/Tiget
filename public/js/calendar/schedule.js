document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.querySelector("div.calendar");
  const tbody = document.querySelector(".calendar .tbody");
  const bgBlur = document.querySelector("div.bg_blur");

  const modal = {
    modal: document.querySelector(".calendar.modal"),
    image: document.querySelector(".modal.image"),
    name: document.querySelector(".name"),
    start: document.querySelector(".start_date"),
    end: document.querySelector(".end_date"),
    artist: document.querySelector(".artist"),
    btnDetail: document.querySelector(".modal#btn_info"),
    btnTicketing: document.querySelector(".modal#btn_ticketing"),
    btnClose: document.querySelector("button.modal.btn_close"),
    open() {
      this.modal.classList.add("visible");
      bgBlur.classList.add("active");
    },
    close() {
      this.modal.classList.remove("visible");
      bgBlur.classList.remove("active");
    },
    showDetail(code, data) {
      this.image.src = `${data.concert_poster}`;
      this.name.textContent = data.concert_name;
      this.start.textContent = data.start_date;
      this.end.textContent = data.end_date;
      this.artist.textContent = data.artist_name;

      this.btnDetail?.addEventListener("click", () => {
        this.btnDetail.href = `/detail/${code}`;
      });

      this.btnTicketing?.addEventListener("click", () => {
        this.btnTicketing.href = `${data.concert_ticketing}`;
        this.btnTicketing.target = "_blank";
      });
    },
  };

  // 이벤트 버블링 이용, schedule 클릭 시 modal 창과 bgBlur 띄우기
  calendar?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "schedule") {
      modal.open();
    }
  });

  // bgBlur나 modal 창의 close 버튼 클릭 시 modal 창과 bgBlur 닫기
  bgBlur?.addEventListener("click", () => {
    modal.close();
  });
  modal.btnClose?.addEventListener("click", () => {
    modal.close();
  });

  const filterData = (array, code, column) => {
    // 클릭한 콘서트의 코드와 일치하는 데이터 반환
    let data = array.filter((data) => {
      if (data.concert_code === code) return data;
    });
    // 만약 가수가 많다면(data의 요소가 2개 이상)
    // 해당 공연의 가수 리스트를 배열에 저장 후
    // 첫번째 요소의 artist_name 속성에 배열 할당
    let arr = [];
    if (data.length > 1) {
      for (let i of data) {
        if (!arr.includes(i[column])) {
          arr = arr.concat(i[column]);
        }
      }
      data[0][column] = arr;
    }
    data = data[0];
    return data;
  };

  tbody?.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.className === "schedule") {
      const thisCode = target.dataset.code;
      const thisData = filterData(conData, thisCode, "artist_name");
      modal.showDetail(thisCode, thisData);
    }
  });
});
