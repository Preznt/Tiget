document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.querySelector("table.calendar");
  const btnPrev = document.querySelector("button.prev");
  const btnNext = document.querySelector("button.next");
  const btnToday = document.querySelector("button.today");
  const btnSearchDetail = document.querySelector("button.btn_search_detail");
  const bgBlur = document.querySelector("div.bg_blur");
  const btnModalClose = document.querySelector("button.modal.btn_close");

  const time = new Date();
  // 달력 넘기기 용도
  const valDay = {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    day: time.getDay(),
  };
  // 오늘 날짜 표시 용도
  const today = {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    day: time.getDay(),
  };

  const modal = {
    modal: document.querySelector("div.calendar.modal"),
    open() {
      this.modal.classList.add("visible");
      bgBlur.classList.add("active");
    },
    close() {
      this.modal.classList.remove("visible");
      bgBlur.classList.remove("active");
    },
  };

  const showNum = () => {
    const yearNum = document.querySelector("h2.year");
    const monthNum = document.querySelector("h1.month");
    yearNum.textContent = `${valDay.year}년`;
    monthNum.textContent = `${valDay.month}월`;
  };

  const matchToday = (arr1, arr2) => arr1.every((ele) => arr2.includes(ele));

  // !! showDate 함수를 기능별로 분할해야 함 !!
  const showDate = () => {
    const todayArr = [`y_${today.year}`, `m_${today.month}`, `d_${today.date}`];
    // lastDate: 이번 달 마지막 날짜 = 이번 달 날짜의 총 개수
    const lastDate = new Date(valDay.year, valDay.month, 0).getDate();
    // prevLastDate: 저번 달 마지막 날짜
    const prevLastDate = new Date(valDay.year, valDay.month - 1, 0).getDate();
    // prevMonthDays: 저번 달 마지막 날짜 요일 index + 1. 0(일요일)부터 시작하므로 요일 개수를 구하기 위해 + 1
    // 이번 달 첫 날짜 요일이 언제인지를 구하기 위함
    const prevMonthDays =
      new Date(valDay.year, valDay.month - 1, 0).getDay() + 1;
    /**
     * dIndex.current : 1 ~ lastDate 까지 증가
     * dIndex.prev : 이번 달 첫 주에서 표시할 저번 달의 시작 날짜(prevLastDate - 이전 요일 Index)
     *               prevMonthDays에서 + 1 했으므로 - 1
     */
    const dIndex = {
      current: 1,
      prev: prevLastDate - (prevMonthDays - 1),
      next: 1,
    };

    // 모든 td 안의 날짜 div(dateTxt) 제거
    const tdAll = document.querySelectorAll("td");
    for (let td of tdAll) {
      let dateTxt = document.querySelector(".date_txt");
      if (Array.from(td.children).includes(dateTxt)) {
        td.removeChild(dateTxt);
      }
    }

    const trs = document.querySelectorAll("table.calendar tbody tr");
    for (let j = 0; j < 6; j++) {
      let tds = trs[j].querySelectorAll("td");

      for (let k = 0; k < 7; k++) {
        let td = tds[k];
        let dateTxt = document.createElement("div");
        dateTxt.setAttribute("class", "date_txt");
        td.appendChild(dateTxt);

        // 저번 달 날짜 표시
        // prevMonthDays != 7: 저번 달 마지막 요일이 토요일(6 + 1 = 7)이면 이번 달은 일요일이므로 첫 주 공백이 없음
        if (j === 0 && prevMonthDays != 7 && k < prevMonthDays) {
          dateTxt.textContent = dIndex.prev;
          if (valDay.month === 1) {
            td.setAttribute(
              "class",
              `y_${valDay.year - 1} m_12 d_${dIndex.prev}`
            );
          } else {
            td.setAttribute(
              "class",
              `y_${valDay.year} m_${valDay.month - 1} d_${dIndex.prev}`
            );
          }
          td.classList.add("prevMonth");
          dIndex.prev++;

          // 이번 달 날짜 표시
        } else if (dIndex.current <= lastDate) {
          dateTxt.textContent = dIndex.current;
          td.setAttribute(
            "class",
            `y_${valDay.year} m_${valDay.month} d_${dIndex.current}`
          );
          const tdClassArr = Array.from(td.classList);
          if (matchToday(tdClassArr, todayArr)) {
            td.classList.add("today");
          }
          dIndex.current++;

          // 다음 달 날짜 표시
        } else {
          dateTxt.textContent = dIndex.next;
          if (valDay.month === 12) {
            td.setAttribute(
              "class",
              `y_${valDay.year + 1} m_1 d_${dIndex.next}`
            );
          } else {
            td.setAttribute(
              "class",
              `y_${valDay.year} m_${valDay.month + 1} d_${dIndex.next}`
            );
          }
          td.classList.add("nextMonth");
          dIndex.next++;
        }
      } // 1주 for문 종료
    } // 1달 for문 종료

    showNum();
  };

  btnPrev?.addEventListener("click", () => {
    valDay.month--;
    if (valDay.month === 0) {
      valDay.month = 12;
      valDay.year--;
    }
    showNum();
    showDate();
  });
  btnNext?.addEventListener("click", () => {
    valDay.month++;
    if (valDay.month === 13) {
      valDay.month = 1;
      valDay.year++;
    }
    showNum();
    showDate();
  });
  btnToday?.addEventListener("click", () => {
    valDay.year = today.year;
    valDay.month = today.month;
    valDay.date = today.date;
    showDate();
  });

  // search detail button 클릭하면 dropdown 표시, arrow 토글
  btnSearchDetail?.addEventListener("click", () => {
    document
      .querySelector("div.btn_search_detail_arrow")
      .classList.toggle("active");
  });

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
  btnModalClose?.addEventListener("click", () => {
    modal.close();
  });

  // 렌더링 완료 후 즉시 실행
  showDate();
});

// 월별 배경 변경 switch문
// switch (valDay.month) {
//   case 1:
//     break;
//   case 2:
//     break;
//   case 3:
//     break;
//   case 4:
//     break;
//   case 5:
//     break;
//   case 6:
//     break;
//   case 7:
//     break;
//   case 8:
//     break;
//   case 9:
//     break;
//   case 10:
//     break;
//   case 11:
//     break;
//   case 12:
//     break;
// }

/**
 * TO DO
 * 0. button.today 클릭하면 오늘 날짜 표시(화면, 일정도 변경)
 * 1. 네이버 캘린더처럼 상세 버튼을 클릭하면
 *    일정 색, 공연 장소, 일정, 공연명 등 검색 상세 dropdown 표시
 * 2. 월별로 배경화면 변경
 * 3. 공휴일 표시(open API 사용)
 * 4. 일정 표시(open API 사용)
 * 5. 일정을 클릭하면 넷플릭스 상세정보처럼 modal 창을 크게 표시
 * 6. 공연정보 modal 안에 별표, 북마크 등 중요도 체크하는 항목 표시
 */
