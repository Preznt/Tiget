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
    showDetail(code, list) {
      // 클릭한 콘서트의 code 와 일치하는 데이터만 배열로 반환
      let data = list.filter((e) => {
        return e.concert_code == code;
      });
      data = data[0];

      this.image.src = `${data.concert_poster}`;
      this.name.textContent = data.concert_name;
      this.start.textContent = data.start_date;
      this.end.textContent = data.end_date;

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

  tbody?.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.className === "schedule") {
      const thisCode = target.dataset.code;
      modal.showDetail(thisCode, conData);
    }
  });
});
