document.addEventListener("DOMContentLoaded", () => {
  const yearNum = document.querySelector("h2.year");
  const monthNum = document.querySelector("h1.month");
  const trs = document.querySelectorAll("table.schedule tbody tr");
  const btnPrev = document.querySelector("button.prev");
  const btnNext = document.querySelector("button.next");
  const btnToday = document.querySelector("button.today");

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
  const todayArr = [
    `year_${today.year}`,
    `month_${today.month}`,
    `date_${today.date}`,
  ];

  const showNum = () => {
    monthNum.textContent = `${valDay.month}월`;
    yearNum.textContent = `${valDay.year}년`;
  };

  const matchToday = (arr1, arr2) => arr1.every((ele) => arr2.includes(ele));

  const showDate = () => {
    // 이번 달 마지막 날짜 = 총 날짜 개수
    const lastDate = new Date(valDay.year, valDay.month, 0).getDate();
    // 이번 달 첫 요일은 이번 달 첫 주에서 저번 달 마지막 요일(prevMonthDate)을 뺀 것
    // 저번 달 마지막 요일 index. 0(일요일)부터 시작하므로 요일 개수를 구하기 위해 + 1
    const prevMonthDate =
      new Date(valDay.year, valDay.month - 1, 0).getDay() + 1;

    // 모든 td 안의 날짜 div(tdTxt) 제거
    const tdAll = document.querySelectorAll("td");
    for (let td of tdAll) {
      const tdTxt = document.querySelector(".date_txt");
      if (Array.from(td.children).includes(tdTxt)) {
        td.removeChild(tdTxt);
      }
    }

    // dateIndex : 1 ~ lastDate 까지 증가
    let dateIndex = 1;
    for (let j = 0; j < 5; j++) {
      let tds = trs[j].querySelectorAll("td");
      for (let k = 0; k < 7; k++) {
        let td = tds[k];
        let dateTxt = document.createElement("div");
        dateTxt.setAttribute("class", "date_txt");
        td.appendChild(dateTxt);
        // 마지막 달이 토요일(6 + 1 = 7)이면 이번 달은 일요일이므로 첫 주 공백이 없음
        if (j === 0 && prevMonthDate != 7 && k < prevMonthDate) {
          dateTxt.textContent = "";
        } else if (dateIndex <= lastDate) {
          dateTxt.textContent = dateIndex;
          dateTxt.setAttribute("class", "date_txt");
          td.setAttribute(
            "class",
            `year_${valDay.year} month_${valDay.month} date_${dateIndex}`
          );
          const tdClassArr = Array.from(td.classList);
          if (matchToday(tdClassArr, todayArr)) {
            td.setAttribute(
              "class",
              `today year_${valDay.year} month_${valDay.month} date_${dateIndex}`
            );
          }
          dateIndex++;
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

  // 렌더링 완료 후 즉시 실행
  showDate();
});

/**
 * TO DO
 * 0. button.today 클릭하면 오늘 날짜 표시(화면, 일정도 변경)
 * 1. h2.year, h1.month 클릭 시 input 또는 list 표시
 * (좌우 버튼을 여러 번 클릭하지 않아도 달력을 넘길 수 있게)
 * 2. 월별로 배경화면 변경
 * 3. 일정 표시
 * 4. 일정을 클릭하면 넷플릭스 상세정보처럼 modal 창을 크게 표시
 */
